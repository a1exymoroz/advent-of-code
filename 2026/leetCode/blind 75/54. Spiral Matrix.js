// Given an m x n matrix, return all elements of the matrix in spiral order.

 

// Example 1:


// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
// Example 2:


// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]


/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const directions = [
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
        [-1, 0] // up
    ];

    const stack = [[0, 0]];
    let direction = 0;
    const visited = new Set();
    const result = [];
    

    while (stack.length ) {
        const [x, y] = stack.pop();

        visited.add(`${x},${y}`);
        result.push(matrix[x][y]);

        let [dx, dy] = directions[direction];
        let newX = x + dx;
        let newY = y + dy;

        if (newX < 0 || newX >= matrix.length || newY < 0 || newY >= matrix[0].length || visited.has(`${newX},${newY}`)) {
            direction = (direction + 1) % 4;
            [dx, dy] = directions[direction];
            newX = x + dx;
            newY = y + dy;
        }

        if (newX < 0 || newX >= matrix.length || newY < 0 || newY >= matrix[0].length || visited.has(`${newX},${newY}`)) {
            break;
        }

        stack.push([newX, newY]);
    }

    return result;
};

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));