// The diameter of a binary tree is defined as the length of the longest path between any two nodes within the tree. The path does not necessarily have to pass through the root.

// The length of a path between two nodes in a binary tree is the number of edges between the nodes. Note that the path can not include the same node twice.

// Given the root of a binary tree root, return the diameter of the tree.

// Example 1:



// Input: root = [1,null,2,3,4,5]

// Output: 3
// Explanation: 3 is the length of the path [1,2,3,5] or [5,3,2,4].

// Example 2:

// Input: root = [1,2,3]

// Output: 2

var diameterOfBinaryTree = function(root) {
    let res = 0;

    const dfs = (node) => {
        if (node == null) return 0;

        const left = dfs(node.left);
        const right = dfs(node.right);

        res = Math.max(res, left + right);

        return Math.max(left, right) + 1;
    }

    return res;
}

console.log(diameterOfBinaryTree([1,null,2,3,4,5]));
console.log(diameterOfBinaryTree([1,2,3]));