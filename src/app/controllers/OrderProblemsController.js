import * as Yup from 'yup';
import Order from '../models/Order';
import OrderProblem from '../models/OrderProblem';

import OrderInclude from './includes/OderInclude';

class OrderProblemsController {
  async index(req, res) {
    const problems = await OrderProblem.findAll({
      where: {
        order_id: req.params.id,
      },
      attributes: ['id', 'description'],
      include: [OrderInclude],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema of the body is invalid.' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({ error: `Not found order with id ${id}.` });
    }

    const problem = await OrderProblem.create({
      order_id: id,
      description: req.body.description,
    });

    return res.json(problem);
  }
}

export default new OrderProblemsController();
