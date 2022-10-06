"use strict";

function buildWrapper(tag) {
   tag = "<" + tag + ">";
   return function (str) {
      const mnemonics = {
         "&": "&amp;",
         "<": "&lt;",
         ">": "&gt;",
         "'": "&apos;",
         '"': "&quot;",
      };

      Object.entries(mnemonics).forEach(
         (element) => (str = str.replaceAll(element[0], element[1]))
      );

      return tag + str + tag;
   };
}

const wrapH1 = buildWrapper("H1");
const wrapP = buildWrapper("P");
console.log(wrapH1("СТИХИ"));
console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Вкусные M&M's"));
