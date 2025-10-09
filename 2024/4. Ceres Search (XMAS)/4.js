const fs = require('fs');
const path = require('path');

const directions = [
    [0, 1, 'right'],  // right
    [0, -1, 'left'], // left
    [1, 0, 'down'],  // down
    [-1, 0, 'up'], // up
    [1, 1, 'down-right diagonal'],  // down-right diagonal
    [-1, -1,'up-left diagonal'],// up-left diagonal
    [-1, 1, 'up-right diagonal'], // up-right diagonal
    [1, -1, 'down-left diagonal']  // down-left diagonal
];
const checkAdjacentStrings = (i, j, lines, str) => {
    let found = 0;
    for (const [di, dj, dirName] of directions) {
        let match = true;
        for (let k = 1; k <= str.length; k++) {
            const ni = i + di * k;
            const nj = j + dj * k;
            console.log('i, j, dirName', i, j, dirName, 'ni, nj', ni, nj, k, lines[ni] ? lines[ni][nj] : 'out of bounds');
            if (ni < 0 || ni >= lines.length || nj < 0 || nj >= lines[ni].length || lines[ni][nj] !== str[k - 1]) {
                match = false;
                break;
            }
        }
        console.log('Direction', dirName, 'match', match);
        if (match) found++;
    }
    return found;
};

const ceresSearch = (str) => {
    let sum = 0;

    // Split the input string into lines
    const lines = str.trim().split('\n');

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'X') {
                sum += checkAdjacentStrings(i,j,lines, "MAS");
                console.log('i, j', i, j, 'sum', sum);
            }
        }
    }
    return sum;
}

const directionsXMas = [
    [-1, -1, 1, 1, 'up-left down-right diagonal'],  // up-left down-right diagonal
    [1, 1, -1, -1,'down-right up-left diagonal'],// down-right up-left diagonal
    [-1, 1, 1, -1, 'up-right down-left diagonal'], // up-right down-left diagonal
    [1, -1, -1, 1, 'down-left up-right diagonal']  // down-left up-right diagonal
]

const checkAdjacentStringsXMas = (i, j, lines) => {
    let found = 0;
    for (const [di1, dj1, di2, dj2, dirName] of directionsXMas) {
        let match = true;

        const ni1 = i + di1;
        const nj1 = j + dj1;
        const ni2 = i + di2;
        const nj2 = j + dj2;

        if (ni1 < 0 || ni1 >= lines.length || nj1 < 0 || nj1 >= lines[ni1].length) {
            continue;
        }
        if (ni2 < 0 || ni2 >= lines.length || nj2 < 0 || nj2 >= lines[ni2].length) {
            continue;
        }

        if (lines[ni1][nj1] === 'M' && lines[ni2][nj2] === 'S') {
            found++;
            console.log('Direction', dirName, 'match', match);
        }
    }
    return found === 2; // Need to find both directions to form "XMAS"
}


const ceresXMasSearch = (str) => {
    let sum = 0;

    // Split the input string into lines
    const lines = str.trim().split('\n');

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'A' && checkAdjacentStringsXMas(i,j,lines)) {
                sum ++;
            }
        }
    }
    return sum;
}




const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

// console.log('Test data result:', ceresSearch(testData));
console.log('Test data XMAS result:', ceresXMasSearch(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '4.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Actual result:', ceresSearch(data));
    console.log('Actual result:', ceresXMasSearch(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}