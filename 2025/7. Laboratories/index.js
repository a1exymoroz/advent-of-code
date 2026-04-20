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
    let startX = 0;
    let startY = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'S') {
                startX = j;
                startY = i;
                grid[i + 1][j] = '|';
            } else if (grid[i][j] === '^' && grid[i - 1][j] === '|') {
                grid[i][j + 1] = '|';
                grid[i][j - 1] = '|';
                count++;
            } else if (grid[i][j] === '.' && grid?.[i - 1]?.[j] === '|') {
                grid[i][j] = '|';
            }

        }
    }

    // console.log(grid.map(line => line.join('')).join('\n'));
    return {count, grid, start: {x: startX, y: startY}};
}

const allPossiblePaths = (grid, start) => {
    const lastRow = grid[grid.length - 1];
    for (let i = 0; i < lastRow.length; i++) {
        if (lastRow[i] === '|') {
            lastRow[i] = 1;
        }
    }
    console.log(grid.map(line => line.join('')).join('\n'));

    for (let i = grid.length - 2; i >= 0; i--) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '|') {
                grid[i][j] = grid[i + 1][j];

            } else if (grid[i][j] === '^') {
                grid[i][j] = grid[i + 1][j - 1] + grid[i + 1][j + 1];
                // if (j > 0) grid[i][j] += grid[i + 1][j - 1];
                // if (j < grid[i].length - 1) grid[i][j] += grid[i + 1][j + 1];
            }
        }
    }

    console.log(grid.map(line => line.join('')).join('\n'));

    return grid[start.y + 1][start.x];
}

const countPaths = (grid, start) => {
    const height = grid.length;
    const width = grid[0].length;
    
    const pathCount = Array.from({length: height}, () => Array(width).fill(0n));
    
    for (let x = 0; x < width; x++) {
        if (grid[height - 1][x] === '|') {
            pathCount[height - 1][x] = 1n;
        }
    }
    
    for (let y = height - 2; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            if (cell === '|' || cell === 'S') {
                const below = grid[y + 1]?.[x];
                if (below === '|') {
                    pathCount[y][x] = pathCount[y + 1][x];
                } else if (below === '^') {
                    const left = (x > 0) ? pathCount[y + 1][x - 1] : 0n;
                    const right = (x < width - 1) ? pathCount[y + 1][x + 1] : 0n;
                    pathCount[y][x] = left + right;
                }
            }
        }
    }
    
    return pathCount[start.y][start.x];
}

const laboratoriesPart2 = (input) => {
    const {count, grid, start} = laboratories(input);
    const paths = allPossiblePaths(grid, start);
    return paths;
}

// console.log(`.......S.......
// .......|.......
// ......|^|......
// ......|.|......
// .....|^|^|.....
// .....|.|.|.....
// ....|^|^|^|....
// ....|.|.|.|....
// ...|^|^|||^|...
// ...|.|.|||.|...
// ..|^|^|||^|^|..
// ..|.|.|||.|.|..
// .|^|||^||.||^|.
// .|.|||.||.||.|.
// |^|^|^|^|^|||^|
// |.|.|.|.|.|||.|`);

// console.log('Part 1: 21', laboratories(testData));
// console.log('Part 2 (test): 3263827', laboratoriesPart2(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {   
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 4277556', laboratories(data));
    console.log('Part 2 (real):', laboratoriesPart2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}
