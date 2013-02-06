

var RSS    = koModule([ 'title','link','description','updated','url' ]);
var Chapter = koModule(['id', 'title', 'link', 'description', 'pubDate', 'parentlink', 'readed']);

var rssReader = {};

rssReader.rsses = ko.observable();
rssReader.chapters = ko.observableArray();


rssReader.showLatest = function() {
  $.post('',function( chapters) {
    rssReader.chapters( chapters )
  },'json')
}
rssReader.checkAll = function() {
  // may a round retrival
  $.post('',function( chapters) {
    rssReader.chapters( chapters )
  },'json')   
}
rssReader.dummy = function() {
    
}

rssReader.addRss = function() {
  $.post('',{},function() {
      
  });
};
rssReader.showChapters = function( rss ) {
  $.post('',{link:rss.link()},function( chapters ) {
      rssReader.chapters()
  },'json');
};

rssReader.readChapter = function(chapter) {
  $.post('',{},function() {
      
  },'json')
};
ko.applyBindings( rssReader );