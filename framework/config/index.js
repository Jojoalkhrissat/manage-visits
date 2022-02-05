const mongoose = require('mongoose');
const nodeCache = require('node-cache')
const host = 'localhost';
const port = 27017;
const dbName = 'manage-visits';
mongoose.connect(`mongodb://${host}:${port}/${dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});
const cache = new nodeCache();

module.exports ={
    db,
    cache
}