const mongoose = require('mongoose');
const {cache} = require('../config');

const User = mongoose.model('user', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}));
const Client = mongoose.model('clients', new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
}));
const Visits = mongoose.model('visits', new mongoose.Schema({
    time: {
      type: Number,
      required: true,
    },
    client: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
}));
  Client.watch().on('change', () => {
    cache.del('visitDetails')
  });
  Visits.watch().on('change', () => {
    cache.del('visitDetails')
  });
  User.watch().on('change', () => {
    cache.del('visitDetails')
  });
module.exports = {
    User,
    Client,
    Visits
};