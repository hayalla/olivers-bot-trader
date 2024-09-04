'use strict';

const { encrypt } = require('../src/utils/crypto');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.rawSelect('users', { where: {}, limit: 1 }, ['id']);
    if (!userId) {
      const limitId = await queryInterface.rawSelect('limits', { where: {}, limit: 1 }, ['id']);
      return queryInterface.bulkInsert('users', [{
        name: 'Hayalla',
        email: process.env.DEFAULT_SETTINGS_EMAIL,
        password: bcrypt.hashSync('123456'),
        limitId,
        isActive: true,
        accessKey: process.env.DEFAULT_ACCESS_KEY,
        secretKey: encrypt(process.env.DEFAULT_SECRET_KEY),
        futuresKey: process.env.DEFAULT_FUTURES_KEY,
        futuresSecret: encrypt(process.env.DEFAULT_FUTURES_SECRET),
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
