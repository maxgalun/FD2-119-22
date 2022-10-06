"use strict";

const array = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];

const treeSum = (array) => {
   let result = 0;
   for (let elem = 0; elem < array.length; elem++) {
      Array.isArray(array[elem])
         ? (result += treeSum(array[elem]))
         : (result += array[elem]);
   }
   return result;
};

console.log(treeSum(array));
