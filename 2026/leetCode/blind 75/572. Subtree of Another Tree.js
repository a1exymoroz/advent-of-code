// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

 

// Example 1:


// Input: root = [3,4,5,1,2], subRoot = [4,1,2]
// Output: true
// Example 2:


// Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
// Output: false
 



var isSubtree = function(root, subRoot) {
    if (!subRoot) return true;
    if (!root) return false;
    const isSame = (a, b) => {
        if (!a && !b) return true;
        if (!a || !b || a.val !== b.val) return false;
        return isSame(a.left, b.left) && isSame(a.right, b.right);
    };
    const dfs = (node) => {
        if (!node) return false;
        if (isSame(node, subRoot)) return true;
        return dfs(node.left) || dfs(node.right);
    };
    return dfs(root);
};

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}   


// const root = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2)), new TreeNode(5));
// const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

// console.log(isSubtree(root, subRoot));

const root = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2)), new TreeNode(5));
const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(1)));

console.log(isSubtree(root, subRoot));