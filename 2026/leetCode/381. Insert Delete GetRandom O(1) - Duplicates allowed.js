// // Insert Delete GetRandom O(1): insert/remove/getRandom must be amortized O(1).
// // Map: value -> index in array. Array: values for uniform random by index.

// var RandomizedSet = function () {
//     this.indexByVal = new Map();
//     this.values = [];
// };

// /** @param {number} val @return {boolean} */
// RandomizedSet.prototype.insert = function (val) {
//     if (this.indexByVal.has(val)) return false;
//     this.indexByVal.set(val, this.values.length);
//     this.values.push(val);
//     return true;
// };

// /** @param {number} val @return {boolean} */
// RandomizedSet.prototype.remove = function (val) {
//     if (!this.indexByVal.has(val)) return false;
//     const i = this.indexByVal.get(val);
//     const last = this.values[this.values.length - 1];
//     this.values[i] = last;
//     this.indexByVal.set(last, i);
//     this.values.pop();
//     this.indexByVal.delete(val);
//     return true;
// };

// /** @return {number} */
// RandomizedSet.prototype.getRandom = function () {
//     const j = Math.floor(Math.random() * this.values.length);
//     return this.values[j];
// };


// Randomized Collection: insert/remove/getRandom amortized O(1).
// Map: value -> Set of indices (Set add/delete O(1)). Array: values for getRandom.

// ["RandomizedCollection","insert","insert","insert","getRandom","remove","getRandom"]
// [[],[1],[1],[2],[],[1],[]]

// insertedByVal = {1: Set{0,1}, 2: Set{2}}
// values = [1, 1, 2]

var RandomizedCollection = function() {
    this.insertedByVal = new Map();
    this.values = [];
};


/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
    this.values.push(val);
    const index = this.values.length - 1;
    let isNotContained = true;
    if (this.insertedByVal.has(val)) {
        this.insertedByVal.get(val).add(index);
        isNotContained = false;
    } else {
        this.insertedByVal.set(val, new Set([index]));
    }

    return isNotContained;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
    if (!this.insertedByVal.has(val)) {
        return false;
    }

    const indicesOfVal = this.insertedByVal.get(val);
    const index = indicesOfVal.values().next().value;
    indicesOfVal.delete(index);

    if (indicesOfVal.size === 0) {
        this.insertedByVal.delete(val);
    }

    const lastIndex = this.values.length - 1;
    const lastVal = this.values[lastIndex];

    if (index !== lastIndex) {
        this.values[index] = lastVal;
        const indicesOfLast = this.insertedByVal.get(lastVal);
        indicesOfLast.delete(lastIndex);
        indicesOfLast.add(index);
    }

    this.values.pop();

    return true;
};

/**
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
    return this.values[Math.floor(Math.random() * this.values.length)]
};

// ["RandomizedCollection","insert","insert","insert","getRandom","remove","getRandom"]
// [[],[1],[1],[2],[],[1],[]]

// Use Testcase
// Output
// [null,true,false,true,1,true,undefined]
// Expected
// [null,true,false,true,1,true,1]

// var randomizedCollection = new RandomizedCollection();
// console.log(randomizedCollection.insert(1));
// console.log(randomizedCollection.insert(1));
// console.log(randomizedCollection.insert(2));
// console.log(randomizedCollection.getRandom());
// console.log(randomizedCollection.remove(1));
// console.log(randomizedCollection.getRandom());

// ["RandomizedCollection","insert","insert","remove","insert","remove","getRandom"]
// [[],[0],[1],[0],[2],[1],[]]

// Use Testcase
// Output
// [null,true,true,true,true,true,1]
// Expected
// [null,true,true,true,true,true,2]

var randomizedCollection = new RandomizedCollection();
console.log(randomizedCollection.insert(0));
console.log(randomizedCollection.insert(1));
console.log(randomizedCollection.remove(0));
console.log(randomizedCollection.insert(2));
console.log(randomizedCollection.remove(1));
console.log(randomizedCollection.getRandom());