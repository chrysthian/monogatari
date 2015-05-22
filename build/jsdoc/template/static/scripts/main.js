$(
  function() {
    // Search Items
    $( '#search' ).on(
      'keyup', function( e ) {
        var value = $( this ).val();
        var $el = $( '.navigation' );

        if( value ) {
          var regexp = new RegExp( value, 'i' );
          $el.find( 'li, .itemMembers' ).hide();

          $el.find( 'li' ).each(
            function( i, v ) {
              var $item = $( v );

              if( $item.data( 'name' ) && regexp.test( $item.data( 'name' ) ) ) {
                $item.show();
                $item.closest( '.itemMembers' ).show();
                $item.closest( '.item' ).show();
              }
            }
          );
        } else {
          $el.find( '.item, .itemMembers' ).show();
        }

        $el.find( '.list' ).scrollTop( 0 );
      }
    );

    // Toggle when click an item element
    /**
     $( '.navigation .title' ).each(
     function( i, v ) {
        $( v ).click(
          function() {
            console.log( this.innerHTML );
            console.log( $( this ).parent()[ 0 ].innerHTML );
            $( this ).parent().find( '.itemMembers' ).each(
              function( i, v ) {
                $( v ).show();
              }
            );
          }
        );
      }
     );
     */

    // Show an item related a current documentation automatically
    var filename = $( '.page-title' ).data( 'filename' ).replace( /\.[a-z]+$/, '' );

    var name = $.trim( $( 'div#longname' )[ 0 ].innerHTML );

    var $currentItem = $( '.navigation .item[data-name="' + name + '"]' );

    if( $currentItem.length ) {
      $currentItem.show().find( '.itemMembers' ).show();
    }

    // Auto resizing on navigation
    var _onResize = function() {
      var height = $( window ).height();
      var $el = $( '.navigation' );

      $el.height( height ).find( '.list' ).height( height - 133 );
    };

    $( window ).on( 'resize', _onResize );
    _onResize();
  }
);