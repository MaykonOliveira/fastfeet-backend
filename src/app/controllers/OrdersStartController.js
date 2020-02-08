import { isWithinInterval } from 'date-fns';

import Order from '../models/Order';

class OrdersStartController {
  async update(req, res) {
    const now = new Date();
    const hourStart = new Date().setHours(8, 0);
    const endStart = new Date().setHours(18, 0);

    const isValidStartHour = isWithinInterval(now, {
      start: hourStart,
      end: endStart,
    });

    if (!isValidStartHour) {
      return res.status(401).json({
        error: 'You can only start a order between 8:00h and 18:00h.',
      });
    }

    const { orderId, deliverymanId } = req.params;

    const order = await Order.findOne({
      where: {
        id: orderId,
        deliveryman_id: deliverymanId,
        canceled_at: null,
        start_date: null,
        end_date: null,
      },
    });

    if (!order) {
      return res.status(404).json({
        error: `Not found opened order with id ${orderId} for the deliveryman ${deliverymanId}`,
      });
    }

    const updatedOrder = await order.update({
      start_date: now,
    });

    return res.json(updatedOrder);
  }
}

export default new OrdersStartController();
