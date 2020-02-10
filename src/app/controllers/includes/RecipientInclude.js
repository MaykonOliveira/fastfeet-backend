import Recipient from '../../models/Recipient';

export default {
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
};
