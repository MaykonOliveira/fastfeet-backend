import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from '../models/Order';

class OrdersEndController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Schema of the params is invalid.' });
    }

    const now = new Date();

    const { orderId, deliverymanId } = req.params;

    const order = await Order.findOne({
      where: {
        id: orderId,
        deliveryman_id: deliverymanId,
        canceled_at: null,
        start_date: {
          [Op.not]: null,
        },
        end_date: null,
      },
    });

    if (!order) {
      return res.status(404).json({
        error: `Not found started order with id ${orderId} for the deliveryman ${deliverymanId}`,
      });
    }

    const updatedOrder = await order.update({
      end_date: now,
      signature_id: req.body.signature_id,
    });

    return res.json(updatedOrder);
  }
}

export default new OrdersEndController();
