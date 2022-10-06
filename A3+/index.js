"use strict";

function palindrome(str) {
   str = str
      .toLowerCase()
      .replaceAll(/[—.,;:?!-"()\s]/g, "")
      .replaceAll("ё", "е")
      .replaceAll("ъ", "ь");

   for (let i = 0; i < str.length / 2; i++) {
      if (str[i] != str[str.length - 1 - i]) return false;
   }

   return true;
}

let str1 = "А роза упала на лапу Азора";
let str2 = "Лёша на полке клопа нашёл";
let str3 = "Я иду съ мечемъ судия";
let str4 = "Я — арка края";
let str5 = "Саша на полке клопа нашёл";

console.log(`${str1} - ${palindrome(str1) ? "палиндром" : "не палиндром"}`);
console.log(`${str2} - ${palindrome(str2) ? "палиндром" : "не палиндром"}`);
console.log(`${str3} - ${palindrome(str3) ? "палиндром" : "не палиндром"}`);
console.log(`${str4} - ${palindrome(str4) ? "палиндром" : "не палиндром"}`);
console.log(`${str5} - ${palindrome(str5) ? "палиндром" : "не палиндром"}`);
