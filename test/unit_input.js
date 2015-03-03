require( [ 'input/Keyboard', 'core/Timer' ], function( _Keyboard, _Timer ) {
  var t = new _Timer();
  var kb = new _Keyboard();

  assert( kb != null, 'Keyboard created', 'input', kb );

  var event = {};
  event.keyCode = kb.BACKSPACE;
  event.preventDefault = function() {};

  kb.onKeyDown( event, t );

  assert( kb.isDown( kb.BACKSPACE )  != null, 'Keyboard is down', 'input', kb);

  kb.onKeyUp( event );

  assert( kb.isDown( kb.BACKSPACE )  == null, 'Keyboard is not down', 'input', kb);
} );

require( [ 'input/Mouse', 'core/Timer' ], function( _Mouse, _Timer ) {
  var t = new _Timer();
  var mouse = new _Mouse();

  assert( mouse != null, 'Mouse created', 'input', mouse );

  var event = {};
  event.button = mouse.LMB;
  event.preventDefault = function() {};

  mouse.onMouseDown( event, t );

  assert( mouse.isDown( mouse.LMB )  != null, 'Mouse is down', 'input', mouse);

  mouse.onMouseUp( event );

  assert( mouse.isDown( mouse.LMB )  == null, 'Mouse is not down', 'input', mouse);
} );