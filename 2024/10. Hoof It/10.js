const fs = require('fs');
const path = require('path');

// --- BFS Algorithm Implementation ---

const sumTrailheadScore = (lines, startX, startY, isCheckVisited = false) => {
    const rows = lines.length;
    const cols = lines[0].length;

    const directions = [
        [0, 1, 'down'],   // down
        [0, -1, 'up'],  // up
        [1, 0, 'right'],   // right
        [-1, 0, 'left'],  // left
    ];
    
    const queue = [[startX, startY]];
    const visited = new Set([`${startX},${startY}`]);

    let count = 0;

    while (queue.length > 0) {
        const [currX, currY] = queue.shift();

        if (lines[currY][currX] === 9) {
            count++;
            continue;
        }

        for (const [dx, dy] of directions) {
            const nextX = currX + dx;
            const nextY = currY + dy;
            const nextKey = `${nextX},${nextY}`;

            if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
                continue;
            }

            if (lines[nextY][nextX] === lines[currY][currX] + 1 && !isCheckVisited) {
                queue.push([nextX, nextY]);
            }

            if (lines[nextY][nextX] === lines[currY][currX] + 1 && isCheckVisited && !visited.has(nextKey)) {
                visited.add(nextKey);
                queue.push([nextX, nextY]);
            }
        }
    }

    return count;
}


const hoofIt = (input, isCheckVisited = false) => {
    const lines = input.trim().split('\n').map(line => line.split('').map(Number));

    let sum = 0;

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === 0) {
                sum += sumTrailheadScore(lines, x, y, isCheckVisited);
            }
        }
    }

    return sum;
}

// Test data
const testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

console.log('\n=== Expected vs Actual ===');
console.log('Part 1 - Actual: 36', hoofIt(testData, true));
console.log('Part 2 - Actual: 81', hoofIt(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '10.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    console.log('Part 1: 652', hoofIt(data, true));
    console.log('Part 2: 1432', hoofIt(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}