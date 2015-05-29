/**
 * Exports the {@link module:core/Math~Math|Math} namespace.
 * @module core/Math
 */
define(
  [ 'lib/Three' ], function( _Three ) {

    /**
     * Complimentary math functions and constants.
     * @namespace Math
     */
    var Math = {};

    var X_ALIGNED_VECTOR = new THREE.Vector3( 1, 0, 0 );
    var Y_ALIGNED_VECTOR = new THREE.Vector3( 0, 1, 0 );
    var Z_ALIGNED_VECTOR = new THREE.Vector3( 0, 0, 1 );
    var ONE = new THREE.Vector3( 1, 1, 1 );
    var ZERO = new THREE.Vector3( 0, 0, 0 );

    /**
     * Factor to convert radians to degrees: 57.295779513082.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.RADTODEG = 57.295779513082;

    /**
     * Factor to convert degrees to radians: 0.0174532925199.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.DEGTORAD = 0.0174532925199;

    /**
     * 1.41421356237.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.SQRT_2 = 1.41421356237;

    /**
     * 3.14159265358979.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.PI = 3.14159265358979;

    /**
     * 2 * PI = 6.28318530717958.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.PI_2 = 6.28318530717958;

    /**
     * PI / 180 = 0.0174532925199.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.PI_OVER_180 = 0.0174532925199;

    /**
     * PI / 360 = 0.0087266462599.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.PI_OVER_360 = 0.0087266462599;

    /**
     * 1 degree = PI / 180 = 0.0174532925199.
     * @constant
     * @memberOf module:core/Math~Math
     * @type {number}
     */
    Math.ONE_DEGREE = Math.PI_OVER_180;

    /**
     * 1024 kilobytes * 1024 bytes = 1048576.
     * @memberOf module:core/Math~Math
     * @constant
     * @type {number}
     */
    Math.ONE_MEGABYTE = 1048576;

    /**
     * Returns THREE.Vector3( 1, 0, 0 ).
     *
     * @memberOf module:core/Math~Math
     * @returns {THREE.Vector3}
     */
    Math.getXAlignedVector = function() {
      return X_ALIGNED_VECTOR;
    };

    /**
     * Returns THREE.Vector3( 0, 1, 0 ).
     *
     * @memberOf module:core/Math~Math
     * @returns {THREE.Vector3}
     */
    Math.getYAlignedVector = function() {
      return Y_ALIGNED_VECTOR;
    };

    /**
     * Returns THREE.Vector3( 0, 0, 1 ).
     *
     * @memberOf module:core/Math~Math
     * @returns {THREE.Vector3}
     */
    Math.getZAlignedVector = function() {
      return Z_ALIGNED_VECTOR;
    };

    /**
     * Returns THREE.Vector3( 1, 1, 1 ).
     *
     * @memberOf module:core/Math~Math
     * @returns {THREE.Vector3}
     */
    Math.getVectorOne = function() {
      return ONE;
    };

    /**
     * Returns THREE.Vector3( 0, 0, 0 ).
     *
     * @memberOf module:core/Math~Math
     * @returns {THREE.Vector3}
     */
    Math.getVectorZero = function() {
      return ZERO;
    };

    /**
     * Converts a given angle in degrees to radians.
     *
     * @memberOf module:core/Math~Math
     * @param {number} a An angle in degrees.
     * @returns {number} Angle converted to radians.
     */
    Math.toRadians = function( a ) {
      return a * this.DEGTORAD;
    };

    /**
     * Converts a given angle in radians to degrees.
     *
     * @memberOf module:core/Math~Math
     * @param {number} a An angle in radians.
     * @returns {number} Angle converted to degrees.
     */
    Math.toDegrees = function( a ) {
      return a * this.RADTODEG;
    };

    /**
     * Converts a decimal number to a binary String.
     *
     * @memberOf module:core/Math~Math
     * @param {number} num Decimal number.
     * @returns {string} Number converted to binary string.
     */
    Math.decimalToBinary = function( num ) {
      return num.toString( 2 );
    };

    /**
     * Converts a decimal number to a octal String.
     *
     * @memberOf module:core/Math~Math
     * @param {number} num Decimal number.
     * @returns {string} Number converted to octal string.
     */
    Math.decimalToOctal = function( num ) {
      return num.toString( 8 );
    };

    /**
     * Converts a decimal number to a hexadecimal String.
     *
     * @memberOf module:core/Math~Math
     * @param {number} num Decimal number
     * @returns {string} Number converted to hex string.
     */
    Math.decimalToHex = function( num ) {
      return num.toString( 16 );
    };

    /**
     * Converts a binary String to a decimal number.
     *
     * @memberOf module:core/Math~Math
     * @param {string} num Binary string.
     * @returns {number} Binary string converted to decimal.
     */
    Math.binaryToDecimal = function( num ) {
      return parseInt( num, 2 );
    };

    /**
     * Converts a octal String to a decimal number.
     *
     * @memberOf module:core/Math~Math
     * @param {string} num Octal string.
     * @returns {number} Binary string converted to decimal.
     */
    Math.octalToDecimal = function( num ) {
      return parseInt( num, 8 );
    };

    /**
     * Converts a hexadecimal String to a decimal number.
     *
     * @memberOf module:core/Math~Math
     * @param {string} num Hex string.
     * @returns {number} Binary string converted to decimal.
     */
    Math.hexToDecimal = function( num ) {
      return parseInt( num, 16 );
    };

    /**
     * Rounds the given number to the nearest multiple.
     *
     * @memberOf module:core/Math~Math
     * @param {number} numToRound
     * @param {number} multiple
     * @returns {number} Nearest multiple.
     */
    Math.nearestMultiple = function( numToRound, multiple ) {
      if( multiple === 0 ) {
        return numToRound;
      }

      var remainder = this.abs( numToRound ) % multiple;
      if( remainder === 0 ) {
        return numToRound + multiple;
      }
      if( numToRound < 0 ) {
        return -( this.abs( numToRound ) - remainder );
      }
      return numToRound + multiple - remainder;
    };

    // Function hacks from:
    // http://mudcu.be/journal/2011/11/bitwise-gems-and-other-optimizations/

    /**
     * @memberOf module:core/Math~Math
     * @param {number} a First number to be compared.
     * @param {number} b Second number to be compared.
     * @returns {number} The minimum value between a and b.
     */
    Math.min = function( a, b ) {
      return ( a < b ) ? a : b;
    };

    /**
     * @memberOf module:core/Math~Math
     * @param {number} a First number to be compared.
     * @param {number} b Second number to be compared.
     * @returns {number} The maximum value between a and b.
     */
    Math.max = function( a, b ) {
      return ( a > b ) ? a : b;
    };

    /**
     * @memberOf module:core/Math~Math
     * @param {number} n The number to get absolute value.
     * @returns {number} Absolute value of n.
     */
    Math.abs = function( n ) {
      return n > 0 ? n : -n;
    };

    /**
     * @memberOf module:core/Math~Math
     * @param {number} n The number to be rounded.
     * @returns {number} Rounded value of n.
     */
    Math.round = function( n ) {
      return n + ( n < 0 ? -0.5 : 0.5 ) >> 0;
    };

    /**
     * @memberOf module:core/Math~Math
     * Gets the nearest upwards integer of n.
     * @param {number} n The number to get ceil.
     * @returns {number} Nearest upwards integer of n.
     */
    Math.ceil = function( n ) {
      return n + ( n < 0 ? 0 : 1 ) >> 0;
    };

    /**
     * @memberOf module:core/Math~Math
     * Gets the nearest downwards integer of n.
     * @param {number} n The number to get floor.
     * @returns {number} Nearest downwards integer of n.
     */
    Math.floor = function( n ) {
      // return n + ( n < 0 ? -1 : 0 ) >> 0;
      return n | 0;
    };

    return Math;
  }
);