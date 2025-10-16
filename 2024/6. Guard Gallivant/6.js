const fs = require('fs');
const path = require('path');

const findStartingPosition = (lines) => {
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (['^', '>', 'v', '<'].includes(lines[i][j])) {
                return [j, i]; // x, y
            }
        }
    }
    return null;
}

const guardGallivant = (str) => {

    // Split the input string into lines
    const lines = str.trim().split('\n').map(line => line.split(''));

    const directions = {
        '^': [0, -1],
        '>': [1, 0],
        'v': [0, 1],
        '<': [-1, 0]
    };

    const turnRight = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };

    let [x, y] = findStartingPosition(lines);
    let direction = lines[y][x];
    lines[y][x] = 'X'; // Mark starting position as visited


    while (true) {

        const nextX = x + directions[direction][0];
        const nextY = y + directions[direction][1];


        // Check for boundaries
        if (nextX < 0 || nextX >= lines[0].length || nextY < 0 || nextY >= lines.length) {
            break;
        }


        // Check for obstacles
        if (lines[nextY][nextX] === '#') {
            direction = turnRight[direction];
        } else {
            x = nextX;
            y = nextY;
            lines[y][x] = 'X';
        }
    }
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'X') {
                sum++;
            }
        }
    }
    console.log('Final position:', lines.map(line => line.join('')).join('\n'));
    return sum;
}

const guardGallivantPart2 = (str) => {

    // Split the input string into lines
    const lines = str.trim().split('\n').map(line => line.split(''));

    const directions = {
        '^': [0, -1],
        '>': [1, 0],
        'v': [0, 1],
        '<': [-1, 0]
    };

    const turnRight = {
        '^': ['>', '|'],
        '>': ['v', '-'],
        'v': ['<', '|'],
        '<': ['^', '-']
    };

    let [x, y] = findStartingPosition(lines);
    let direction = lines[y][x];


    let positions = 0;
    while (true) {

        const nextX = x + directions[direction][0];
        const nextY = y + directions[direction][1]; 

        // Check for boundaries
        if (nextX < 0 || nextX >= lines[0].length || nextY < 0 || nextY >= lines.length) {
            break;
        }

        // Check for obstacles
        if (lines[nextY][nextX] === '#') {
            direction = turnRight[direction][0];
            lines[y][x] = '+'; // Mark as turned
        } else {
            x = nextX;
            y = nextY;
            if (!turnRight[lines[y][x]]) {
                lines[y][x] = ['|', '-'].includes(lines[y][x]) ? '+' : (turnRight[direction][1]); // Mark ever
            }
        }
    }


    console.log('Final position:', lines.map(line => line.join('')).join('\n'));
}

const testData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;


// console.log('Test result:', guardGallivant(testData));
console.log('Test result part 2:', guardGallivantPart2(testData));


// Read the actual input file
const inputPath = path.join(__dirname, '6.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Actual result:', ceresSearch(data));
    // console.log('Actual result:', guardGallivant(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}