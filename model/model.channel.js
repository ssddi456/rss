
var db = require('./db');
var Channel = db.Channel;
module.exports = Channel;
Channel.checkExists=function( url, checked ) {
  Channel.count({source:url},function(err, counts ) {
    checked(err|| (counts && 'exist'));
  })
}
Channel.getSource= function( sourceGot ) {
  Channel.find({deleted:false}, 'source').lean().exec(function( err, list ) {
    if(err){
      console.log('err', error);
      sourceGot(err);
      return;
    }

    sourceGot(null, list.map(function(rss) {
      return rss.source;
    }))
  });
};

Channel.getAll = function( channelGot ) {
  Channel.find().lean().exec(channelGot);
}
Channel.getUndeleted = function( channelGot ) {
  Channel.find({deleted:false}).lean().exec(channelGot);
}
Channel.getDeleted=function( delGot ) {
  Channel.find({deleted:true}).lean().exec(delGot);
}
Channel.deleteChannel=function(url, deleteDone) {
  Channel.update({source:url},{deleted:true},function(err, updated) {
    deleteDone( err || updated != 1);
  });
}
Channel.undeleteChannel=function(url,undeleteDone) {
  Channel.update({source:url},{deleted:false},function(err, updated) {
    deleteDone( err || updated != 1);
  }); 
}