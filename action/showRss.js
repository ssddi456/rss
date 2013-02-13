
var modelchannel = require('../model/model.channel');

module.exports = function(body, req, res) {
  if(body.all){
    modelchannel.getAll(function(err, channelList ) {
      res.json({error:err,channels:channelList});
    });
    return;
  }
  if(body.showDelete){
    modelchannel.getDeleted(function(err, channelList ) {
      res.json({error:err,channels:channelList});
    });
    return;
  }
  modelchannel.getUndeleted(function(err, channelList ) {
    res.json({error:err,channels:channelList});
  })
}