// rss atom
module.exports = function(source, _channel) {
  var channel = {};
  var items = [];

  _channel= _channel.feed || _channel;

  if(Array.isArray(_channel.link)) {
    try {
      channel.link = _channel.link.filter(function(links) {
        return links.attrs.rel == 'self';
      }).attrs.href;
    } catch(e) {
      channel.link = '';
    }
  } else {
    channel.link = _channel.link ? (
    _channel.link.val || _channel.link.text || _item.link.attrs.href || '') : '';
  }

  channel.title       = _channel.title       ? (_channel.title.val      || _channel.title.text || '') : '';
  channel.description = _channel.description ? (_channel.description.val|| _channel.description.text || '') : '';
  channel.language    = _channel.language    ? (_channel.language.val   || _channel.language.text  || '') : '';
  channel.id          = _channel.id          ? (_channel.id.val         || _channel.id.text        || '') : '';
  channel.updated     = _channel.updated     ? (_channel.updated.val    || _channel.updated.text   || '') : '';
  channel.generator   = _channel.generator   ? (_channel.generator.val  || _channel.generator.text || '') : '';
  channel.subtitle    = _channel.subtitle    ? (_channel.subtitle.val   || _channel.subtitle.text  || '') : '';

  channel.updated   = new Date(channel.updated).getTime();
  channel.source    = source;

  items = _channel.entry && _channel.entry.map(function(_item) {
    var item = {};
    item.title       = _item.title       ? (_item.title.val       || _item.title.text       || '') : '';
    item.link        = _item.link        ? (
                        _item.link.val ||
                        _item.link.text || 
                        _item.link.attrs.href || '') 
                        : '';
    item.id          = _item.id          ? (_item.id.val          || _item.id.text          || '') : '';
    item.published   = _item.published   ? (_item.published.val   || _item.published.text   || '') : '';
    item.updated     = _item.updated     ? (_item.updated.val     || _item.updated.text     || '') : '';
    item.author      = _item.author      ? (
                        _item.author.val ||
                        _item.author.text || 
                        _item.author.attrs.name || '')
                         : '';
    item.source      = _item.source      ? (_item.source.val      || _item.source.text      || '') : '';
    item.description = _item.description ? (_item.description.val || _item.description.text || '') : '';
    item.summary     = _item.summary     ? (_item.summary.val     || _item.summary.text     || '') : '';
    item.content     = _item.content     ? (_item.content.val     || _item.content.text     || '') : '';

    item.channel = source;

    item.pubDate   = item.pubDate     && new Date(item.pubDate).getTime();
    item.published = item.published && new Date(item.published).getTime();
    item.updated   = item.updated     && new Date(item.updated).getTime();
    return item
  });

  return {
    channel : channel,
    items   : items
  }
}