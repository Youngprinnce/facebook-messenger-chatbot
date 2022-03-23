const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config/config');

const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to DB');
    } catch (err) {
      console.error(err);
      throw err;
    }
};

module.exports = InitiateMongoServer;