// to run this file (the argument is the input file)
// node equation_subseq.js input.txt

const fs = require('fs');

const filename = process.argv[2];

const abc = new Map();
let count = 0;

// read data from the file
// we suppose that the first line is the length of the array
// and the number of the next lines is the same as the first line value
// we suppose that all input values are unique numbers, not duplicates!!
const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
const array = data.split(/\r?\n/).map((x) => parseInt(x));
const N = array.shift();

// build the hash map for a*b+c combinations
// we save values to the hash map supposing that values don't duplicate
// if the values duplicate than indexes should be stored in the hash map
const addToMap = (a, b, c) => {
  const calc = a * b + c;
  if (abc.has(calc)) {
    const value = abc.get(calc);
    abc.set(calc, [...value, [a, b, c]]);
    return;
  }

  abc.set(calc, [[a, b, c]]);
};

// calculate (e+f)*d 
// check if the result exists in the hash map and the numbers doesn't duplicate
// if yes add to count
const calculate = (d, e, f) => {
  const calc = (e + f) * d;
  if (abc.has(calc)) {
    const value = abc.get(calc);
    value.forEach(el => {
      if (!el.includes(e) && !el.includes(f) && !el.includes(d)) {
        ++count;
      }
    });
  }
};

// a iteration
for (let i = 0; i < N; i++) {
  // b iteration
  for (let j = 0; j < i; j++) {
    if (i === j) continue;

    // c iteration
    for (let k = 0; k < N; k++) {
      if (i === k || j === k) continue;

      addToMap(array[i], array[j], array[k]);
    }
  }
}

// d iteration
for (let i = 0; i < N; i++) {
  // check d is not equal 0
  if (array[i] === 0) continue;

  // e iteration
  for (let j = 0; j < N; j++) {
    if (i === j) continue;

    // f iteration
    for (let k = 0; k < j; k++) {
      if (i === k || j === k) continue;

      calculate(array[i], array[j], array[k]);
    }
  }
}

// we take into account that a*b===b*a and e+f===f+e
// this reduces the number of iteration in 4 times
// it's not too big comparing with O(n^3) complexity but anyway it improves the performance
const result = count * 4;
console.log(result);
