define(
  [ 'lib/Box2d', 'core/Timer', 'core/Message', 'manager/MessageManager' ], function( _Box2d, Timer, Message, MessageManager ) {

    /**
     * @requires lib/Box2d
     * @requires core/Timer
     * @requires core/Message
     * @requires manager/MessageManager
     * @exports manager/PhysicsManager
     */
    var PhysicsManager = {};

    /**
     * Box2D Physics World.
     * @type {Box2D.b2World}
     * @default null
     */
    PhysicsManager.world = null;

    /**
     * Number of Velocity Iterations on the physics world. The more iterations, the more accurate the calculations.
     * @type {Number}
     * @default 2
     */
    PhysicsManager.velocityIterations = 2;

    /**
     * Number of Position Iterations on the physics world. The more iterations, the more accurate the calculations.
     * @type {Number}
     * @default 2
     */
    PhysicsManager.positionIterations = 2;

    /**
     * Flag to remove any accumulated forces at every physics update.
     * @type {Number}
     * @default false
     */
    PhysicsManager.clearForcesOnUpdate = false;

    /** @constant */
    PhysicsManager.BEGIN_CONTACT = 1; // 0001
    /** @constant */
    PhysicsManager.END_CONTACT = 2; // 0010
    /** @constant */
    PhysicsManager.BEGIN_END_CONTACT = 3; // 0011
    /** @constant */
    PhysicsManager.PRE_SOLVE = 4; // 0100
    /** @constant */
    PhysicsManager.POST_SOLVE = 8; // 1000
    /** @constant */
    PhysicsManager.ALL_LISTENERS = 15; //1111

    /** */
    PhysicsManager.listeners = 0; //0000

    /** */
    PhysicsManager.contactListener = null;

    /**
     * Creates the physics World on box2D with given properties.
     * @param {THREE.Vector2} gravity - 2D vector pointing the direction of the gravity
     * @param {Boolean} allowSleep - Flags if an object can sleep outside the boundaries of the physics world
     * @param {String} listeners - Constants to signal which listeners will be active
     * @param {module:core/GameObject} world - Root node of GameObject tree
     */
    PhysicsManager.createWorld = function( gravity, allowSleep, listeners, world ) {
      this.world = new Box2D.b2World( new Box2D.b2Vec2( gravity.x, gravity.y ), allowSleep || false );
      this.listeners = ( listeners ) ? listeners : this.BEGIN_END_CONTACT; //0011
      this.createListener( world );
    };

    /**
     * Attaches a given Rigid Body to the Physics World of Box2D.
     * @param {module:component/RigidBody} rigidBody - A Monogatari RigidBody component to be attached
     */
    PhysicsManager.attachToWorld = function( rigidBody ) {
      rigidBody.body = this.world.CreateBody( rigidBody.bodyDef );
    };

    /**
     * Destroys a given Rigid Body on the Physics World of Box2D.
     * @param {module:component/RigidBody} rigidBody - A Monogatari RigidBody component to be attached
     */
    PhysicsManager.destroyBody = function( rigidBody ) {
      return this.world.DestroyBody( rigidBody.bodyDef );
    };

    /**
     * Creates the callback functions to the listeners set on the createWorld method. <br>
     * The listeners will contain the information about the contacts and send them a Message through the MessageManager class. <br>
     * Some callback functions like preSolve and postSolve are called constantly, be aware of messages flooding between Game Objects.
     * @param {module:core/GameObject} world - Root node of GameObject tree
     */
    PhysicsManager.createListener = function( world ) {
      this.contactListener = new Box2D.JSContactListener();

      this.contactListener.BeginContact = ( this.listeners & this.BEGIN_CONTACT ) ?
        function( _contact ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var goA = world.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = world.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "BeginContact", contact ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "BeginContact", contact ) );
          }

        } : function() {};

      this.contactListener.EndContact = ( this.listeners & this.END_CONTACT ) ?
        function( _contact ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var goA = world.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = world.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "EndContact", contact ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "EndContact", contact ) );
          }
        } : function() {};

      this.contactListener.PreSolve = ( this.listeners & this.PRE_SOLVE ) ?
        function( _contact, _oldManifold ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var manifold = Box2D.wrapPointer( _oldManifold, Box2D.b2Manifold );
          var goA = world.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = world.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "PreSolve", { contact: contact, manifold: manifold } ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "PreSolve", { contact: contact, manifold: manifold } ) );
          }
        } : function() {};

      this.contactListener.PostSolve = ( this.listeners & this.POST_SOLVE ) ?
        function( _contact, _impulse ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var impulse = Box2D.wrapPointer( _impulse, Box2D.b2ContactImpulse );
          var goA = world.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = world.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "PostSolve", { contact: contact, impulse: impulse } ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "PostSolve", { contact: contact, impulse: impulse } ) );
          }
        } : function() {};

      this.world.SetContactListener( this.contactListener );
    };

    /**
     * Physics world heartbeat, updates based on the engine FPS and the current velocity and position Iterations.
     */
    PhysicsManager.update = function() {
      if( this.world ) {
        var fps = Timer.fps;

        // Frame rate at which to update physics ( 1 / FPS or 1.0 / 60.0 )
        var physicsFrameRate = ( fps ) ? 1 / fps : Timer.FRAME_RATE_60FPS;

        this.world.Step( physicsFrameRate, this.velocityIterations, this.positionIterations );

        if( this.clearForcesOnUpdate ) {
          this.world.ClearForces();
        }
      }
    };

    return PhysicsManager;
  }
);