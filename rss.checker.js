var loadlib     = require('../loadlib.js');

var requestGzip = loadlib('downloadHelper.js').requestGzip;

var $           = loadlib('htmlHelper.js');

var rssurl = 'http://www.geekonomics10000.com/feed';



var urls = ['http://www.geekonomics10000.com/feed',
  'http://feeds.feedburner.com/ruanyifeng',
  'http://feeds.feedburner.com/qianduannet',
  'http://feed.feedsky.com/rubylouvre']



requestGzip( rssurl,function(err, doc ) {
  if(err){return console.error(err);}

  console.log( $.rss(doc));
})