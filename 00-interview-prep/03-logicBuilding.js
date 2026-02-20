// Set removes duplicate elements and keep unique values in the array
// note:- set returns an object not an array
const arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 7];

console.log(...new Set(arr));

// if you want to find duplicates in the array
const findDuplicates = (arr) => {
  return [...new Set(arr.filter((item, index) => arr.indexOf(item) !== index))];
};
console.log(findDuplicates(arr));
// arr.indexof(item) returns first occurerence of that element in the array.
// arr.filter keeps only the items which returns true & removes the items which are false
// set removes the duplicates if in anycase filter returns 1,1,1 something like this
// since set returns object we are turning it to arr by spreading

const findDuplicatesWithoutMethods = (arr) => {
  const map = {};
  const duplicates = [];

  for (let val of arr) {
    if (map[val] !== undefined) {
      if (map[val] === 1) {
        duplicates.push(val);
      }
      map[val]++;
    } else {
      map[val] = 1;
    }
  }
  return duplicates;
};
