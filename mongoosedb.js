const mongoose = require('mongoose');

//What kind of promise should mongoose use.
mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection established.');
});


