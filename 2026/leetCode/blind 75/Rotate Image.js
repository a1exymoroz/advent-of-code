// Given a square n x n matrix of integers matrix, rotate it by 90 degrees clockwise.

// You must rotate the matrix in-place. Do not allocate another 2D matrix and do the rotation.

// Example 1:



// Input: matrix = [
//   [1,2],
//   [3,4]
// ]

// Output: [
//   [3,1],
//   [4,2]
// ]
// Example 2:



// Input: matrix = [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ]

// Output: [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]


var rotate = function(matrix) {
    let l = 0;
    let r = matrix.length - 1;

    while (l < r) {
        for (let i = 0; i < r - l; i++) {
            const top = l;
            const bottom = r;

            // save the topleft
            const topLeft = matrix[top][l + i];

            // move bottom left into top left
            matrix[top][l + i] = matrix[bottom - i][l];

            // move bottom right into bottom left
            matrix[bottom - i][l] = matrix[bottom][r - i];

            // move top right into bottom right
            matrix[bottom][r - i] = matrix[top + i][r];

            // move top left into top right
            matrix[top + i][r] = topLeft;
        }
        r--;
        l++;
    }
    return matrix;
}

console.log(rotate([[1,2],[3,4]]));
console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]));