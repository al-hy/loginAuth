const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);

  //plug in the promise library
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection: ${err}`);
    process.exit(1);
  });

  //local models
  require('./user');
};
