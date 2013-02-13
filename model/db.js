var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/rss');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // yay!
  console.log('db connected');
});

var channelSchema = new mongoose.Schema({
  source         : String,
  author         : String,
  category       : String,
  copyright      : String,
  description    : String,
  subtitle       : String,
  summary        : String,
  content        : String,
  id             : String,
  logo           : String,
  generator      : String,
  guid           : String,
  image          : String,
  lastBuildDate  : Number,
  link           : String,
  managingEditor : String,
  pubDate        : Number,
  title          : String,
  deleted        : {
    type      : Boolean,
    'default' : false
  }
});
var itemSchema = new mongoose.Schema({
    channel     : String,
    title       : String,
    link        : String,
    id          : String,
    pubDate     : Number,
    updated     : Number,
    source      : String,
    description : String,
    subtitle    : String,
    summary     : String,
    content     : String
});

module.exports = {
  Channel    : db.model('Book', channelSchema),
  Item       : db.model('Item', itemSchema),
  db      : db
};