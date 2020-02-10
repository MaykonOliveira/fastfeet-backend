import File from '../../models/File';

export default {
  model: File,
  as: 'avatar',
  attributes: ['id', 'path', 'url'],
};
