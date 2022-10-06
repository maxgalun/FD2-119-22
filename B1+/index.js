"use strict";

function getCentury(year) {
   return Math.ceil(year / 100);
}

console.log(getCentury(prompt("Укажите год")));
