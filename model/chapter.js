var Chapter     = require('./db.js');

var loadlib     = require('../../loadlib.js');
var debug       = new (loadlib('debug.js'))('rss-chapter');

Chapter.getByChannel =function( channel, cb ) {
  
  Chapter
    .find({parentlink : channel})
    .sort('-pubDate')
    .lean()
    .exec(function(err, chapters ) {
      cb(err, chapters);
    });
}

Chapter.read = function( link, cb ){
  Chapter.find({link:link},function(err,doc){
    if(err){
      debug.error(err);
      return cb(err);
    }
    if(!doc.length){
      debug.error( 'chapter not found : '+link );
      return cb('chapter not found');
    }
    doc[0].readed = true;
    doc[0].save(function(err){
      if(err){
        debug.error(err);
        return cb(err);
      }
      cb(null);
    });
  });
}
Chapter.getLatest = function( cb ){
  Chapter
    .find()
    .sort('-pubDate')
    .limit(10)
    .exec(cb);
}
module.exports = Chapter;