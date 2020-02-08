import { Op } from 'sequelize';
import Order from '../models/Order';

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
    });

    return res.json(orders);
  }
}

export default new DeliverymanOrdersController();
