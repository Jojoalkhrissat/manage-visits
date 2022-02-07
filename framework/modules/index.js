const mongoose = require('mongoose');
const {cache} = require('../config');
const {getWeekdayNumber} = require('../../helper')

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
  Visits.watch([
    {$addFields:{weekDay:{$dayOfWeek:{$toDate:'$time'}}}},
    {$match:{$and:[{time : { $gte :  cache.get('requestParams')?cache.get('requestParams').from:'318677501000', $lte : cache.get('requestParams')?cache.get('requestParams').to:'318677501000'}},
    {weekDay:cache.get('requestParams')?getWeekdayNumber(cache.get('requestParams').day):1}]}}
    ]).on('change', () => {
    cache.del('visitDetails')
  });
  User.watch().on('change', () => {
  });
module.exports = {
    User,
    Client,
    Visits
};
