var info = require('./rssinfo.js');

var RSS     = info.RSS;
var Chapter = info.Chapter;


module.exports = {
  add     : function(body,req,res) {
    RSS.add(body.url,function(err) {
      err?
        (console.error(err),
         res.json(err)):
        res.redirect('/rss/all');
    });
  },
  all     : function(body,req,res) {
    RSS.find(function(err, doc ) {
      err?
        (console.error(err),
         res.json(err)):
        res.json(doc);
    })
  },
  chapters: function(body,req,res) {
    Chapter.find(body,function(err, doc) {
      err?
        (console.error(err),
         res.json(err)):
        res.json(doc);
    })  
  },
  'chapters/latest' : function(body,req,res) {
    Chapter.getLatest(function(err, doc) {
      err?
        (console.error(err),
         res.json(err)):
        res.json(doc);
    }) 
  },
  'chapters/channel': function(body,req,res) {
    Chapter.getByChannel(body.channel,function(err,doc) {
      err?
        (console.error(err),
         res.json(err)):
        res.json(doc);
    })
  },
  'chapter/read'   : function(body,req,res) {
    Chapter.read(body.link,function(err) {
      err?
        (console.error(err),
         res.json(err)):
        res.json({don:'readed'});
    })  
  },
  welcome : 'rss'
}




