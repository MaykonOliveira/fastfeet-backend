import Deliveryman from '../../models/Deliveryman';

import AvatarInclude from './AvatarInclude';

export default {
  model: Deliveryman,
  as: 'deliveryman',
  attributes: ['id', 'name', 'email'],
  include: [AvatarInclude],
};
