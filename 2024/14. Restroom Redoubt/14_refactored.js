const fs = require('fs');
const path = require('path');

const parseInput = (input) => {
    return input.trim().split('\n').map(line => {
        const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
        return {
            px: parseInt(match[1]),
            py: parseInt(match[2]),
            vx: parseInt(match[3]),
            vy: parseInt(match[4])
        };
    });
};

const simulateRobot = (robot, width, height, steps) => {
    let x = robot.px;
    let y = robot.py;
    
    x = (x + robot.vx * steps) % width;
    y = (y + robot.vy * steps) % height;
    
    if (x < 0) x += width;
    if (y < 0) y += height;
    
    return { x, y };
};

const countRobotsByQuadrant = (positions, width, height) => {
    const midX = Math.floor(width / 2);
    const midY = Math.floor(height / 2);
    
    const quadrants = [0, 0, 0, 0];
    
    for (const pos of positions) {
        if (pos.x === midX || pos.y === midY) {
            continue;
        }
        
        const quadrant = (pos.y < midY ? 0 : 2) + (pos.x < midX ? 0 : 1);
        quadrants[quadrant]++;
    }
    
    return quadrants;
};

const calculateSafetyFactor = (quadrants) => {
    return quadrants.reduce((acc, count) => acc * count, 1);
};

const visualizeGrid = (positions, width, height) => {
    const grid = Array.from({ length: height }, () => 
        Array.from({ length: width }, () => '.')
    );
    
    for (const pos of positions) {
        const current = grid[pos.y][pos.x];
        grid[pos.y][pos.x] = current === '.' ? '1' : String(parseInt(current) + 1);
    }
    
    return grid.map(row => row.join('')).join('\n');
};

const findEasterEgg = (robots, width, height, maxSteps = 10000) => {
    for (let step = 0; step < maxSteps; step++) {
        const positions = robots.map(robot => simulateRobot(robot, width, height, step));
        const uniquePositions = new Set(positions.map(p => `${p.x},${p.y}`));
        
        if (uniquePositions.size === positions.length) {
            console.log(`\n=== Step ${step} - All robots in unique positions ===`);
            console.log(visualizeGrid(positions, width, height));
            return step;
        }
    }
    return -1;
};

const restroomRedoubt = (input, width, height, steps = 100) => {
    const robots = parseInput(input);
    const positions = robots.map(robot => simulateRobot(robot, width, height, steps));
    const quadrants = countRobotsByQuadrant(positions, width, height);
    
    return calculateSafetyFactor(quadrants);
};

const testData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

console.log('=== Test Results ===');
console.log('Part 1 (Expected: 12):', restroomRedoubt(testData, 11, 7, 100));

const inputPath = path.join(__dirname, '14.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    console.log('Part 1:', restroomRedoubt(data, 101, 103, 100));
    
    console.log('\n=== Part 2 - Finding Easter Egg ===');
    const robots = parseInput(data);
    const easterEggStep = findEasterEgg(robots, 101, 103, 10000);
    console.log('Part 2 - Easter Egg found at step:', easterEggStep);
} catch (err) {
    console.error('Error reading the input file:', err);
}

