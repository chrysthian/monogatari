// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[core/Math.js]
// @Requires[lib/Three.js]

Monogatari.Node = Class.extend( {
  init : function( position, rotation, scale ) {
    this.position = ( position ) ? position : new THREE.Vector3( 0, 0, 0 );
    this.rotation = ( rotation ) ? rotation : new THREE.Vector3( 0, 1, 0 ); // new THREE.Euler()
    this.scale = ( scale ) ? scale : new THREE.Vector3( 1, 1, 1 );

    this.componentType = Monogatari.Constants.COMPONENT_NODE;
  },

  negate : function() {
    this.position.negate();
    this.rotation.negate();
    this.scale.negate();
  },

  getEulerRotation : function( axis ){
    var a = ( axis ) ? axis : Monogatari.Math.getYAlignedVector();
    var angle = this.rotation.angleTo( a );

    return ( this.rotation.y * a.x > this.rotation.x * a.y ) ? -angle : angle;
  },

  getEulerRotationToTarget : function( target, axis ){
    var node = this.clone();

    node.position.y = -node.position.y;
    node.rotation = target.sub( node.position );
    node.rotation.normalize();

    var a = ( axis ) ? axis : Monogatari.Math.getYAlignedVector();
    var angle = this.rotation.angleTo( a );

    return ( node.rotation.y * a.x > node.rotation.x * a.y ) ? -angle : angle;
  },

  clone : function() {
    return new Monogatari.Node( this.position.clone(), this.rotation.clone(), this.scale.clone() );
  }
} );