const fs = require('fs');
const path = require('path');


// --- BFS Algorithm Implementation ---

const findRegion = (lines, startX, startY) => {
    const grid = [...lines.map(row => [...row])];
    const rows = grid.length;
    const cols = grid[0].length;
    const targetChar = grid[startY][startX];

    const directions = [
        [0, 1, 'down'],   // down
        [0, -1, 'up'],  // up
        [1, 0, 'right'],   // right
        [-1, 0, 'left'],  // left
    ];
    
    const queue = [[startX, startY]];
    const visited = new Set([`${startX},${startY}`]);
    grid[startY][startX] = '*';

    while (queue.length > 0) {
        const [currX, currY] = queue.shift();

        for (const [dx, dy] of directions) {
            const nextX = currX + dx;
            const nextY = currY + dy;
            const nextKey = `${nextX},${nextY}`;

            if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
                continue;
            }

            if (grid[nextY][nextX] === targetChar && !visited.has(nextKey)) {
                queue.push([nextX, nextY]);
                visited.add(nextKey);
                grid[nextY][nextX] = '*';
            }
        }
    }

    console.log('Region Grid:');
    console.log(grid.map(line => line.join('')).join('\n'));

    return {visited, gridBoundary: grid};
}

const sumPerimeter = (visited) => {
    let perimeter = 0;

    const deltas = [
        [0, 1],   // down
        [0, -1],  // up
        [1, 0],   // right
        [-1, 0],  // left
    ];

    for (const pos of visited) {
        const [x, y] = pos.split(',').map(Number);

        for (const [dx, dy] of deltas) {
            const neighborKey = `${x + dx},${y + dy}`;
            if (!visited.has(neighborKey)) {
                perimeter++;
            }
        }
    }

    return perimeter;
}

const sumSides = (visited) => {
    let sides = 0;

    const deltas = [
        [0, 1],   // down
        [0, -1],  // up
        [1, 0],   // right
        [-1, 0],  // left
    ];

    const uniqueSides = new Set();

    for (const pos of visited) {
        const [x, y] = pos.split(',').map(Number);

        for (const [dx, dy] of deltas) {
            const neighborKey = `${x + dx},${y + dy}`;
            if (!visited.has(neighborKey)) {
                uniqueSides.add(neighborKey);
            }
        }
    }
    const yMap = new Map();
    for (const side of uniqueSides) {
        const [x, y] = side.split(',').map(Number);
        if (!yMap.has(y)) {
            yMap.set(y, new Set());
        }
        yMap.get(y).add(x);
    }

    for (const [y, xSet] of yMap.entries()) {
        const xArray = Array.from(xSet).sort((a, b) => a - b);
        let prevX = null;
        for (const x of xArray) {
            if (prevX === null || x !== prevX + 1) {
                sides++;
            }
            prevX = x;
        }
    }
    return sides;
}

const gardenGroups = (input) => {
    const lines = input.trim().split('\n').map(line => line.split(''));

    let calcPerimeter = 0;
    let calcSides = 0;

    const visitedGlobal = [];

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {

            if (!visitedGlobal.includes(`${x},${y}`)) {
                const {visited, gridBoundary} = findRegion(lines, x, y);
                const perimeter = sumPerimeter(visited);
                const sides = sumSides(visited);
                calcPerimeter += perimeter * visited.size;
                calcSides += sides * visited.size;
                visitedGlobal.push(...visited);
                console.log(`Group at (${x},${y}) - Size: ${visited.size}, Perimeter: ${perimeter}, Contribution to sum: ${perimeter * visited.size}`);
            }
        }
    }

    return {calcPerimeter, calcSides};
}

// Test data
const testData = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

console.log('\n=== Expected vs Actual ===');
console.log('Part 1 - Actual: 1930', gardenGroups(testData));
// console.log('Part 2 - Actual: 81', gardenGroups(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '12.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    // console.log('Part 1: 652', gardenGroups(data));
    // console.log('Part 2: 1432', gardenGroups(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}