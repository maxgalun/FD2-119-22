"use strict";

function getReverse(str) {
   return str.split("").reverse().join("");
}

console.log(getReverse(prompt("Укажите строку")));
