import OrderProblem from '../models/OrderProblem';
import Order from '../models/Order';

class ProblemOrderCancelController {
  async destroy(req, res) {
    const problemId = req.params.id;
    const problem = await OrderProblem.findByPk(problemId);

    if (!problem) {
      return res
        .status(404)
        .json({ error: `Not found problem wit id ${problemId}.` });
    }

    const order = await Order.findOne({
      where: {
        canceled_at: null,
        id: problem.order_id,
      },
    });

    if (!order) {
      return res.status(401).json({
        error: `Not found a not canceled order with id ${problem.order_id}.`,
      });
    }

    const updatedOrder = await order.update({
      canceled_at: new Date(),
    });

    return res.json(updatedOrder);
  }
}

export default new ProblemOrderCancelController();
