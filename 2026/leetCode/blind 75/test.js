// all possible subsequences
// abc - > a, b, c, ab, ac, bc, abc


const allSubsequences = (str) => {
    const subsequences = str.split('');
    const findAllSubsequences = (array) => {
        if (array.length === 0) {
            return [];
        }
        const result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(array[i]);
            const smallerArray = findAllSubsequences(array.slice(i + 1));
            for (let j = 0; j < smallerArray.length; j++) {
                result.push(array[i] + smallerArray[j]);
            }
        }
        return result;
    }

    return findAllSubsequences(subsequences);
}

console.log(allSubsequences('abc'));