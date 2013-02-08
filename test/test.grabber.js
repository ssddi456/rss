
var rssgrabber = require('../implement/rss.grabber');
var rsssource = require('../model/rss.source');
var util = require('util');

rssgrabber(rsssource,function( err, feeds ) {
  console.log( util.inspect(feeds,false, null, false) );
})