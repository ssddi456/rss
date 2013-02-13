
var db = require('./db');
var Item = db.Item;
module.exports = Item;

Item.getByChannel= function(channel, itemsGot ) {
  Item.find({channel:channel}).lean().exec(itemsGot);
}
Item.getLatest = function( itemsGot) {
  Item.find().sort({pubDate: -1}).limit(20).lean().exec(itemsGot);
}
Item.checkByLink=function( link, existCheck ) {
  Item.count({link:link},function(err, counts ) {
    existCheck(err||(counts&&'exist'));
  });
}