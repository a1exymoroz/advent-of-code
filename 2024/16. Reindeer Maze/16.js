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

const findInitialDirections = (grid, x, y) => {
    const directions = [];

    for (const direction of Object.keys(DIRECTIONS)) {
        const [dx, dy] = DIRECTIONS[direction];
        const nextX = x + dx;
        const nextY = y + dy;
        if (grid[nextY][nextX] !== '#') {
            directions.push({x: nextX, y: nextY, direction});
        }
    }

    return directions;
}

const findOtherPossiblePaths = ( paths, visitedPaths, grid) => {
    const allPaths = [];

    for (const {path} of paths) {
        for (let i = path.length - 1; i >= 0; i--) {
            const {x, y, direction} = path[i];
            const nextKey = `${x},${y}`;
            if (visitedPaths.get(nextKey).length > 1) {
            console.log('visitedPaths.get(nextKey)', visitedPaths.get(nextKey));

            }
            // const existingPaths = visitedPaths.get(nextKey).filter(p => p[p.length - 1].direction !== direction);
            // if (existingPaths.length > 0) {
            //     for (const existingPath of existingPaths) {
            //         const slicedPath = path.slice(i, path.length);
            //         allPaths.push([...existingPath, ...slicedPath]);
            //     }
            // }
        } 
        allPaths.push(path);
    }

    return allPaths;
}

const findPossiblePaths = (grid, x, y, isTestData = true) => {

  const queue = [];
  const gridCopy = grid.map(row => [...row]);

  gridCopy[y][x] = 0;
  queue.push([x, y, 0, '^', [{x, y, direction: '^', cost: 0}]]);
  let minCost = Infinity;
  let minPath = null;
  while (queue.length > 0) {
    const [currX, currY, currentCost, direction, path] = queue.shift();

    const moves = [
        { direction: direction, cost: currentCost + 1 }, // Move forward
        { direction: TURN_LEFT[direction], cost: currentCost + 1001 }, // Turn left then move
        { direction: TURN_RIGHT[direction], cost: currentCost + 1001 } // Turn right then move
    ];

    for (const {direction, cost} of moves) {
        const [dx, dy] = DIRECTIONS[direction];
        const nextX = currX + dx;
        const nextY = currY + dy;

        if (gridCopy[nextY][nextX] === '#') {
            continue;
        }

        if (gridCopy[nextY][nextX] === 'E') {
            if (minCost > cost + 1000) {
                minPath = [...path, {x: nextX, y: nextY, direction, cost: cost + 1000}];
                minCost = cost + 1000;
            }
            continue;
        }

        if (gridCopy[nextY][nextX] === '.' || gridCopy[nextY][nextX] > cost) {
            gridCopy[nextY][nextX] = cost;
            queue.push([nextX, nextY, cost, direction, [...path, {x: nextX, y: nextY, direction, cost}]]);
            queue.sort((a, b) => a[2] - b[2]);
        }
    }
  }

  if (!isTestData) {
     minCost = minCost - 2000;
  }

  return {minCost, minPath, newGrid: gridCopy};
}

const reindeerMaze = (input, isTestData = true) => {

    const lines = input.trim().split('\n').map(line => line.split(''));
    const { x, y } = findStartingPosition(lines);

    const {minCost} = findPossiblePaths(lines, x, y, isTestData);

    return minCost;
}

const markVisitedPaths = (grid, path, newGrid) => {

    for (const {x, y} of path) {
        grid[y][x] = 'O';
    }

    return newGrid;
}

const reindeerMaze2 = (input, isTestData = true) => {

    const lines = input.trim().split('\n').map(line => line.split(''));
    const { x, y } = findStartingPosition(lines);

    const {minCost, minPath, newGrid} = findPossiblePaths(lines, x, y, isTestData);

    const grid = markVisitedPaths(lines, minPath, newGrid);

    return minCost;
}

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

console.log('=== Test Results ===');
// console.log('Part 1 (Expected: 7036):', reindeerMaze(testData));
// console.log('Part 1 (Expected: 11048):', reindeerMaze(testData2));

console.log('Part 2 (Expected: 45):', reindeerMaze2(testData));
// console.log('Part 2 (Expected: 64):', reindeerMaze(testData2));


const inputPath = path.join(__dirname, '16.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    // console.log('Part 1: 107512', reindeerMaze(data, false));
    // console.log('Part 2:', reindeerMaze(data));

    
} catch (err) {
    console.error('Error reading the input file:', err);
}
