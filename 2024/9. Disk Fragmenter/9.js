const fs = require('fs');
const path = require('path');

const createMapDisk = (str) => {
    let id = 0;
    const blocks = [];
    for (let i = 0; i < str.length; i++) {
        const amount = str[i];
        const block = new Array(Number(amount)).fill('.');

        if (i % 2 === 0) {
            blocks.push(...block.map(() => id));
            id++;
        } else {
            blocks.push(...block);
        }
    }
    // console.log(blocks);
    return blocks;
}

const moveFileBlocks = (array) => {
    const disk = [...array];
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] === '.') {
            for (let j = disk.length - 1; j > i; j--) {
                if (disk[j] !== '.') {
                    [disk[i], disk[j]] = [disk[j], disk[i]];
                    break;
                }
            }
        }
    }
    return disk;
}

const diskFragmenter = (input) => {
    // Implement the disk fragmenter logic here

    let disk = createMapDisk(input.trim());
    disk = moveFileBlocks(disk).filter(x => x !== '.');

    let sum = 0;

    for (let i = 0; i < disk.length; i++) {
        sum += disk[i] * i;
    }

    // console.log(disk);


    return sum;
};

const moveWholeFileBlocks = (array) => {
    const disk = [...array];

    // const hash = {};
    let fileId = null;
    let spanOfFreeSpaceNeeded = 0;

    for(let i = disk.length - 1; i >= 0; i--) {

        const value = disk[i];

        if (fileId === null && value !== '.') {
            fileId = value;
        } else if (value === fileId) {
            spanOfFreeSpaceNeeded++;
        } else if (value !== fileId && fileId !== null) {
            spanOfFreeSpaceNeeded++;
            let spanOfFreeSpace = 0;

            for (let k = 0; k < i; k++) {

                if (spanOfFreeSpace === spanOfFreeSpaceNeeded) {

                    for (let m = k - spanOfFreeSpaceNeeded; m < k; m++) {
                        disk[m] = fileId;
                    }

                    for (let n = i + 1; n < i + 1 + spanOfFreeSpaceNeeded; n++) {
                        disk[n] = '.';
                    }

                    break;
                }

                if (disk[k] === '.') {
                    spanOfFreeSpace++;
                } else {
                    spanOfFreeSpace = 0
                }
            }

            fileId = value === '.' ? null : value;
            spanOfFreeSpaceNeeded = 0;

        }

    }


    return disk;
}


const diskFragmenter2 = (input) => {
    // Implement the disk fragmenter logic here

    let disk = createMapDisk(input.trim());
    disk = moveWholeFileBlocks(disk);

    let sum = 0;

    for (let i = 0; i < disk.length; i++) {
        if (disk[i] !== '.') {
            sum += disk[i] * i;
        }
    }

    console.log(disk.join(''));


    return sum;
};

const testData = `2333133121414131402`; // Add test data here

// console.log('Test result:', diskFragmenter(testData));
console.log('Test result:', diskFragmenter2(testData));


// Read the actual input file
const inputPath = path.join(__dirname, '9.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Actual result part 1:', diskFragmenter(data));
    // console.log('Actual result part 2:', diskFragmenter2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

// console.log('TEST','00992111777.44.333....5555.6666.....8888..'.split('').reduce((acc, curr, index) => {

//     if (curr !== '.') {
//         acc += Number(curr) * index;
//     }
        
//     return acc;
// }, 0));