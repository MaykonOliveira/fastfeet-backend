import { Op } from 'sequelize';
import Order from '../models/Order';

import RecipientInclude from './includes/RecipientInclude';
import DeliverymanInclude from './includes/DeliverymanInclude';
import SignatureInclude from './includes/SignatureInclude';

class DeliverymanOrdersController {
  async index(req, res) {
    let filter;

    if (req.query.status === 'done') {
      filter = {
        end_date: {
          [Op.not]: null,
        },
      };
    } else {
      filter = {
        canceled_at: null,
        end_date: null,
      };
    }

    const orders = await Order.findAll({
      where: filter,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [RecipientInclude, DeliverymanInclude, SignatureInclude],
    });

    return res.json(orders);
  }
}

export default new DeliverymanOrdersController();
