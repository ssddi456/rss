
var modelitem = require('../model/model.item');
module.exports = function( body,req,res) {
  modelitem.getLatest(function(err, list ) {
    res.json({error:err,items:list});
  })
}