
var modelchannel = require('../model/model.channel');
var modelitem = require('../model/model.item');


var async = require('async');

var source = 'http://feed.feedsky.com/rubylouvre'
async.parallel([
  modelchannel.remove.bind(modelchannel,{source:source}),
  modelitem.remove.bind(modelitem,{channel:source})
],function(err) {
  console.log( arguments );
  process.exit(0);
})