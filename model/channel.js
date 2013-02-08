module.exports = function Channel (source) {
  source = source || {};
  
  this.author         = source.author || '';
  this.category       = source.category || '';
  this.copyright      = source.copyright || source.rights || '';
  this.description    = source.description || '';
  this.subtitle       = source.subtitle || '';
  this.summary        = source.summary || '';
  this.content        = source.content || '';
  this.id             = source.id || '';
  this.logo           = source.logo || '';
  this.generator      = source.generator || '';
  this.guid           = source.guid || '';
  this.image          = source.image || '';
  this.item           = source.item || this.entry || '';
  this.lastBuildDate  = source.lastBuildDate || source.updated || '';
  this.link           = source.link || '';
  this.managingEditor = source.managingEditor || source.author || source.contributor || '';
  this.pubDate        = source.pubDate || source.pubDate || '';
  this.title          = source.title || '';
}