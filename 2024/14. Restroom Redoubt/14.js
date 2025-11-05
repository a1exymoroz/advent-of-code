const fs = require('fs');
const path = require('path');


const drawGrid = (lines, grid, steps = 100) => {
    for (const line of lines) {
        const { p, v } = line;
        let [x, y] = p;
        const [vx, vy] = v;
        for (let i = 0; i < steps; i++) {
            let newX = x + vx;
            let newY = y + vy;

            if (newX < 0) {
                newX = grid[0].length + newX;
            }
            if (newX >= grid[0].length) {
                newX = newX - grid[0].length;
            }
            if (newY < 0) {
                newY = grid.length + newY;
            }
            if (newY >= grid.length) {
                newY = newY - grid.length;
            }
            x = newX;
            y = newY;
        }
        grid[y][x] = grid[y][x] === '.' ? 1 : grid[y][x] + 1;

    }
    return grid;
}

const drawEasterEgg = (lines, grid) => {
    for (let i = 0; i < 100; i++) {
        const copyGrid = grid.map(line => line.slice());
        drawGrid(lines, copyGrid, i);
        console.log('i', i, 

        );
        console.log(copyGrid.map(line => line.join('')).join('\n'));
    }
    return grid;
}

const sumGrid = (grid) => {

    // console.log('grid', grid.map(line => line.join('')).join('\n'));
    const midx = Math.floor(grid[0].length / 2);
    const midy = Math.floor(grid.length / 2);
    const upLeft = grid.slice(0, midy).map(line => line.slice(0, midx));
    const upRight = grid.slice(0, midy).map(line => line.slice(midx + 1));
    const downLeft = grid.slice(midy + 1).map(line => line.slice(0, midx));
    const downRight = grid.slice(midy + 1).map(line => line.slice(midx + 1));
    
    const upLeftSum = upLeft.reduce((acc, line) => acc + line.reduce((acc, v) => acc + (v === '.' ? 0 : v), 0), 0);
    const upRightSum = upRight.reduce((acc, line) => acc + line.reduce((acc, v) => acc + (v === '.' ? 0 : v), 0), 0);
    const downLeftSum = downLeft.reduce((acc, line) => acc + line.reduce((acc, v) => acc + (v === '.' ? 0 : v), 0), 0);
    const downRightSum = downRight.reduce((acc, line) => acc + line.reduce((acc, v) => acc + (v === '.' ? 0 : v), 0), 0);
    console.log('upLeftSum', upLeftSum);
    console.log('upRightSum', upRightSum);
    console.log('downLeftSum', downLeftSum);
    console.log('downRightSum', downRightSum);
    return upLeftSum * upRightSum * downLeftSum * downRightSum;
}


const restroomRedoubt = (input) => {
    const lines = input.trim().split('\n').map(v => {
        const match = [...v.matchAll(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/g)];
        return {
            p: [Number(match[0][1]), Number(match[0][2])],
            v: [Number(match[0][3]), Number(match[0][4])]
        };
    });
    let widht = 0;
    let height = 0;
    for (const line of lines) {
        const { p } = line;
        widht = Math.max(widht, Math.abs(p[0]));
        height = Math.max(height, Math.abs(p[1]));
    }


    const grid = Array.from({ length: height + 1 }, () => Array.from({ length: widht + 1 }, () => '.'));

    drawEasterEgg(lines, grid);

    return sumGrid(grid);
}

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

const testData2 = `p=2,4 v=2,-3`

console.log('Part 1:', restroomRedoubt(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '14.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    // console.log('Part 1: 225810288', restroomRedoubt(data));
    // console.log('Part 2:', clawContraption(data, true));
} catch (err) {
    console.error('Error reading the input file:', err);
}
