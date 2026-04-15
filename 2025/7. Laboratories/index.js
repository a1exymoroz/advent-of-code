const fs = require('fs');
const path = require('path');

const testData = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

const laboratories = (input) => {
    const lines = input.split('\n');
    const grid = lines.map(line => line.split(''));
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'S') {
                grid[i + 1][j] = '|';
            } else if (grid[i][j] === '^') {
                grid[i + 1][j + 1] = '|';
                grid[i + 1][j - 1] = '|';
            } 
            else if (i + 1 < grid.length && grid[i][j] === '|' && grid[i][j] !== '^') {
                grid[i + 1][j] = '|';
            }

        }
    }

    console.log(grid.map(line => line.join('')).join('\n'));
    return count;
}

console.log('Part 1: 4277556', laboratories(testData));
// console.log('Part 2 (test): 3263827', laboratoriesPart2(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {   
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 4277556', laboratories(data));
    // console.log('Part 2 (real):', laboratoriesPart2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}
