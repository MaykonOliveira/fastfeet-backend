import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

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
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
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
}

export default new DeliverymanOrdersController();
