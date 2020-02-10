import File from '../../models/File';

export default {
  model: File,
  as: 'signature',
  attributes: ['path', 'url'],
};
