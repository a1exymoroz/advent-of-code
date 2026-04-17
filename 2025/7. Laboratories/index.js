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
    const {x, y} = start;
    const paths = [];
    const currentPath = [{x, y}];

    while (grid[y][x] !== '^') {
        const newY = y + 1;
        if (grid[newY][x] === '|') {
            currentPath.push({x, y: newY});
            y = newY;
        } else if (grid[newY][x] === '^') {
            const leftPaths = allPossiblePaths(grid, {x: x - 1, y: newY});
            const rightPaths = allPossiblePaths(grid, {x: x + 1, y: newY});
            paths.push(leftPaths, rightPaths);
            break;
        }
    }

    return paths
}

const laboratoriesPart2 = (input) => {
    const {count, grid, start} = laboratories(input);
    const allPossiblePaths = allPossiblePaths(grid, start);
    return allPossiblePaths.length;
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
console.log('Part 2 (test): 3263827', laboratoriesPart2(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {   
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 4277556', laboratories(data));
    // console.log('Part 2 (real):', laboratoriesPart2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}
