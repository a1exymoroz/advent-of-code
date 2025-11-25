const fs = require('fs');
const path = require('path');

const findStartingPosition = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                return { x, y };
            }
        }
    }
}

const moveRobot = (grid, instructions) => {

    const directions = {
        '>': [1, 0],
        '<': [-1, 0],
        '^': [0, -1],
        'v': [0, 1]
    }

    let { x, y } = findStartingPosition(grid);
    for (const instruction of instructions) {
        const [dx, dy] = directions[instruction];
        const newX = x + dx;
        const newY = y + dy;

        console.log(instruction);
        console.log('Before:');
        console.log(grid.map(row => row.join('')).join('\n'));
        console.log('--------------------------------');

        if (grid[newY][newX] === '#') {
            continue;
        }

        if (grid[newY][newX] === '.') {
            grid[y][x] = '.';
            grid[newY][newX] = '@';
            x = newX;
            y = newY;
            console.log('After:');
            console.log(grid.map(row => row.join('')).join('\n'));
            console.log('--------------------------------');
            continue;
        }

        let nextX = newX + dx;
        let nextY = newY + dy;

        if (grid[nextY][nextX] === '#') {
            continue;
        }

        while (grid[nextY][nextX] !== '#') {
            if(grid[nextY][nextX] === '.') {
                grid[nextY][nextX] = 'O';
                grid[y][x] = '.';
                grid[newY][newX] = '@';
                x = newX;
                y = newY;
                break;
            }
            nextX += dx;
            nextY += dy;
        }
        console.log('After:');
        console.log(grid.map(row => row.join('')).join('\n'));
        console.log('--------------------------------');

    }
    return grid;
}

const warehouseWoes = (input) => {
    let [grid, instructions] = input.trim().split('\n\n').map(line => line.split('\n').map(row => row.split('')));
    instructions = instructions.flat();

    moveRobot(grid, instructions);
    let sum = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'O') {
                sum += 100 * y + x;
            }
        }
    }
    return sum;
}

const changeMap = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '.') {
                grid[y][x] = '..';
            } else if (grid[y][x] === 'O') {
                grid[y][x] = '[]';
            } else if (grid[y][x] === '@') {
                grid[y][x] = '@.';
            } else if (grid[y][x] === '#') {
                grid[y][x] = '##';
            }
        }
    }

    return grid.map(row => row.join('')).join('\n').split('\n').map(row => row.split(''));
}

const horizontalPush = (grid, x, y, dx, dy) => {
    let newX = x + dx;
    let newY = y + dy;
    grid[y][x] = '.';
    grid[newY][newX] = '@';

    while (grid[newY][newX] !== '#') {
        const nextX = newX + dx;
        const nextY = newY + dy;


        if (grid[nextY][nextX] === '.') {
            grid[nextY][nextX] =  grid[newY][newX] === ']' ? '[' : ']';
            break;
        } 
        grid[nextY][nextX] = grid[nextY][nextX] === ']' ? '[' : ']';
        newX = nextX;
        newY = nextY;
    }
    return { x: x + dx, y: y + dy };
}

const verticalPush = (grid, x, y, dx, dy) => {
    let newX = x + dx;
    let newY = y + dy;


    const queue = [[newX, newY]];

    const value = grid[newY][newX];
    const visited = new Set([`${newX},${newY},${value}`]);

    if (value === ']') {
        queue.push([newX - 1, newY]);
        visited.add(`${newX - 1},${newY},${grid[newY][newX - 1]}`);
    } else {
        queue.push([newX + 1, newY]);
        visited.add(`${newX + 1},${newY},${grid[newY][newX + 1]}`);
    }


    while (queue.length > 0) {
        const [currX, currY] = queue.shift();
        const nextX = currX + dx;
        const nextY = currY + dy;
        const nextValue = grid[nextY][nextX];
        const nextKey = `${nextX},${nextY},${nextValue}`;

        if (visited.has(nextKey)) {
            continue;
        }

        if (nextValue === ']') {
            queue.push([nextX, nextY]);
            visited.add(nextKey);
            queue.push([nextX - 1, nextY]);
            visited.add(`${nextX - 1},${nextY},${grid[nextY][nextX - 1]}`);
        } else if (nextValue === '[') {
            queue.push([nextX, nextY]);
            visited.add(nextKey);
            queue.push([nextX + 1, nextY]);
            visited.add(`${nextX + 1},${nextY},${grid[nextY][nextX + 1]}`);
        }
    }

    const tempVisited = [];

    for (const key of visited) {
        const [visitedX, visitedY, value] = key.split(',');
        const nextX = Number(visitedX) + dx;
        const nextY = Number(visitedY) + dy;

        if (grid[nextY][nextX] === '#') {
            return { x, y };
        }
        tempVisited.push([nextX, nextY, value]);

    }

    for (const [nextX, nextY, value] of tempVisited) {
        if (grid[nextY][nextX] !== '.' && grid[nextY][nextX] !== value) {
            const currentX = value === ']' ? nextX + 1 : nextX - 1;
            grid[nextY][currentX] = '.';
        }

        grid[nextY][nextX] = value;

    }


    grid[y][x] = '.';
    if (grid[newY][newX] === ']') {
        grid[newY][newX - 1] = '.';
    } else {
        grid[newY][newX] = '@';
        grid[newY][newX + 1] = '.';
    }
    return { x: x + dx, y: y + dy };
}

const pushBox = (grid, x, y, dx, dy, instruction) => {

    let isEnoughSpace = false;
    let tempX = x;
    let tempY = y;  
    while (!isEnoughSpace) {
        const nextX = tempX + dx;
        const nextY = tempY + dy;

        if (grid[nextY][nextX] === '#') {
            return { x, y };
        }

        if (grid[nextY][nextX] === '.') {
            isEnoughSpace = true;
        } else {
            tempX = nextX;
            tempY = nextY;
        }
    }

    if (!isEnoughSpace) {
        return { x, y };
    }
    
    const direction = {
        horizontal: ['<', '>'],
        vertical: ['^', 'v']
    }
    if (direction.horizontal.includes(instruction)) {
        return horizontalPush(grid, x, y, dx, dy);
    } else {
        return verticalPush(grid, x, y, dx, dy);
    }

}

const moveRobot2 = (grid, instructions) => {

    const directions = {
        '>': [1, 0],
        '<': [-1, 0],
        '^': [0, -1],
        'v': [0, 1]
    }

    let { x, y } = findStartingPosition(grid);

    for (const instruction of instructions) {
        const [dx, dy] = directions[instruction];
        const newX = x + dx;
        const newY = y + dy;

        console.log(instruction);
        console.log('Before:');
        console.log(grid.map(row => row.join('')).join('\n'));
        console.log('--------------------------------');

        if (grid[newY][newX] === '#') {
            continue;
        }

        if (grid[newY][newX] === '.') {
            grid[y][x] = '.';
            grid[newY][newX] = '@';
            x = newX;
            y = newY;
            console.log('After:');
            console.log(grid.map(row => row.join('')).join('\n'));
            console.log('--------------------------------');
            continue;
        }

        ({ x, y } = pushBox(grid, x, y, dx, dy, instruction));
        console.log('After:');
        console.log(grid.map(row => row.join('')).join('\n'));
        console.log('--------------------------------');

    }
    return grid;
}


const warehouseWoes2 = (input) => {
    let [grid, instructions] = input.trim().split('\n\n').map(line => line.split('\n').map(row => row.split('')));
    instructions = instructions.flat();

    grid = changeMap(grid);

    grid = moveRobot2(grid, instructions);

    let sum = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '[') {
                sum += 100 * y + x;
            }
        }
    }
    return sum;
}



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

const testData2 = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;

const testData3 = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`;
console.log('=== Test Results ===');
// console.log('Part 1 (Expected: 2028):', warehouseWoes(testData));
// console.log('Part 1 (Expected: 2028):', warehouseWoes2(testData));


const inputPath = path.join(__dirname, '15.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    // console.log('Part 1:', warehouseWoes(data));
    console.log('Part 2:', warehouseWoes2(data));

    
} catch (err) {
    console.error('Error reading the input file:', err);
}
