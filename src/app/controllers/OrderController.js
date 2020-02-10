import * as Yup from 'yup';
import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

import RecipientInclude from './includes/RecipientInclude';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        RecipientInclude,
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema of the body is invalid.' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const order = await Order.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number().integer(),
      deliveryman_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema of the body is invalid.' });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(401).json({ error: 'The order id cannot be found.' });
    }

    const updatedOrder = await order.update(req.body);

    return res.json(updatedOrder);
  }

  async destroy(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(401).json({ error: 'The order ID cannot be found.' });
    }

    await order.destroy();

    return res.json();
  }
}

export default new OrderController();
