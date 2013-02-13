
var modelitem = require('../model/model.item');
module.exports = function( body, req, res ) {
  modelitem.getByChannel(body.url,function(err,list) {
    res.json({error:err,items:list});
  });
}