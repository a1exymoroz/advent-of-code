const fs = require('fs');
const path = require('path');


const findAntinodes = (lines, x1, y1, nearestTargets) => {
    let sum = 0;

    // Helper function to check bounds and place antinode
    const placeAntinode = (x, y) => {
        if (x >= 0 && x < lines[0].length && y >= 0 && y < lines.length) {
            if (lines[y][x] !== '#' && lines[y][x] !== '.') {
                return 1;
            }
            if (lines[y][x] === '.') {
                lines[y][x] = '#';
                return 1;
            }

        }
        return 0;
    };

    for (const target of nearestTargets) {
        const x2 = target.x;
        const y2 = target.y;

        // Calculate the direction vector from point 1 to point 2
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;

        // Calculate antinode positions by extending the line in both directions
        // Antinode 1: extends backwards from point 1 (opposite direction of the vector)
        const antinode1X = x1 - deltaX;
        const antinode1Y = y1 - deltaY;
        
        // Antinode 2: extends forwards from point 2 (same direction as the vector)
        const antinode2X = x2 + deltaX;
        const antinode2Y = y2 + deltaY;

        // Place both antinodes if they're within bounds
        sum += placeAntinode(antinode1X, antinode1Y);
        sum += placeAntinode(antinode2X, antinode2Y);
    }

    lines[y1][x1] = null;

    return sum;
}



// --- BFS Algorithm Implementation ---
const findSecondFrequency = (lines, startX, startY) => {
    const rows = lines.length;
    const cols = lines[0].length;
    const targetChar = lines[startY][startX];

    const directions = [
        [0, 1, 'down'],   // down
        [0, -1, 'up'],  // up
        [1, 0, 'right'],   // right
        [-1, 0, 'left'],  // left
    ];


    
    // 1. Initialization: Queue stores [x, y, distance]
    const queue = [[startX, startY, 0]];
    // Visited set prevents revisiting nodes (critical for efficiency and avoiding loops)
    const visited = new Set([`${startX},${startY}`]);

    // Log all visited nodes to visualize the search path
    const searchPath = [];

    const nearestTargets = [];

    // 2. Loop: While the Queue is not empty
    while (queue.length > 0) {
        // 3. Dequeue: Get the current position and distance
        const [currX, currY, distance] = queue.shift();

        // Record the path for visualization (excluding start point which is already recorded)
        if (distance > 0) {
            searchPath.push({ x: currX, y: currY, distance: distance });
        }


        // 4. Check & 5. Found!: Check if the current cell is the target
        if (distance > 0 && lines[currY][currX] === targetChar) {
            nearestTargets.push({ x: currX, y: currY, distance: distance });
            // Continue searching for potentially closer targets
        }

        // 6. Explore Neighbors
        for (const [dx, dy] of directions) {
            const nextX = currX + dx;
            const nextY = currY + dy;
            const nextKey = `${nextX},${nextY}`;

            // Check if the neighbor is valid (within bounds) and not visited
            if (nextX >= 0 && nextX < cols && nextY >= 0 && nextY < rows && !visited.has(nextKey)) {
                // 7. Enqueue
                visited.add(nextKey);
                queue.push([nextX, nextY, distance + 1]);
            }
        }
    }

    return { nearestTargets, path: searchPath };
}


const resonantCollinearity = (str) => {
    const lines = str.trim().split('\n').map(line => line.split(''));
    const height = lines.length;
    const width = lines[0].length;

    let count = 0;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (lines[y][x] !== '.' && lines[y][x] !== '#') {
                const { nearestTargets, path } = findSecondFrequency(lines, x, y);
                if (nearestTargets.length === 0) {
                    continue;
                }
                count += findAntinodes(lines, x, y, nearestTargets);
            }
        }
    }

    console.log('Final grid state:');

    // console.log(lines.map(line => line.join('')).join('\n'));
    return count;
}


const testData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

console.log('Test result:', resonantCollinearity(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '8.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Actual result:', resonantCollinearity(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}