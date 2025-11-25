const fs = require('fs');
const path = require('path');

const DIRECTIONS = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    'v': [0, 1]
};

const TURN_LEFT = {
    '^': '<',
    '<': 'v',
    'v': '>',
    '>': '^'
};

const TURN_RIGHT = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^'
};

// IMPROVEMENT: Clearer function name and explicit null return
const findStartingPosition = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') {
                return { x, y };
            }
        }
    }
    return null;
};

// IMPROVEMENT: Added bounds checking to prevent out-of-bounds errors
// IMPROVEMENT: Returns valid initial directions from the starting position
const findInitialDirections = (grid, x, y) => {
    const directions = [];

    for (const direction of Object.keys(DIRECTIONS)) {
        const [dx, dy] = DIRECTIONS[direction];
        const nextX = x + dx;
        const nextY = y + dy;
        if (grid[nextY] && grid[nextY][nextX] && grid[nextY][nextX] !== '#') {
            directions.push({ x: nextX, y: nextY, direction });
        }
    }

    return directions;
};

// FIXED: The reindeer can ONLY move forward in its current direction
// It can: 1) Move forward (cost 1), 2) Turn left then move (cost 1001), 3) Turn right then move (cost 1001)
// This matches the reference implementation
const findMinimumCost = (grid, startX, startY) => {
    const queue = [];
    const costs = new Map();
    const visited = new Set();
    
    // Initialize: start at S with cost 0, facing any direction
    // Then we can move forward (cost 1) or turn then move (cost 1001)
    // But we need to actually move from S, so let's start the queue with positions moved from S
    // Python approach: start at S with score 0, then move
    for (const direction of Object.keys(DIRECTIONS)) {
        const [dx, dy] = DIRECTIONS[direction];
        const nextX = startX + dx;
        const nextY = startY + dy;
        
        if (grid[nextY] && grid[nextY][nextX] && grid[nextY][nextX] !== '#') {
            const stateKey = `${nextX},${nextY},${direction}`;
            const cost = 1; // Move forward from S costs 1
            costs.set(stateKey, cost);
            queue.push({ x: nextX, y: nextY, direction, cost });
        }
    }
    
    // Sort queue by cost (simple priority queue)
    queue.sort((a, b) => a.cost - b.cost);
    
    let minCostToEnd = Infinity;
    
    while (queue.length > 0) {
        const { x: currX, y: currY, direction: currDir, cost: currCost } = queue.shift();
        const stateKey = `${currX},${currY},${currDir}`;
        
        if (visited.has(stateKey)) {
            continue;
        }
        
        visited.add(stateKey);
        
        // From current state, the reindeer can:
        // 1. Move forward in current direction (cost 1)
        // 2. Turn left, then move forward (cost 1000 + 1 = 1001)
        // 3. Turn right, then move forward (cost 1000 + 1 = 1001)
        
        const moves = [
            { direction: currDir, cost: 1 }, // Move forward
            { direction: TURN_LEFT[currDir], cost: 1001 }, // Turn left then move
            { direction: TURN_RIGHT[currDir], cost: 1001 } // Turn right then move
        ];
        
        for (const move of moves) {
            if (!move.direction || !DIRECTIONS[move.direction]) {
                continue; // Skip invalid directions
            }
            const [dx, dy] = DIRECTIONS[move.direction];
            const nextX = currX + dx;
            const nextY = currY + dy;
            
            if (!grid[nextY] || !grid[nextY][nextX]) {
                continue;
            }
            
            if (grid[nextY][nextX] === '#') {
                continue;
            }
            
            if (grid[nextY][nextX] === 'E') {
                // Reached E: add the move cost
                const finalCost = currCost + move.cost;
                minCostToEnd = Math.min(minCostToEnd, finalCost);
                continue;
            }
            
            const nextStateKey = `${nextX},${nextY},${move.direction}`;
            
            if (visited.has(nextStateKey)) {
                continue;
            }
            
            const newCost = currCost + move.cost;
            
            const existingCost = costs.get(nextStateKey);
            if (existingCost === undefined || newCost < existingCost) {
                costs.set(nextStateKey, newCost);
                queue.push({ x: nextX, y: nextY, direction: move.direction, cost: newCost });
                queue.sort((a, b) => a.cost - b.cost);
            }
        }
    }
    
    return minCostToEnd;
};

// FIXED: Match original cost calculation logic exactly
// The original starts with path[0].direction and checks each step
const calculatePathCost = (path) => {
    if (path.length === 0) return Infinity;
    
    let cost = 0;
    let tempDirection = path[0].direction;

    for (const { direction } of path) {
        if (direction !== tempDirection) {
            cost += 1000;
        }
        cost += 1;
        tempDirection = direction;
    }

    return cost;
};

// FIXED: Use Dijkstra's algorithm to find minimum cost path efficiently
const reindeerMaze = (input) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const start = findStartingPosition(grid);

    if (!start) {
        return Infinity;
    }

    return findMinimumCost(grid, start.x, start.y);
};

const testData = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const testData2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

const testData3 = `###########################
#######################..E#
######################..#.#
#####################..##.#
####################..###.#
###################..##...#
##################..###.###
#################..####...#
################..#######.#
###############..##.......#
##############..###.#######
#############..####.......#
############..###########.#
###########..##...........#
##########..###.###########
#########..####...........#
########..###############.#
#######..##...............#
######..###.###############
#####..####...............#
####..###################.#
###..##...................#
##..###.###################
#..####...................#
#.#######################.#
#S........................#
###########################`

console.log('=== Test Results ===');
console.log('Part 1 (Expected: 7036):', reindeerMaze(testData));
console.log('Part 2 (Expected: 11048):', reindeerMaze(testData2));
console.log('Part 2 (Expected: 21148):', reindeerMaze(testData3));


const inputPath = path.join(__dirname, '16.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    console.log('Part 1:', reindeerMaze(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

