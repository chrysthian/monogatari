define(
  [ 'core/Common' ], function( Common ) {

    var TreeNode = function( data, parent ) {
      this.data = data;
      this.parent = parent;
      this.children = [];
    };

    var Tree = function() {
      this.root = new TreeNode( 'root' );
    };

    Tree.prototype.find = function( data, startNode ) {
      var sNode = startNode ? startNode : this.root;

      var findAux = function( data, currentNode ) {
        if( Common.equals( data, currentNode.data ) ) {
          return currentNode;
        } else {
          for( var i = 0; i < currentNode.children.length; i++ ) {
            var result = findAux( data, currentNode.children[ i ] );
            if( result ) {
              return result;
            }
          }
          return null;
        }
      };

      return findAux( data, sNode );
    };

    Tree.prototype.put = function( data, parent ) {
      var pNode;
      if( parent ) {
        pNode = this.find( parent );
      }
      pNode = pNode ? pNode : this.root;
      pNode.children.push( new TreeNode( data, pNode ) );
    };

    Tree.prototype.remove = function( data ) {
      var node = this.find( data );
      if( node ) {
        // Remove reference from parent children
        var index;
        for( var i = 0; i < node.parent.children.length; i++ ) {
          if( Common.equals( node.parent.children[ i ].data, data ) ) {
            index = i;
          }
        }
        node.parent.children.splice( index, 1 );
        // Remove own references
        node.parent = null;
        node.children.length = 0;
      }
    };

    Tree.prototype.clear = function() {
      this.root.children.length = 0;
    };

    Tree.prototype.move = function( data, parent ) {
      remove( data );
      put( data, parent );
    };

    Tree.prototype.listChildren = function( data ) {
      var node = this.find( data );
      if( node ) {
        return node.children;
      } else {
        return null;
      }
    };

    Tree.prototype.listDescendants = function( data ) {
      var node = this.find( data );

      var listDescendantsAux = function( node, result ) {
        for( var i = 0; i < node.children.length; i++ ) {
          result.push( node.children[ i ] );
          result = listDescendantsAux( node.children[ i ], result );
        }
        return result;
      };

      if( node ) {
        return listDescendantsAux( node, [] );
      } else {
        return null;
      }
    };

    Tree.prototype.toArray = function() {
      return this.listDescendants( this.root );
    };

    return Tree;
  }
);