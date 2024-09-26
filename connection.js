import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('alameen_ecomus', 'alameen_alameen', 'pj^1!aR%d6iL', {
  host: '127.0.0.1',
  port: 5522,
  dialect: 'mysql',
});

export default sequelize;