import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';

const models = [User, File, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connect = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connect));
  }
}

export default new Database();
