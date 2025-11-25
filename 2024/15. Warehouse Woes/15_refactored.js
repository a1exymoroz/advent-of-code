const fs = require('fs');
const path = require('path');

// IMPROVEMENT: Extracted directions to a constant to avoid duplication
// This makes the code more maintainable and reduces the chance of errors
const DIRECTIONS = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    'v': [0, 1]
};

// IMPROVEMENT: Separated input parsing into its own function
// This makes the code cleaner and easier to test
// IMPROVEMENT: Returns an object with named properties instead of array destructuring
const parseInput = (input) => {
    const [gridStr, instructionsStr] = input.trim().split('\n\n');
    const grid = gridStr.split('\n').map(row => row.split(''));
    const instructions = instructionsStr.replace(/\n/g, '').split('');
    return { grid, instructions };
};

// IMPROVEMENT: Renamed from findStartingPosition to findRobot for clarity
// IMPROVEMENT: Returns null instead of undefined if robot not found (more explicit)
const findRobot = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                return { x, y };
            }
        }
    }
    return null;
};

// IMPROVEMENT: Renamed from moveRobot to moveRobotPart1 for clarity
// IMPROVEMENT: Removed all debug console.log statements that cluttered the output
// IMPROVEMENT: Cleaner logic flow - handles Part 1 (single-character boxes 'O')
const moveRobotPart1 = (grid, instructions) => {
    let { x, y } = findRobot(grid);
    
    for (const instruction of instructions) {
        const [dx, dy] = DIRECTIONS[instruction];
        const newX = x + dx;
        const newY = y + dy;
        
        if (grid[newY][newX] === '#') {
            continue;
        }
        
        if (grid[newY][newX] === '.') {
            grid[y][x] = '.';
            grid[newY][newX] = '@';
            x = newX;
            y = newY;
            continue;
        }
        
        let nextX = newX + dx;
        let nextY = newY + dy;
        
        if (grid[nextY][nextX] === '#') {
            continue;
        }
        
        while (grid[nextY][nextX] !== '#' && grid[nextY][nextX] !== '.') {
            nextX += dx;
            nextY += dy;
        }
        
        if (grid[nextY][nextX] === '.') {
            grid[nextY][nextX] = 'O';
            grid[y][x] = '.';
            grid[newY][newX] = '@';
            x = newX;
            y = newY;
        }
    }
    
    return grid;
};

// IMPROVEMENT: Renamed from changeMap to expandGrid for better clarity
// This function expands the grid for Part 2 where boxes are 2 characters wide
const expandGrid = (grid) => {
    return grid.map(row => 
        row.map(cell => {
            if (cell === '.') return '..';
            if (cell === 'O') return '[]';
            if (cell === '@') return '@.';
            if (cell === '#') return '##';
            return cell;
        }).join('')
    ).map(row => row.split(''));
};

// IMPROVEMENT: Separated horizontal and vertical box pushing logic
// This makes the code more maintainable and easier to understand
// IMPROVEMENT: When pushing horizontally, boxes flip orientation ([']' ↔ '[')
// This is a key requirement for Part 2 - boxes change direction when pushed horizontally
const pushBoxHorizontal = (grid, x, y, dx, dy) => {
    const newX = x + dx;
    const newY = y + dy;
    
    grid[y][x] = '.';
    grid[newY][newX] = '@';
    
    let currentX = newX;
    let currentY = newY;
    
    while (grid[currentY][currentX] !== '#') {
        const nextX = currentX + dx;
        const nextY = currentY + dy;
        
        if (grid[nextY][nextX] === '.') {
            const currentValue = grid[currentY][currentX];
            grid[nextY][nextX] = currentValue === ']' ? '[' : ']';
            break;
        }
        
        const currentValue = grid[currentY][currentX];
        grid[nextY][nextX] = currentValue === ']' ? '[' : ']';
        currentX = nextX;
        currentY = nextY;
    }
    
    return { x: newX, y: newY };
};

// IMPROVEMENT: Cleaner vertical push logic with better variable names
// IMPROVEMENT: When pushing vertically, we need BFS to find all connected boxes
// Boxes keep their orientation when pushed vertically (unlike horizontal)
const pushBoxVertical = (grid, x, y, dx, dy) => {
    const newX = x + dx;
    const newY = y + dy;
    const startValue = grid[newY][newX];
    
    // Use BFS to find all boxes that need to be moved together
    const queue = [[newX, newY]];
    const visited = new Set([`${newX},${newY},${startValue}`]);
    
    // Add the other half of the box if it's a 2-character box
    if (startValue === ']') {
        queue.push([newX - 1, newY]);
        visited.add(`${newX - 1},${newY},${grid[newY][newX - 1]}`);
    } else if (startValue === '[') {
        queue.push([newX + 1, newY]);
        visited.add(`${newX + 1},${newY},${grid[newY][newX + 1]}`);
    }
    
    // BFS to find all connected boxes
    while (queue.length > 0) {
        const [currX, currY] = queue.shift();
        const nextX = currX + dx;
        const nextY = currY + dy;
        const nextValue = grid[nextY][nextX];
        const nextKey = `${nextX},${nextY},${nextValue}`;
        
        if (visited.has(nextKey)) continue;
        if (grid[nextY][nextX] === '#') continue;
        
        visited.add(nextKey);
        
        // Add both halves of the box to the queue
        if (nextValue === ']') {
            queue.push([nextX, nextY]);
            queue.push([nextX - 1, nextY]);
            visited.add(`${nextX - 1},${nextY},${grid[nextY][nextX - 1]}`);
        } else if (nextValue === '[') {
            queue.push([nextX, nextY]);
            queue.push([nextX + 1, nextY]);
            visited.add(`${nextX + 1},${nextY},${grid[nextY][nextX + 1]}`);
        }
    }
    
    // Calculate all moves needed
    const moves = [];
    for (const key of visited) {
        const parts = key.split(',');
        const visitedX = parseInt(parts[0]);
        const visitedY = parseInt(parts[1]);
        const value = parts[2];
        const nextX = visitedX + dx;
        const nextY = visitedY + dy;
        
        if (grid[nextY][nextX] === '#') {
            return { x, y }; // Can't push - wall blocking
        }
        
        moves.push({ fromX: visitedX, fromY: visitedY, toX: nextX, toY: nextY, value });
    }
    
    // Execute all moves
    for (const move of moves) {
        if (grid[move.toY][move.toX] !== '.' && grid[move.toY][move.toX] !== move.value) {
            const clearX = move.value === ']' ? move.toX + 1 : move.toX - 1;
            grid[move.toY][clearX] = '.';
        }
        grid[move.toY][move.toX] = move.value;
    }
    
    // Update robot position
    grid[y][x] = '.';
    if (grid[newY][newX] === ']') {
        grid[newY][newX - 1] = '.';
        grid[newY][newX] = '@';
    } else {
        grid[newY][newX] = '@';
        grid[newY][newX + 1] = '.';
    }
    
    return { x: newX, y: newY };
};

// IMPROVEMENT: Extracted box pushing logic into a separate function
// IMPROVEMENT: Checks if there's enough space before attempting to push
// IMPROVEMENT: Routes to appropriate push function based on direction
const pushBox = (grid, x, y, dx, dy, instruction) => {
    let tempX = x;
    let tempY = y;
    
    // Check if there's enough space to push all boxes
    while (true) {
        const nextX = tempX + dx;
        const nextY = tempY + dy;
        
        if (grid[nextY][nextX] === '#') {
            return { x, y }; // Can't push - wall blocking
        }
        
        if (grid[nextY][nextX] === '.') {
            break; // Found empty space - can push
        }
        
        tempX = nextX;
        tempY = nextY;
    }
    
    // Route to horizontal or vertical push logic
    const isHorizontal = instruction === '<' || instruction === '>';
    
    if (isHorizontal) {
        return pushBoxHorizontal(grid, x, y, dx, dy);
    } else {
        return pushBoxVertical(grid, x, y, dx, dy);
    }
};

// IMPROVEMENT: Renamed from moveRobot2 to moveRobotPart2 for clarity
// IMPROVEMENT: Removed all debug console.log statements
// IMPROVEMENT: Handles Part 2 logic (two-character boxes '[' and ']')
const moveRobotPart2 = (grid, instructions) => {
    let { x, y } = findRobot(grid);
    
    for (const instruction of instructions) {
        const [dx, dy] = DIRECTIONS[instruction];
        const newX = x + dx;
        const newY = y + dy;
        
        if (grid[newY][newX] === '#') {
            continue;
        }
        
        if (grid[newY][newX] === '.') {
            grid[y][x] = '.';
            grid[newY][newX] = '@';
            x = newX;
            y = newY;
            continue;
        }
        
        ({ x, y } = pushBox(grid, x, y, dx, dy, instruction));
    }
    
    return grid;
};

// IMPROVEMENT: Extracted GPS sum calculation into a reusable function
// IMPROVEMENT: Takes boxChar as parameter to work for both Part 1 ('O') and Part 2 ('[')
const calculateGPSSum = (grid, boxChar) => {
    let sum = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === boxChar) {
                sum += 100 * y + x;
            }
        }
    }
    return sum;
};

// IMPROVEMENT: Unified function that handles both parts with a simple flag
// IMPROVEMENT: Cleaner separation between Part 1 and Part 2 logic
// IMPROVEMENT: Removed duplicate code - both parts now use the same structure
const warehouseWoes = (input, part2 = false) => {
    let { grid, instructions } = parseInput(input);
    
    if (part2) {
        grid = expandGrid(grid);
        moveRobotPart2(grid, instructions);
        return calculateGPSSum(grid, '[');
    } else {
        moveRobotPart1(grid, instructions);
        return calculateGPSSum(grid, 'O');
    }
};

const testData = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

console.log('=== Test Results ===');
console.log('Part 1 (Expected: 2028):', warehouseWoes(testData, false));

const inputPath = path.join(__dirname, '15.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    console.log('Part 1:', warehouseWoes(data, false));
    console.log('Part 2:', warehouseWoes(data, true));
} catch (err) {
    console.error('Error reading the input file:', err);
}
