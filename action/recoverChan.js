var modelchannel = require('../model/model.channel');
module.exports = function(body, req, res) {
  modelchannel.undeleteChannel(body.url,function(err) {
    res.json({error:err});
  })
}