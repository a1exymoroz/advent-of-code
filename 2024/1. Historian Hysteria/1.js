const fs = require('fs');
const path = require('path');

const historian_hysteria = (str) => {
    let sum = 0;
    
    // Split the input string into lines
    const lines = str.trim().split('\n');

    const left = [];
    const right = [];
    // Process each line
    for (const line of lines) {
        // Skip lines that start with // (comments)
        if (line.trim().startsWith('//')) continue;
        
        // Split the line by whitespace to get the two numbers
        const [num1, num2] = line.trim().split(/\s+/);
        left.push(+num1);
        right.push(+num2);
    }

    left.sort((a,b) => a - b)
    right.sort((a,b) => a - b)

    const hash = {}

    for (let i = 0; i < left.length; i++) {
        if (!hash[right[i]]) {
            hash[right[i]] = 1;
        } else {
            hash[right[i]]++;
        }
    }

    for (let i = 0; i < left.length; i++) {
        const element = left[i];
        if (hash[element]) {
            sum += element * hash[element];
        }
    }


    console.log(left);
    console.log(right);


    return sum;
}

// Read the input file
const inputPath = path.join(__dirname, 'json', '1.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log(historian_hysteria(data));
    // console.log(historian_hysteria("3   4\n" +
    //     "4   3\n" +
    //     "2   5\n" +
    //     "1   3\n" +
    //     "3   9\n" +
    //     "3   3"));
} catch (err) {
    console.error('Error reading the input file:', err);
}
