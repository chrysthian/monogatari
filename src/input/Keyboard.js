define(
  function() {
    /**
     * Map and listens keys for keyboard input.
     * @exports input/Keyboard
     */
    var Keyboard = function() {
      /**
       * Array of pressed keys, they Store a timestamp if pressed or -1 of not pressed.
       * @type {Int32Array}
       */
      this.pressed = new Int32Array( 256 );

      for( var i = 0, len = this.pressed.length; i < len; i++ ) {
        this.pressed[ i ] = -1;
      }
    };

    Keyboard.KEY = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE_BREAK: 19,
      CAPS_LOCK: 20,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      INSERT: 45,
      DELETE: 46,
      NUM_0: 48,
      NUM_1: 49,
      NUM_2: 50,
      NUM_3: 51,
      NUM_4: 52,
      NUM_5: 53,
      NUM_6: 54,
      NUM_7: 55,
      NUM_8: 56,
      NUM_9: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      LEFT_WINDOW: 91,
      RIGHT_WINDOW: 92,
      SELECT_KEY: 93,
      NUMPAD_0: 96,
      NUMPAD_1: 97,
      NUMPAD_2: 98,
      NUMPAD_3: 99,
      NUMPAD_4: 100,
      NUMPAD_5: 101,
      NUMPAD_6: 102,
      NUMPAD_7: 103,
      NUMPAD_8: 104,
      NUMPAD_9: 105,
      MULTIPLY: 106,
      ADD: 107,
      SUBTRACT: 109,
      DECIMAL_POINT: 110,
      DIVIDE: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      NUM_LOCK: 144,
      SCROLL_LOCK: 145,
      SEMICOLON: 186,
      EQUAL_SIGN: 187,
      COMMA: 188,
      DASH: 189,
      PERIOD: 190,
      FORWARD_SLASH: 191,
      GRAVE_ACCENT: 192,
      OPEN_BRACKET: 219,
      BACK_SLASH: 220,
      CLOSE_BRAKET: 221,
      SINGLE_QUOTE: 222
    };

    /**
     * Checks if a key is pressed.
     * @param {Number} keyCode - Constant of a key mapped
     * @return {Number} Timestamp of the last time the key was pressed or null if not pressed
     */
    Keyboard.prototype.isDown = function( keyCode ) {
      return ( this.pressed[ keyCode ] === -1 ) ? null : this.pressed[ keyCode ];
    };

    /**
     * @param {Event} event
     * @param {module:core/Timer} timer
     */
    Keyboard.prototype.onKeyDown = function( event, timer ) {
      event.stopPropagation();
      
      if( event.keyCode == Keyboard.KEY.BACKSPACE ||
        event.keyCode == Keyboard.KEY.UP_ARROW ||
        event.keyCode == Keyboard.KEY.DOWN_ARROW ||
        event.keyCode == Keyboard.KEY.LEFT_ARROW ||
        event.keyCode == Keyboard.KEY.RIGHT_ARROW ||
        event.keyCode == Keyboard.KEY.PAGE_UP ||
        event.keyCode == Keyboard.KEY.PAGE_DOWN ||
        event.keyCode == Keyboard.KEY.SPACE ) {
        event.preventDefault();
      }

      this.pressed[ event.keyCode ] = timer.time;
    };

    /**
     * @param {Event} event
     */
    Keyboard.prototype.onKeyUp = function( event ) {
      event.stopPropagation();
      this.pressed[ event.keyCode ] = -1;
    };

    return Keyboard;
  }
);
