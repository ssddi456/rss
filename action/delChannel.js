
var modelchannel = require('../model/model.channel');
module.exports = function(body, req, res) {
  modelchannel.deleteChannel(body.url,function(err) {
    res.json({error:err});
  })
}