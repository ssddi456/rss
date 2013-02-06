var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/rssreader');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // yay!
  console.log('db connected');
});

var RSSSchema = new mongoose.Schema({
  title       : String,
  link        : String,
  description : String,
  updated     : Number,
  url         : {type:String, unique:true}
})
var RSS       = db.model('Rss',RSSSchema);

var ChapterSchema = new mongoose.Schema({
  id          : String,
  title       : String,
  link        : String,
  description : String,
  pubDate     : Number,
  parentlink  : String,
  readed      : {type:Boolean, 'default':false}
});

var Chapter  = db.model('Chapter',ChapterSchema);
module.exports = {
  RSS     : RSS,
  Chapter : Chapter,
  db      : db
};