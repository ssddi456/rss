require([ 
],function(){ 
  var req = new tools.request('rss/');
  var app = {};

  app.viewType = ko.observable('channel');// channel items detail

  app.channels = ko.observableArray([]);
  app.items    = ko.observableArray([]);

  app.curChannel=ko.observable();
  app.curItem  = ko.observable();
  app.newSource = ko.observable('');
  
  app.addChannel = function() {
    req.post('addChannel',{url:app.newSource()},function(err) {
      if(!err){
        app.showRss();
      }
    })
  };

  app.showItemByChannel=function(channel) {
    req.post('showItemByChannel',{url:channel.source},function(err,list) {
      app.curChannel(channel);
      app.items(list.items);
      app.viewType('items');
    })
  };

  app.showItemDetail= function(item){
    app.curItem(item);
    app.viewType('detail');
  }

  app.showRss=function() {
    req.post('showRss',{},function(err, res ) {
      if(err){
        console.log(err);
        return;
      }
      console.log( res );
      app.channels(res.channels);
      app.viewType('channel');
    });
  }
  
  ko.applyBindings(app);
  app.showRss();
});