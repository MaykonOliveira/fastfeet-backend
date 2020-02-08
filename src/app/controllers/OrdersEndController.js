class OrdersStartController {
  async update(req, res) {
    return res.json({
      deliveryman: req.params.deliverymanId,
      order: req.params.orderId,
    });
  }
}

export default new OrdersStartController();
