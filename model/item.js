module.exports =  function Item ( source ) {
  source  = source || {};
  if( !source.channel ){
    throw new Error('item channel havnt given')
  }

  this.channel     = source.channel;
  this.title       = source.title       || '';
  this.link        = source.link        || '';
  this.id          = source.id          || '';
  this.pubDate     = source.pubDate     || source.published ||'';
  this.updated     = source.updated     || '';
  this.source      = source.source      || '';
  this.description = source.description || '';
  this.subtitle    = source.subtitle    || '';
  this.summary     = source.summary     || '';
  this.content     = source.content     || '';
}