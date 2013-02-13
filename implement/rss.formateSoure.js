
var rssatom = require('./rss.atom');
var rssver2 = require('./rss.ver2');
var Channel = require('../model/channel');
var Item = require('../model/item');

module.exports = function formatSource ( source,channelinfo ) {
  
  if(channelinfo.rss){
    channelinfo = rssver2( source, channelinfo.rss);
  } else if(channelinfo.feed){
    channelinfo = rssatom( source, channelinfo.feed);
  };
  debugger
  channelinfo.channel = new Channel(channelinfo.channel);
  channelinfo.items   = channelinfo.items.map(function( item ) {
                          return new Item(item);
                        });
  return channelinfo;
}