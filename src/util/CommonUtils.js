define( function() {

  var CommonUtils = function(){};

  CommonUtils.prototype.parseUnitSizeToPixel = function( text ) {
    var len = text.length - 2;
    if ( len < 0 ) {
      return text;
    }
    if ( text.indexOf( 'pt' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 1.25;
    }
    if ( text.indexOf( 'pc' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 15;
    }
    if ( text.indexOf( 'mm' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 3.543307;
    }
    if ( text.indexOf( 'cm' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 35.43307;
    }
    if ( text.indexOf( 'in' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 90;
    }
    if ( text.indexOf( 'px' ) === len ) {
      return parseFloat( text.substring( 0, len ) );
    }
    return parseFloat( text );
  };

  // store('num', '1');
  // store('on', 'true');
  // store('name', 'pamela');
  // store('obj', {'hello': 'world'}, true);
  CommonUtils.prototype.store = function( key, val, isObject ) {
    if ( isObject ) {
      localStorage.setItem( key, JSON.stringify( val ) );
    } else {
      localStorage.setItem( key, val );
    }
  };

  return new CommonUtils(); 
} );
