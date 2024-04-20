class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // Create a new node with the value val
    let node = new Node(val);

    // If the tree is empty, set the root to the new node
    if (this.root === null) {
      this.root = node;
    } else {
      // Start at the root of the tree
      let runner = this.root;

      // Keep track of the parent of the node we are iterating to
      let parent = null;

      // Iterate through the tree until we find a spot to insert the new node
      while (runner) {
        // Update the parent to the current node
        parent = runner;

        // Move left or right in the tree based on the value of the new node
        runner = (val < runner.val) ? runner.left : runner.right;
      }

      // Set the parent of the new node to the parent we found in the iteration
      node.parent = parent;

      // Insert the new node as the left or right child of its parent
      if (val < parent.val) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    }

    // Return the tree
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    // Helper function to insert recursively.
    const insertHelper = (node, val) => {
      // Base case: if the current node is null, create a new node with the
      // value and return it.
      if (node === null) {
        return new Node(val);
      }

      // Recursive case: if the value is less than the current node's value,
      // insert it to the left of the current node. Otherwise, insert it to
      // the right of the current node.
      if (val < node.val) {
        node.left = insertHelper(node.left, val);
      } else {
        node.right = insertHelper(node.right, val);
      }

      // After the recursive call, return the current node.
      return node;
    };

    // Call the helper function with the root of the tree and the value to
    // insert. Update the root of the tree and return it.
    this.root = insertHelper(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    // If the root of the tree is null, there are no nodes in the tree, so
    // return undefined.
    if (this.root === null) {
      return undefined;
    }

    // Start at the root of the tree and iterate through it until we find
    // a node with a value that matches the value we're searching for.
    let runner = this.root;
    while (runner) {

      // If the value to search for is less than the current node's value,
      // move to the left. Otherwise, move to the right.
      if (val < runner.val) {
        runner = runner.left;
      } else if (val > runner.val) {
        runner = runner.right;
      } 

      // If we find a node with a value that matches the value we're
      // searching for, return that node.
      else {
        return runner;
      }
    }

    // If we didn't find a node with a matching value, return undefined.
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findHelper = (node, val) => {
      // If the node is null, we have reached a leaf and have no match.
      if (node === null) {
        return undefined;
      }

      // If the value is less than the node's value, we need to search to the left.
      if (val < node.val) {
        return findHelper(node.left, val); // Recursively call findHelper on the left subtree.
      }

      // If the value is greater than the node's value, we need to search to the right.
      else if (val > node.val) {
        return findHelper(node.right, val); // Recursively call findHelper on the right subtree.
      }

      // If the value matches the node's value, we have found the node we are looking for.
      else {
        return node;
      }
    };

    // Call the helper function with the root of the tree and the provided value.
    return findHelper(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // Initialize an empty array to store the values of the visited nodes.
    let result = [];

    // Define a helper function to do the actual traversal.
    const dfs = (node) => {
      // If the node is null (we have reached a leaf), return.
      if (node === null) {
        return;
      }

      // Push the value of the current node to the result array.
      result.push(node.val);

      // Recursively call the helper function on the left subtree.
      dfs(node.left);

      // Recursively call the helper function on the right subtree.
      dfs(node.right);
    };

    // Start the traversal at the root of the tree.
    dfs(this.root);

    // Return the array of visited node values.
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    // Initialize an empty array to store the values of the visited nodes.
    let result = [];

    // Define a helper function to perform the Depth-First Search (DFS) in-order traversal.
    const dfs = (node) => {
      // If the node is null (we have reached a leaf), return.
      if (node === null) {
        return;
      }

      // Recursively call the helper function on the left subtree.
      // This ensures that we visit all the nodes in the left subtree before the current node.
      dfs(node.left);

      // Push the value of the current node to the result array.
      // This visits the current node after visiting all the nodes in the left subtree.
      result.push(node.val);

      // Recursively call the helper function on the right subtree.
      // This ensures that we visit all the nodes in the right subtree after visiting the current node.
      dfs(node.right);
    };

    // Start the traversal at the root of the tree.
    dfs(this.root);

    // Return the array of visited node values.
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    // Initialize an empty array to store the values of the visited nodes.
    let result = [];

    // Define a helper function to perform the Depth-First Search (DFS) post-order traversal.
    const dfs = (node) => {
      // If the node is null (we have reached a leaf), return.
      if (node === null) {
        return;
      }

      // Recursively call the helper function on the left subtree.
      dfs(node.left);

      // Recursively call the helper function on the right subtree.
      dfs(node.right);

      // After visiting all the nodes in the left and right subtrees,
      // we can now push the value of the current node to the result array.
      // This ensures that we visit all the nodes in the right subtree first,
      // then the nodes in the left subtree, and finally the current node itself.
      result.push(node.val);
    };

    // Start the traversal at the root of the tree.
    dfs(this.root);

    // Return the array of visited node values.
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    // Initialize an empty array to store the values of the visited nodes.
    let result = [];

    // Create a queue to use for BFS, and add the root node to it.
    let queue = [this.root];

    // While the queue is not empty, do the following:
    while (queue.length) {
      // Remove the first node from the queue and assign it to 'node'.
      let node = queue.shift();

      // Add the value of 'node' to the 'result' array.
      result.push(node.val);

      // If 'node' has a left child, add the left child to the queue.
      if (node.left) queue.push(node.left);

      // If 'node' has a right child, add the right child to the queue.
      if (node.right) queue.push(node.right);
    }

    // Return the 'result' array, which now contains the values of the
    // nodes visited in the order of a BFS.
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    // If the root of the tree is null, there is nothing to remove, return undefined.
    if (this.root === null) {
      return undefined;
    }

    // Initialize variables to keep track of the current node and its parent.
    let runner = this.root;
    let parent = null;

    // Loop until we find the node to remove.
    while (runner) {
      // If the current value is less than the value of the node, move to the left child.
      if (val < runner.val) {
        parent = runner;
        runner = runner.left;
      } 
      // If the current value is greater than the value of the node, move to the right child.
      else if (val > runner.val) {
        parent = runner;
        runner = runner.right;
      } 
      // If we have found the node to remove...
      else {
        // If the node has no children...
        if (runner.left === null && runner.right === null) {
          // If the node is the root, set the root to null.
          if (runner === this.root) {
            this.root = null;
          } 
          // If the node is a left child, set the parent's left child to null.
          else if (parent.left === runner) {
            parent.left = null;
          } 
          // If the node is a right child, set the parent's right child to null.
          else {
            parent.right = null;
          }
        } 
        // If the node has only a left child...
        else if (runner.left === null) {
          // If the node is the root, set the root to its right child.
          if (runner === this.root) {
            this.root = runner.right;
          } 
          // If the node is a left child, set the parent's left child to its right child.
          else if (parent.left === runner) {
            parent.left = runner.right;
          } 
          // If the node is a right child, set the parent's right child to its right child.
          else {
            parent.right = runner.right;
          }
        } 
        // If the node has only a right child...
        else if (runner.right === null) {
          // If the node is the root, set the root to its left child.
          if (runner === this.root) {
            this.root = runner.left;
          } 
          // If the node is a left child, set the parent's left child to its left child.
          else if (parent.left === runner) {
            parent.left = runner.left;
          } 
          // If the node is a right child, set the parent's right child to its left child.
          else {
            parent.right = runner.left;
          }
        } 
        // If the node has two children, find its left-most child (smallest value in the right subtree)...
        else {
          // Initialize variables to keep track of the left-most child and its parent.
          let leftMost = runner.right;
          let leftMostParent = runner;

          // Loop until we find the left-most child.
          while (leftMost.left) {
            // Update the variables to keep track of the left-most child and its parent.
            leftMostParent = leftMost;
            leftMost = leftMost.left;
          }

          // Replace the value of the node with the value of the left-most child.
          runner.val = leftMost.val;

          // If the left-most child is a left child, set the parent's left child to its right child.
          if (leftMostParent.left === leftMost) {
            leftMostParent.left = leftMost.right;
          } 
          // If the left-most child is a right child, set the parent's right child to its right child.
          else {
            leftMostParent.right = leftMost.right;
          }
        }
        // Return the node we removed.
        return runner;
      }
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) {
        return { balanced: true, height: -1 }; // Base case: empty trees are balanced, height -1 for easy calculation
      }

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      // Calculate the current node's balance status and height
      const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
      const height = 1 + Math.max(left.height, right.height);

      return { balanced, height };
    };

    // Start the recursive check from the root
    return checkBalance(this.root).balanced;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root === null) {
      return undefined;
    }
    let runner = this.root;
    let runner2 = null;
    while (runner) {
      if (runner.right) {
        runner2 = runner;
        runner = runner.right;
      } else {
        break;
      }
    }
    return runner2 ? runner2.val : undefined;
  }
}

module.exports = BinarySearchTree;
