// Given an m x n matrix of integers matrix, if an element is 0, set its entire row and column to 0's.

// You must update the matrix in-place.

// Follow up: Could you solve it using O(1) space?

// Example 1:



// Input: matrix = [
//   [0,1],
//   [1,0]
// ]

// Output: [
//   [0,0],
//   [0,0]
// ]
// Example 2:



// Input: matrix = [
//   [1,2,3],
//   [4,0,5],
//   [6,7,8]
// ]

// Output: [
//   [1,0,3],
//   [0,0,0],
//   [6,0,8]
// ]

var setZeroes = function(matrix) {
    const zeros = [];

    for(let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                zeros.push([row, col]);
            }
        }
    }

    const directions = [
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
        [-1, 0] // up
    ]
    for (let [row, col] of zeros) {

        for (let [dy, dx] of directions) {
            let newDy = row + dy;
            let newDx = col + dx;
            while (newDy >= 0 && newDy < matrix.length && newDx >= 0 && newDx < matrix[0].length) {
                matrix[newDy][newDx] = 0;
                newDy += dy;
                newDx += dx;
            }
        }
    }
}

var setZeroes = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let zeroRow = false;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (matrix[row][col] === 0) {
                matrix[0][col] = 0;

                if (row === 0) zeroRow = true;
                else matrix[row][0] = 0;
            }
        }
    }

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            if (matrix[0][col] === 0 || matrix[row][0] === 0) {
                matrix[row][col] = 0;
            }
        }
    }

    if (matrix[0][0] === 0) {
        for (let row = 0; row < rows; row++) {
            matrix[row][0] = 0;
        }
    }


    if (zeroRow) {
        for (let col = 0; col < cols; col++) {
            matrix[0][col] = 0;
        }
    }

    return matrix;
}

// console.log(setZeroes([[0,1],[1,0]]));
// console.log(setZeroes([[1,2,3],[4,0,5],[6,7,8]]));

const matrix=[[0,1,2,0],[3,4,5,2],[1,3,1,5]];
setZeroes(matrix);
console.log(matrix);