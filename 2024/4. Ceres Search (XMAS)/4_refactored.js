const fs = require('fs');
const path = require('path');

// 8 directions: horizontal, vertical, and diagonal
const directions = [
    [0, 1],   // right
    [0, -1],  // left
    [1, 0],   // down
    [-1, 0],  // up
    [1, 1],   // down-right diagonal
    [-1, -1], // up-left diagonal
    [-1, 1],  // up-right diagonal
    [1, -1]   // down-left diagonal
];

/**
 * Check if "XMAS" can be found starting from position (row, col) in the given direction
 */
const findXmasFromPosition = (grid, row, col, direction) => {
    const [dRow, dCol] = direction;
    const target = "XMAS";
    
    for (let i = 0; i < target.length; i++) {
        const newRow = row + dRow * i;
        const newCol = col + dCol * i;
        
        // Check bounds
        if (newRow < 0 || newRow >= grid.length || 
            newCol < 0 || newCol >= grid[newRow].length) {
            return false;
        }
        
        // Check if character matches
        if (grid[newRow][newCol] !== target[i]) {
            return false;
        }
    }
    
    return true;
};

/**
 * Part 1: Count all occurrences of "XMAS" in all directions
 */
const ceresSearch = (str) => {
    const grid = str.trim().split('\n');
    let count = 0;
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 'X') {
                // Check all 8 directions from this X
                for (const direction of directions) {
                    if (findXmasFromPosition(grid, row, col, direction)) {
                        count++;
                    }
                }
            }
        }
    }
    
    return count;
};

/**
 * Check if there's a valid X-MAS pattern centered at position (row, col)
 * An X-MAS consists of two "MAS" words forming an X shape
 */
const isValidXMas = (grid, row, col) => {
    // Check bounds - need space for diagonals
    if (row - 1 < 0 || row + 1 >= grid.length || 
        col - 1 < 0 || col + 1 >= grid[row].length) {
        return false;
    }
    
    // Get the four corner positions around the 'A'
    const topLeft = grid[row - 1][col - 1];
    const topRight = grid[row - 1][col + 1];
    const bottomLeft = grid[row + 1][col - 1];
    const bottomRight = grid[row + 1][col + 1];
    
    // Check if both diagonals form "MAS" (forward or backward)
    const diagonal1 = topLeft + 'A' + bottomRight;  // top-left to bottom-right
    const diagonal2 = topRight + 'A' + bottomLeft;  // top-right to bottom-left
    
    const isValidDiagonal = (str) => str === 'MAS' || str === 'SAM';
    
    return isValidDiagonal(diagonal1) && isValidDiagonal(diagonal2);
};

/**
 * Part 2: Count all X-MAS patterns (two MAS forming an X)
 */
const ceresXMasSearch = (str) => {
    const grid = str.trim().split('\n');
    let count = 0;
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 'A' && isValidXMas(grid, row, col)) {
                count++;
            }
        }
    }
    
    return count;
};

// Test data
const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

console.log('=== Part 1: Finding XMAS ===');
console.log('Test data result (expected 18):', ceresSearch(testData));

console.log('\n=== Part 2: Finding X-MAS ===');
console.log('Test data result (expected 9):', ceresXMasSearch(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '4.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    console.log('Part 1 (XMAS count):', ceresSearch(data));
    console.log('Part 2 (X-MAS count):', ceresXMasSearch(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

// Part 1 (XMAS Search):
//      Fixed the core logic: Now correctly searches for the complete "XMAS" word starting from each 'X'
//      Simplified direction handling: Clean array of direction vectors without unnecessary labels
//      Better bounds checking: More readable and reliable boundary validation
//      Removed excessive logging: Clean output without debug clutter
// Part 2 (X-MAS Search):
//      Completely rewrote the algorithm: Much simpler and more intuitive approach
//      Clear diagonal checking: Forms complete 3-letter words from diagonals and checks if they're "MAS" or "SAM"
//      Centered on 'A': Correctly identifies the center of the X pattern
//      Simplified validation: Just two diagonal checks instead of complex direction arrays
// General Improvements:
//      Better function names: More descriptive and self-documenting
//      Clear comments: Explains what each function does
//      Consistent code style: Proper formatting and structure
//      Better test output: Shows expected vs actual results for easy verification
// The Main Issues in Your Original Code:
//      Part 1: You were searching for "MAS" starting from 'X', but you needed to search for the complete "XMAS"
//      Part 2: Your direction logic was overly complex and didn't correctly identify the X pattern
//      Debug output: Too much logging made it hard to see the actual results