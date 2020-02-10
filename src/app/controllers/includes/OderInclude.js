import RecipientInclude from './RecipientInclude';
import DeliverymanInclude from './DeliverymanInclude';
import SignatureInclude from './SignatureInclude';

import Order from '../../models/Order';

export default {
  model: Order,
  as: 'order',
  attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
  include: [RecipientInclude, DeliverymanInclude, SignatureInclude],
};
