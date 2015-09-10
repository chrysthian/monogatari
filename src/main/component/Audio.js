define(
  [ 'component/Base', 'lib/howler' ], function( Base, _howler ) {

    // http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library
    var Audio = function ( options ) {
      Base.call( this, Base.AUDIO_SOURCE );
      this.obj = new Howl( options );
    };

    return Audio;
  }
);