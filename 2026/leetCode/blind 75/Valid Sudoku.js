// You are given a 9 x 9 Sudoku board board. A Sudoku board is valid if the following rules are followed:

// Each row must contain the digits 1-9 without duplicates.
// Each column must contain the digits 1-9 without duplicates.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without duplicates.
// Return true if the Sudoku board is valid, otherwise return false

// Note: A board does not need to be full or be solvable to be valid.

// Example 1:

// Input: board =
// [["1","2",".",".","3",".",".",".","."],
//  ["4",".",".","5",".",".",".",".","."],
//  [".","9","8",".",".",".",".",".","3"],
//  ["5",".",".",".","6",".",".",".","4"],
//  [".",".",".","8",".","3",".",".","5"],
//  ["7",".",".",".","2",".",".",".","6"],
//  [".",".",".",".",".",".","2",".","."],
//  [".",".",".","4","1","9",".",".","8"],
//  [".",".",".",".","8",".",".","7","9"]]

// Output: true
// Example 2:

// Input: board =
// [["1","2",".",".","3",".",".",".","."],
//  ["4",".",".","5",".",".",".",".","."],
//  [".","9","1",".",".",".",".",".","3"],
//  ["5",".",".",".","6",".",".",".","4"],
//  [".",".",".","8",".","3",".",".","5"],
//  ["7",".",".",".","2",".",".",".","6"],
//  [".",".",".",".",".",".","2",".","."],
//  [".",".",".","4","1","9",".",".","8"],
//  [".",".",".",".","8",".",".","7","9"]]

// Output: false

var isValidSudoku = function(board) {

    const checkRows = (board) => {
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set();
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') continue;
                if (rowSet.has(board[i][j])) return false;
                rowSet.add(board[i][j]);
            }
        }
        return true;
    }
    const checkColumns = (board) => {
        for (let i = 0; i < 9; i++) {
            const colSet = new Set();
            for (let j = 0; j < 9; j++) {
                if (board[j][i] === '.') continue;
                if (colSet.has(board[j][i])) return false;
                colSet.add(board[j][i]);
            }
        }
        return true;
    }
    const checkBoxes = (board) => {
        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                const boxSet = new Set();
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (board[i + k][j + l] === '.') continue;
                        if (boxSet.has(board[i + k][j + l])) return false;
                        boxSet.add(board[i + k][j + l]);
                    }
                }
            }
        }
        return true;
    }

    return checkRows(board) && checkColumns(board) && checkBoxes(board);
}

var isValidSudoku2 = function(board) {
    // Bitmasks track which digits 1-9 have already appeared in each row, column,
    // and 3x3 box. Bit i means digit (i + 1) has been seen.
    let rows = new Array(9).fill(0);
    let cols = new Array(9).fill(0);
    let squares = new Array(9).fill(0);

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === '.') continue;

            // Map '1'..'9' to bit positions 0..8.
            let val = board[r][c] - '1';
            const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            // Duplicate if this digit's bit is already set in the row, column, or box.
            if (
                rows[r] & (1 << val) ||
                cols[c] & (1 << val) ||
                squares[box] & (1 << val)
            ) {
                return false;
            }

            // Mark the digit as seen in all three groups.
            rows[r] |= 1 << val;
            cols[c] |= 1 << val;
            squares[box] |= 1 << val;
        }
    }
    return true;
}

console.log(isValidSudoku([["1","2",".",".","3",".",".",".","."],
["4",".",".","5",".",".",".",".","."],
[".","9","8",".",".",".",".",".","3"],
["5",".",".",".","6",".",".",".","4"],
[".",".",".","8",".","3",".",".","5"],
["7",".",".",".","2",".",".",".","6"],
[".",".",".",".",".",".","2",".","."],
[".",".",".","4","1","9",".",".","8"],
[".",".",".",".","8",".",".","7","9"]]));
console.log(isValidSudoku2([["1","2",".",".","3",".",".",".","."],
["4",".",".","5",".",".",".",".","."],
[".","9","1",".",".",".",".",".","3"],
["5",".",".",".","6",".",".",".","4"],
[".",".",".","8",".","3",".",".","5"],
["7",".",".",".","2",".",".",".","6"],
[".",".",".",".",".",".","2",".","."],
[".",".",".","4","1","9",".",".","8"],
[".",".",".",".","8",".",".","7","9"]]));