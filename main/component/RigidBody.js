/**
 * Exports the {@link module:component/RigidBody~RigidBody|RigidBody} class.
 * @module component/RigidBody
 */

define(
  [ 'component/Base', 'lib/Box2d' ], function( Base, _Box2d ) {

    /**
     * Box2D has been tuned to work well with moving objects between 0.1 and 10 meters.
     * So this means objects between soup cans and buses in size should work well.
     * Static objects may be up to 50 meters big without too much trouble.
     * Box2D is tuned for meters, kilograms, and seconds.
     *
     * @param {Number} conversionFactor Multiplies the position from physics world (meters) to screen coordinates (pixels). Defaults to 1 (probably not what you expect).
     * @param {b2BodyDef} bodyDef Box2D physics body definition
     * @param {b2FixtureDef} materialDef Box2D physics material definition
     * @class RigidBody
     */

    // [ b2BodyDef ] http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2BodyDef.html
    // [ b2FixtureDef ] http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2FixtureDef.html

    var RigidBody = function( conversionFactor, bodyDef, materialDef ) {
      Base.call( this, Base.RIGID_BODY );

      this.conversionFactor = ( conversionFactor ) ? conversionFactor : 1;
      this.bodyDef = ( bodyDef ) ? bodyDef : new Box2D.b2BodyDef();
      this.materialDef = ( materialDef ) ? materialDef : new Box2D.b2FixtureDef();

      this.body = null;
    };

    RigidBody.prototype = Object.create( Base.prototype );

    /**
     * Enumeration of rigid body types
     * @example
     *
     * RigidBody.prototype.STATIC = 1;
     * RigidBody.prototype.KINEMATIC = 2;
     * RigidBody.prototype.DYNAMIC = 3;
     *
     * @memberOf module:component/RigidBody~RigidBody
     * @enum
     * @name TYPE
     * @type {Number}
     */
    RigidBody.prototype.STATIC = 1;
    RigidBody.prototype.KINEMATIC = 2;
    RigidBody.prototype.DYNAMIC = 3;

    /**
     * Sets the density of the material
     * @instance
     * @method
     * @name setDensity
     * @param {number} density In kg/m^2.
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setDensity = function( density ) {
      this.materialDef.set_density( density );
    };

    /**
     * Sets the friction of the material
     * @instance
     * @method
     * @name setDensity
     * @param {number} friction Usually in the range [0,1].
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setFriction = function( friction ) {
      this.materialDef.set_friction( friction );
    };

    /**
     * Sets the bounciness of the material
     * @instance
     * @method
     * @name setBounciness
     * @param {number} bounciness Usually in the range [0,1].
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setBounciness = function( bounciness ) {
      this.materialDef.set_restitution( bounciness );
    };

    /**
     * Sets the setPosition of the body, in the physics world, NOT in pixels or game world, a proper scale is required to draw.
     * @instance
     * @method
     * @name setPosition
     * @param {Number} x Coordinate X
     * @param {Number} y Coordinate Y
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setPosition = function( x, y ) {
      this.bodyDef.get_position().set_x( x );
      this.bodyDef.get_position().set_y( y );
    };

    /**
     * Sets the angle (rotation) of the body.
     * @instance
     * @method
     * @name setRotation
     * @param {number} angle In radians.
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setRotation = function( angle ) {
      this.bodyDef.angle.set_angle( angle );
    };

    /**
     * Sets geometrical shape of this RigidBody.
     * @instance
     * @method
     * @name setShape
     * @param {b2Shape} shape This is mandatory to use the component..
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setShape = function( shape ) {
      this.materialDef.set_shape( shape );
    };

    /**
     * Prevents the collision to be resolved by Box2D, but retains collision information.
     * @instance
     * @method
     * @name setSensor
     * @param {boolean} isSensor
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setSensor = function( isSensor ) {
      this.materialDef.set_isSensor( isSensor );
    };

    /**
     * Prevents the collision to be resolved through other objects.
     * <b>Expensive! Use with care.</b>
     * @instance
     * @method
     * @name setPreventTunneling
     * @param {boolean} preventTunneling
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setPreventTunneling = function( preventTunneling ) {
      this.bodyDef.set_bullet( preventTunneling );
    };

    /**
     * A <b>dynamic body</b> is a body which is affected by world forces and react to collisions.<BR>
     * A <b>static body</b> is a body which isn’t affected by world forces it does not react to collisions. It can’t be moved.<BR>
     * A <b>kinematic body</b> is an hybrid body which is not affected by forces and collisions like a static body but can moved with a linear velocity like a dynamic body.
     * @instance
     * @method
     * @name setType
     * @param {Number} type
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setType = function( type ) {
      switch( type ) {
        case this.STATIC:
          this.bodyDef.set_type( Box2D.b2_staticBody );
          break;
        case this.KINEMATIC:
          this.bodyDef.set_type( Box2D.b2_kinematicBody );
          break;
        case this.DYNAMIC:
          this.bodyDef.set_type( Box2D.b2_dynamicBody );
          break;
        default:
          this.bodyDef.set_type( Box2D.b2_staticBody );
          break;
      }
    };

    /**
     * Prevents or allows the rotation on the RigidBody.
     * @instance
     * @method
     * @name setAllowRotation
     * @param {boolean} allowRotation
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setAllowRotation = function( allowRotation ) {
      this.bodyDef.set_fixedRotation( !allowRotation );
    };

    /**
     * Creates the fixture on the body of the physics world
     * @instance
     * @method
     * @name createFixture
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.createFixture = function() {
      if( this.body && this.materialDef ) {
        this.body.CreateFixture( this.materialDef );
      }
    };

    /**
     * Allows to store a data (in the means of a pointer) of an object to work with the internal memory of the Box2D<br>
     * userData is (kinda) bugged on emscripten version of the box2D port, but can be worked around
     * https://github.com/kripken/box2d.js/issues/35
     *
     * @instance
     * @method
     * @name setUserData
     * @param {Object} userData
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.setUserData = function( userData ) {
      this.materialDef.set_userData( userData );
    };

    /**
     * Returns the Box2D.BodyDef from this component, null if not set;
     * @method
     * @instance
     * @name getBodyDef
     * @return {b2BodyDef} Body Definition from Box2D
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.getBodyDef = function() {
      return this.bodyDef;
    };

    /**
     * Returns the Material (Box2D.FixtureDef)from this component, null if not set;
     * @method
     * @instance
     * @name getBodyDef
     * @return {b2FixtureDef} Fixture Definition from Box2D
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.getMaterialDef = function() {
      return this.materialDef;
    };

    /**
     * Returns the Physics Body (Box2D.BodyDef) from this component, null if not set;
     * @method
     * @instance
     * @name getBodyDef
     * @return {b2Body} Body from Box2D
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.getPhysicsBody = function() {
      return this.body;
    };

    /**
     * Returns a new instance of a RigidBody with the same values
     * @method
     * @instance
     * @name clone
     * @return {RigidBody} a clone of this RigidBody
     * @memberOf module:component/RigidBody~RigidBody
     */
    RigidBody.prototype.clone = function() {
      return new RigidBody( this.conversionFactor, this.bodyDef, this.materialDef );
    };

    return RigidBody;
  }
);