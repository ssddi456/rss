var async = require('async');
var rssgrabber = require('../implement/rss.grabber');

var modelchannel = require('../model/model.channel');
var modelitem = require('../model/model.item');


var rssformateSoure = require('../implement/rss.formateSoure');
var Channel = require('../model/channel');
var Item = require('../model/item');

module.exports = function(body, req, res) {
  var source = body.url;
  async.waterfall([

    modelchannel.checkExists.bind(null,source),

    rssgrabber.bind(null,[source]),

    function(channels, channelAnalysed) {
      debugger
      var channel = channels[source];
      var channelinfo = rssformateSoure(source, channel);

      channelAnalysed(null,channelinfo);

    },function(channelinfo,channelsSaved) {

      async.parallel([

        modelchannel.create.bind ( modelchannel, channelinfo.channel ),

        modelitem.create.bind ( modelitem,channelinfo.items )

      ], channelsSaved);

    }],
    function(err) {
    if(err){
      res.json({err:err});
      return;
    }
    res.json({result:'added'});
  })
  
  
}