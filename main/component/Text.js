/**
 * Exports the {@link module:component/Text~Text|Text} class.
 * @module component/Text
 */
define(
  [ 'component/Base', 'component/BaseFont', 'lib/Three', 'render/Context2D' ], function( Base, BaseFont, _Three, Context2D ) {

    /**
     * Basic Text display component. It creates an invisible "bounding box" around the Text to limit and break lines using the parameters width and height.
     *
     * @param {String} [text] String containing the text to be displayed
     * @param {String} [fontSize] Font size in pixels
     * @param {String} [fontFamily]  Font family name
     * @param {Number} [width] Width in pixels for the area containing the text.
     * @param {Number} [height] Height in pixels for the area containing the text.
     * @param {String} [color] Hexadecimal color
     * @class Text
     */
    var Text = function( text, fontSize, fontFamily, width, height, color ) {
      BaseFont.call( this, fontSize, fontFamily, color );
      /**
       * Component Type
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Number}
       * @name type
       */
      this.type = Base.TEXT;

      this.state = Base.STATE_READY;

      /**
       * Flag to indicate if this component should be rendered on screen
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Boolean}
       * @name isRenderable
       * @default true
       */
      this.isRenderable = true;

      /**
       * Flag to indicate if this component is loaded on memory
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Boolean}
       * @name isLoaded
       * @default false
       */
      this.isLoaded = false;

      /**
       * Text to be rendered
       * @memberOf module:component/Text~Text
       * @instance
       * @type {String}
       * @name text
       * @default 'The quick brown fox jumps over the lazy dog'
       */
      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';

      /**
       * Width in pixels for the area containing the text.
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Number}
       * @name w
       * @default 256
       */
      this.w = ( width ) ? width : 256;

      /**
       * Height in pixels for the area containing the text.
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Number}
       * @name h
       * @default 64
       */
      this.h = ( height ) ? height : 64;

      /**
       * Radius of the rounded corner
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Number}
       * @name radius
       * @default -1
       */
      this.radius = -1;

      /**
       * Hexadecimal color of the speech bubble
       * @memberOf module:component/Text~Text
       * @instance
       * @type {String}
       * @name bubbleColor
       * @default '#FFF'
       */
      this.bubbleColor = '#FFF';

      /**
       * Hexadecimal color of the border of the speech bubble
       * @memberOf module:component/Text~Text
       * @instance
       * @type {String}
       * @name bubbleStrokeColor
       * @default '#000'
       */
      this.bubbleStrokeColor = '#000';

      /**
       * Buffered canvas with the final text to render, it is expected to be converted into a Three.Texture
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Object}
       * @name buffer
       */
      this.buffer = document.createElement( 'canvas' );
      this.buffer.width = this.w;
      this.buffer.height = this.h;

      /**
       * Buffered Three.Texture with the rendered text
       * @memberOf module:component/Text~Text
       * @instance
       * @type {Object}
       * @name texture
       * @default null
       */
      this.texture = null;
      this.load();
    };

    Text.prototype = Object.create( BaseFont.prototype );

    /**
     * Sets various properties of the font then re-parses for proper buffering
     * @method
     * @instance
     * @name reset
     * @param {String} [text] Text to be displayed
     * @param {Number} [fontSize] Font size, in pixels
     * @param {String} [fontFamily] Font-Family, accepts web fonts
     * @param {Number} [width] Buffer width, in pixels
     * @param {Number} [height] Buffer height, in pixels
     * @param {String} [color] Hexadecimal color
     * @memberOf module:component/Text~Text
     */
    Text.prototype.reset = function( text, fontSize, fontFamily, width, height, color ) {
      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.fontSize = ( fontSize ) ? fontSize : 10;
      this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;
      this.color = ( color ) ? color : '#000';
      this.load();
    };

    /**
     * Set the Font-Family then re-parses for proper buffering
     * @method
     * @instance
     * @name setSize
     * @default 10
     * @param {Number} [size] Font size, in pixels
     * @memberOf module:component/Text~Text
     */
    Text.prototype.setSize = function( size ) {
      this.isLoaded = false;
      this.fontSize = ( size ) ? size : 10;
      this.load();
    };

    /**
     * Set the Font-Family then re-parses for proper buffering
     * @method
     * @instance
     * @name setFamily
     * @default Verdana
     * @param {String} [family] Font-Family, accepts web fonts
     * @memberOf module:component/Text~Text
     */
    Text.prototype.setFamily = function( family ) {
      this.isLoaded = false;
      this.fontFamily = ( family ) ? family : 'Verdana';
      this.load();
    };

    /**
     * Set the font color then re-parses for proper buffering
     * @method
     * @instance
     * @name setColor
     * @default #000
     * @param {String} [color] Hexadecimal color
     * @memberOf module:component/Text~Text
     */
    Text.prototype.setColor = function( color ) {
      this.isLoaded = false;
      this.color = ( color ) ? color : '#000';
      this.load();
    };

    /**
     * Set the Text then re-parses for proper buffering
     * @method
     * @instance
     * @name setText
     * @param {String} [text] Text to be displayed
     * @memberOf module:component/Text~Text
     */
    Text.prototype.setText = function( text ) {
      this.isLoaded = false;
      this.text = ( text ) ? text : '';
      this.load();
    };

    /**
     * Set the width of the canvas buffer then re-parses the texture
     * @method
     * @instance
     * @name setWidth
     * @default 256
     * @param {Number} [width] Buffer width, in pixels
     * @memberOf module:component/Text~Text
     */
    Text.prototype.setWidth = function( width ) {
      this.isLoaded = false;
      this.w = ( width ) ? width : 256;
      this.buffer.width = this.w;
      this.load();
    };

    /**
     * Set the width of the canvas buffer then re-parses the texture
     * @method
     * @instance
     * @name setHeight
     * @default 64
     * @param {Number} [height] Buffer height, in pixels
     * @memberOf module:component/Text~Text
     */
    Text.prototype.setHeight = function( height ) {
      this.isLoaded = false;
      this.h = ( height ) ? height : 64;
      this.buffer.height = this.h;
      this.load();
    };

    /**
     * Callback function, triggered by the engine
     * @method
     * @instance
     * @name onLoad
     * @memberOf module:component/Text~Text
     */
    Text.prototype.onLoad = function() {
      this.parse();
      this.clearBuffer();
      this.createTexture();
    };

    /**
     * Sets properties for a speech bubble
     * @method
     * @instance
     * @name createBubble
     * @param {Number} [radius] Radius of the rounded corners, in pixels
     * @param {String} [bubbleColor] Hexadecimal color of the background
     * @param {String} [bubbleStrokeColor] Hexadecimal color of the surrounding line
     * @memberOf module:component/Text~Text
     */
    Text.prototype.createBubble = function( radius, bubbleColor, bubbleStrokeColor ) {
      this.radius = ( radius ) ? radius : -1;
      this.bubbleColor = ( bubbleColor ) ? bubbleColor : '#FFF';
      this.bubbleStrokeColor = ( bubbleStrokeColor ) ? bubbleStrokeColor : '#000';
    };

    /**
     * Clears the internal buffer for repaint
     * @method
     * @instance
     * @name clearBuffer
     * @memberOf module:component/Text~Text
     */
    Text.prototype.clearBuffer = function() {
      var context = this.buffer.getContext( '2d' );
      context.clearRect( 0, 0, this.w, this.h );
    };


    /**
     * Create the texture buffer based on canvas, and attach it to the component material and mesh for rendering.
     * @method
     * @instance
     * @name createTexture
     * @memberOf module:component/Text~Text
     */
    Text.prototype.createTexture = function() {
      this.texture = new THREE.Texture( this.renderIntoBuffer() );
      // This line makes the textures created during execution to work properly
      this.texture.needsUpdate = true;
      this.texture.flipY = true;
      this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
      this.texture.minFilter = THREE.NearestFilter;

      this.material = new THREE.MeshBasicMaterial(
        {
          map: this.texture,
          side: THREE.FrontSide
        }
      );
      this.material.transparent = true;
      this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.isLoaded = true;
    };

    /**
     * Renders the text with properties defined into the internal buffer texture, NOT on the screen.
     * It is rendered on screen only during the SceneManager render cycle.
     * @method
     * @instance
     * @name renderIntoBuffer
     * @memberOf module:component/Text~Text
     */
    Text.prototype.renderIntoBuffer = function() {
      var context = this.buffer.getContext( '2d' );

      context.imageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;

      context.clearRect( 0, 0, this.w, this.h );

      if( this.text.length > 0 ) {
        var c = this.fontMap.get( this.text[ 0 ] );
        var words = this.text.split( ' ' );

        // The position(x,y) and scale(width, height) of a single character
        var cX = this.radius, cY = this.radius, cW = 0, cH = 0;

        if( this.radius > 0 ) {
          context = Context2D.setContextColor( context, this.bubbleColor );
          context = Context2D.setContextStrokeColor( context, this.bubbleStrokeColor );

          Context2D.fillAndStrokeRoundedRect(
            context,
            2,
            2,
            this.w - (this.radius * 2) - 2,
            this.h - (this.radius * 2) - 2,
            this.radius
          );
        }

        for( var i = 0, len = words.length; i < len; i++ ) {

          if( cX + ( len * cW ) >= this.w ) {
            cX = this.radius;
            cY += cH;
          }

          for( var j = 0, wlen = words[ i ].length; j < wlen; j++ ) {
            c = this.fontMap.get( words[ i ][ j ] );
            cW = c.width;
            cH = c.height;

            context.drawImage( c, 0, 0, cW, cH, cX, cY, cW, cH );
            cX += cW;
          }

          c = this.fontMap.get( " " );

          cW = c.width;
          cH = c.height;

          context.drawImage( c, 0, 0, cW, cH, cX, cY, cW, cH );
          cX += cW;
        }

      }

      return this.buffer;
    };

    return Text;
  }
);