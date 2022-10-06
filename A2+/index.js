"use strict";

function myTrim(str) {
   let startIndex;
   let endIndex;
   let pos = -1;

   while (~str.indexOf(" ", pos + 1)) {
      if (str.indexOf(" ", pos + 1) - pos > 1) break;
      pos = str.indexOf(" ", pos + 1);
   }
   startIndex = ++pos;

   pos = str.length;
   while (~str.lastIndexOf(" ", pos - 1)) {
      if (pos - str.lastIndexOf(" ", pos - 1) > 1) break;
      pos = str.lastIndexOf(" ", pos - 1);
   }
   endIndex = pos;

   return str.substring(startIndex, endIndex);
}

function myTrim2(str) {
   let startIndex;
   let endIndex;

   for (let i = 0; i < str.length; i++) {
      if (str[i] != " ") {
         startIndex = i;
         break;
      }
   }

   for (let i = str.length - 1; i > -1; i--) {
      if (str[i] != " ") {
         endIndex = i + 1;
         break;
      }
   }

   return str.substring(startIndex, endIndex);
}

function myTrim3(str) {
   while (str.startsWith(" ")) {
      str = str.substring(1);
   }

   while (str.endsWith(" ")) {
      str = str.slice(0, -1);
   }

   return str;
}

console.log("$" + myTrim("     srting srting srting    ") + "$");
console.log("$" + myTrim2("     srting srting srting    ") + "$");
console.log("$" + myTrim3("     srting srting srting    ") + "$");
