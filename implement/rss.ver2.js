// rss 2.0
module.exports = function( source, _channel ) {
  var channel = {};
  var items   = [];

  _channel = _channel.channel || _channel;

  channel.source      = source;
  channel.title       = _channel.title       ? (_channel.title.val       || _channel.title.text       || '' ): '';
  channel.description = _channel.description ? (_channel.description.val || _channel.description.text || '' ): '';
  channel.link        = _channel.link        ? (_channel.link.val        || _channel.link.text        || '' ): '';
  channel.language    = _channel.language    ? (_channel.language.val    || _channel.language.text    || '' ): '';
  channel.generator   = _channel.generator   ? (_channel.generator.val   || _channel.generator.text   || '' ): '';
  channel.ttl         = _channel.ttl         ? (_channel.ttl.val         || _channel.ttl.text         || '' ): '';
  
  items = _channel.item && _channel.item.map(function(_item) {
    var item = {};
    item.id          = _item.id          ? (_item.id.val          || _item.id.text          || '' ) : '';
    item.title       = _item.title       ? (_item.title.val       || _item.title.text       || '' ) : '';
    item.link        = _item.link        ? (_item.link.val        || _item.link.text        || '' ) : '';
    item.pubDate     = _item.pubDate     ? (_item.pubDate.val     || _item.pubDate.text     || '' ) : '';
    item.author      = _item.author      ? 
                          (_item.author.name ? 
                            (_item.author.name.val || _item.author.name.val || '') :
                            (_item.author.val      || _item.author.text      || '' ) )
                          : '';
    item.source      = _item.source      ? (_item.source.val      || _item.source.text      || '' ) : '';
    item.description = _item.description ? (_item.description.val || _item.description.text || '' ) : '';
    item.content     = _item.content     ? (_item.content.val     || _item.content.text     || '' ) : '';
    item.channel     = source;
    
    item.pubDate = item.pubDate && new Date(item.pubDate).getTime();
    return item;
  });

  return {
    channel : channel,
    items   : items
  }
}