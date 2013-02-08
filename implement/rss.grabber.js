var nodeXml   = require('node-xml');
var request   = require('request');
var async     = require('async');
var util      = require('util');
var _         = require('underscore');

function rssNode ( attrs ) {
  _.extend(this, attrs);
}

rssNode.prototype.toJSON = function() {
  var ret = {};
  _.each(this, function( val, attr ) {
    if(attr == 'parent'){
      return;
    }
    if( Array.isArray(val) ){
      ret[attr] = val.map(function( rssnode ) {
        return rssnode instanceof rssNode ? rssnode.toJSON() : rssnode;
      });
      return;
    } 
    ret[attr] = val instanceof rssNode ? val.toJSON() : val;
  });
  return ret;
}
/**
 * parse rss xml
 * @param  {[type]} dom [description]
 * @return {[type]}     [description]
 */
var $rss = (function(){
    var ret;
    var cur;
    var ne;
    var temp;
    var parsingListener = {
      onStartDocument : function() {
        // console.log('start parsing');
      },
      onEndDocument : function() {
        // console.log('finish parsing');
      },
      onStartElementNS : function (elem, attrs, prefix, uri, namespaces) {
        var _attr = {};
        attrs.forEach(function( val ){
          _attr [ val[0] ] = val[1];
        });
        ne  = new rssNode({ name : elem, attrs:_attr, parent : cur });
        console.log("=> Started: " + cur.name );
        if( cur[elem] ){
          if( !Array.isArray(cur[elem]) ){
            temp = cur[elem];
            cur[elem] = [temp];
            temp.parent = cur;
          }
          cur[elem].push(ne);
        } else {
          cur[elem] = ne;
        }
        cur = ne;
        console.log("            " + elem + " uri="+uri +" (Attributes: " + JSON.stringify(attrs) + " )" );
      },
      onEndElementNS : function(elem, prefix, uri) {
        if ( elem == cur.name ){
          console.log("<= Ended: ", cur.name );
          cur = cur.parent;
          console.log("          " + elem + " uri="+uri, cur.name, typeof cur[elem] );
        }
      },
      onCharacters : function(chars) {
        if( chars != '' && chars.match(/[^\s]/) ){
          cur.val = chars;
          // console.log('chars :', chars );
        }
      },
      onCdata : function( cdata ) {
        if( cur.text == undefined ){
          cur.text = cdata;
        } else {
          cur.text +=  '\n' + cdata;
        }
        // console.log( 'cdata : ', cdata);
      }
    }

  
  return function( domstring ){
    ret  = new rssNode();
    cur  = ret;
    ne   = undefined;
    temp = undefined;

    var parser = new nodeXml.SaxParser(function(cb) {
      _.each(parsingListener,function( handle, name ){
        cb[name](handle);
      });
    });

    parser.parseString(domstring);
    return ret.toJSON();
  }
})();

/**
 * grab rss source 
 * @param  {URL[]}    rsssource rss source array
 * @param  {Function} cb        callback ( error rssFeeds )
  */
module.exports = function rssGrabber ( rsssource, cb ) {
  var ret = {};
  async.forEachSeries(rsssource,function( rss, feedsgot ){
    request(rss,function(err, resp, body ) {
      if (err) {
        feedsgot(err);
        return
      };
      // console.log( body );
      ret[rss] = $rss(body);
      feedsgot( null);
    })
  },function(err) {
    if(err){
      cb(err);
      return;
    }
    cb(null, ret);
  })
}