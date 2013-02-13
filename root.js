var addChannel = require('./action/addChannel');
var showRss = require('./action/showRss');
var delChannel = require('./action/delChannel');
var recoverChan = require('./action/recoverChan');
var showLatest = require('./action/showLatest');
var showItemByChannel = require('./action/showItemByChannel');

var root = module.exports = { 
  welcome: "index" 
}; 

root.addChannel = addChannel;
root.showRss    = showRss;
root.showItemByChannel =showItemByChannel;
root.showLatest = showLatest;

root.delChannel = delChannel;
root.recoverChan= recoverChan;