
var async = require('async');
var modelchannel = require('../model/model.channel');
var modelitem = require('../model/model.item');

var rssgrabber = require('./rss.grabber');
var _ = require('underscore');
var rssformateSoure = require('./rss.formateSoure');
      
module.exports = function checkSourceUpdate ( checkDown ) {
  async.waterfall([

    modelchannel.getSource,

    rssgrabber,
    // format source to the form in db
    function( sources, itemsGot) {
      var items = _.flaten(
                    _.map(sources,function(channelinfo, source ) {
                      return rssformateSoure(channelinfo).items;
                    }));

      itemsGot(null,items);
    },
    // check if item exist in db
    function(items, itemsSaved) {
      async.forEachLimit(items,50,function(item,itemSaved) {
        async.waterfall([
            modelitem.checkByLink.bind(null,item.link),
            modelitem.create
          ],function( err ){
            if(err){
              console.log('check if new item',err);
              return;
            }
            itemSaved(null);
          })
      },function(err) {
        console.log('all item checked',err);
        itemSaved(null);
      });
    }],
    // final
    function(err) {
      console.log('rss update checked');
      checkDown(err);
    })
} 