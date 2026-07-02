// Given the root of a binary tree, return true if it is a valid binary search tree, otherwise return false.

// A valid binary search tree satisfies the following constraints:

// The left subtree of every node contains only nodes with keys less than the node's key.
// The right subtree of every node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees are also binary search trees.
// Example 1:



// Input: root = [2,1,3]

// Output: true
// Example 2:



// Input: root = [1,2,3]

// Output: false
// Explanation: The root node's value is 1 but its left child's value is 2 which is greater than 1.

var isValidBST = function(root) {
    return isValidBSTHelper(root, null, null);
}

var isValidBSTHelper = function(node, min, max) {
    if (!node) return true;
    if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) return false;
    return isValidBSTHelper(node.left, min, node.val) && isValidBSTHelper(node.right, node.val, max);
}

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const root1 = new TreeNode(2, new TreeNode(1), new TreeNode(3));
const root2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));

console.log(isValidBST(root1)); // true
console.log(isValidBST(root2)); // false

// java code
// class Solution {
//     public boolean isValidBST(TreeNode root) {
//         return isValidBSTHelper(root, null, null);
//     }
//
//     private boolean isValidBSTHelper(TreeNode node, Long min, Long max) {
//         if (node == null) return true;
//         if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
//             return false;
//         }
//         return isValidBSTHelper(node.left, min, (long) node.val)
//             && isValidBSTHelper(node.right, (long) node.val, max);
//     }
// }