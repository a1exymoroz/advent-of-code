const fs = require('fs');
const path = require('path');

const testData = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;



const playground = (input) => {
    const lines = input.split('\n');
    const grid = lines.map(line => line.split(',').map(Number));
    const map = {};

    for (let i = 0; i < grid.length - 1; i++) {
        const current = grid[i];
        const key = `${current[0]},${current[1]},${current[2]}`;
        for (let j = i + 1; j < grid.length; j++) {
            const next = grid[j];
            const nextKey = `${next[0]},${next[1]},${next[2]}`;
            const distance = Math.sqrt(Math.pow(current[0] - next[0], 2) + Math.pow(current[1] - next[1], 2) + Math.pow(current[2] - next[2], 2));

            if (!map[key]) {
                map[key] = [distance, nextKey];
            } else {
                map[key] = distance < map[key][0] ? [distance, nextKey] : map[key];
            }
        }
    }
    console.log(map);
    return map;
}


console.log('Part 1: 21', playground(testData));
// console.log('Part 2 (test): 3263827', laboratoriesPart2(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {   
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 4277556', playground(data));
    // console.log('Part 2 (real):', playground(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}
