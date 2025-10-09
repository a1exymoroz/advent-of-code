const fs = require('fs');
const path = require('path');

const checkCorrectOrder = (order, hash) => {
    for (let i = 0; i < order.length; i++) {
        const current = hash[order[i]];
        for (let j = 0; j < i; j++) {
            if (current?.includes(order[j])) {
                // console.log('Incorrect order', order, 'because', order[i], 'should be after', order[j]);
                return false;
            }
        }
        
    }
    return true
}

const printQueue = (str) => {
    const [pageOrder, update] = str.trim().split(/\n\s*\n/);

    const hash = {};

    for (const part of pageOrder.split('\n')) {
        const [a, b] = part.split('|').map(value => parseInt(value));
        if (!hash[a]) {
            hash[a] = [b];
        } else {
            hash[a].push(b);
        }
    }
    
    const correctOrder = [];
    for (const line of update.split('\n')) {
        const parts = line.split(',').map(value => parseInt(value));
        if (checkCorrectOrder(parts, hash)) {
            correctOrder.push(parts);
        }
    }
    let sum = 0;
    for (const order of correctOrder) {
        sum += order[Math.floor(order.length / 2)];
    }
    return sum;
}

const checkInCorrectOrder = (order, hash) => {
    let changed = false;
    for (let i = 0; i < order.length; i++) {
        const current = hash[order[i]];
        for (let j = 0; j < i; j++) {
            if (current?.includes(order[j])) {
                [order[i], order[j]] = [order[j], order[i]];
                changed = true;
            }
        }
    }
    return changed;
}

const checkIncorrectOrder = (update, hash) => {
    const incorrectOrder = [];
    for (const line of update.split('\n')) {
        const parts = line.split(',').map(value => parseInt(value));
        // console.log('Checking order', parts);
        if (checkInCorrectOrder(parts, hash)) {
            // console.log('Fixed order', parts);
            incorrectOrder.push(parts);
        }
    }

    return incorrectOrder
}

const printIncorrectQueue = (str) => {
    const [pageOrder, update] = str.trim().split(/\n\s*\n/);

    const hash = {};

    for (const part of pageOrder.split('\n')) {
        const [a, b] = part.split('|').map(value => parseInt(value));
        if (!hash[a]) {
            hash[a] = [b];
        } else {
            hash[a].push(b);
        }
    }
    


    // console.log('correctOrder', correctOrder);
    let sum = 0;
    for (const order of checkIncorrectOrder(update, hash)) {
        sum += order[Math.floor(order.length / 2)];
    }
    return sum;
}


const testData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

// console.log('Result:', printQueue(testData));
// console.log('Result Incorrect:', printIncorrectQueue(testData));


// Read the actual input file
const inputPath = path.join(__dirname, '5.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    // console.log('Part 1:', printQueue(data));
    console.log('Part 2:', printIncorrectQueue(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}