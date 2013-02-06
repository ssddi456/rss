var RSS = require('./db.js').RSS;
var Chapter = require('./db.js').Chapter;
var _ = require('underscore');
      
var loadlib     = require('../../loadlib.js');

var requestGzip = loadlib('downloadHelper.js').requestGzip;
var lazy        = loadlib('lazy.js').lazy;
var $           = loadlib('htmlHelper.js');
var linq        = loadlib('linq.js');
var debug       = new (loadlib('debug.js'))('rss-rss');

var nf = function(){};

RSS.add = function( url, cb) {
  cb = "function" === typeof cb ?cb: nf;
  RSS.exists({url:url},function(err, exist) {
    if(err){return (console.error(err),cb(err));}

    if(!exist){
      requestGzip(url,function(err, doc ) {
        if(err){return (console.error(err),cb(err));}
        var rss = $.rss(doc);
        rss.updated = rss.updated.getTime();
        var items = rss.items;
        rss.items = null;
        rss.url = url;
        RSS.create([rss],function(err, doc ) {
          if(err){return (console.error(err),cb(err));}
          if(!doc){return cb('create rss record fail');}
          Chapter.create(
            items.map(function(item){ item.parentlink = url; return item }),
            function(err){
              if(err){return (console.error(err),cb(err));}

              cb(null, doc);
            });
        });
      });
    }
  })
}

RSS.exists = function( optn, cb ) {
  cb = "function" === typeof cb ?cb: nf;
  RSS.count( optn,function(err, count ) {
    cb( err, !!count );
  });
}

RSS.check  = function(rss,cb){
  cb = "function" === typeof cb ?cb: nf;
  requestGzip(rss.url,function(err,doc){
    if(err){return (debug.error(err),cb(err));}

    var currss = $.rss(doc);
    currss.updated = currss.getTime();

    if(currss.updated != rss.updated){
      debug.log( rss.title + ' updated');

            
      var newItems = _.filter(currss.items,function(item){
                        return item.pubDate.getTime() >= rss.updated;
                      });

      debug.log( newItems.length + ' finded');

      Chapter.create(newItems,function(err){
        if(err){return (debug.error(err),cb(err));}

        cb(null);
      })
    }
  });
}

RSS.checkAll = function(cb){
  cb = "function" === typeof cb ?cb: nf;
  RSS.find(function(err, rsses){
    if(err){return (debug.error(err),cb(err));}

    lazy(rsses,function(rss,done,fail){
      RSS.check(rss,function(err){
        err?fail(err):done("check done");
      });
    },function(dones,fails){
      debug.log('rss check done');
      debug.log(' - dones', dones);
      debug.log(' - fails', fails);
      cb(null);
    },{
      stack : 1,
      log   : 'rss check all'
    });
  });
}
module.exports = RSS;
      
      