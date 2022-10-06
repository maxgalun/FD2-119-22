"use strict";

function formatNumber(n, f) {
   const formatSign = "#. ";

   if (!f.split("").every((item) => formatSign.includes(item))) {
      alert(`Ошибка в форматной строке ${f}`);
      return;
   }

   const num = {};
   const format = {};
   const result = {
      int: "",
      fract: "",
   };

   [format.int, format.fract = []] = String(f).split(".");

   if (!format.fract.length) {
      n = Math.round(n);
   }

   [num.int, num.fract = "0"] = String(n).split("."); //int - целая часть, fract - дробная

   format.int = format.int.split("").reverse();
   num.int = num.int.split("").reverse();

   result.fract = format.fract.length
      ? (num.fract / Math.pow(10, num.fract.length))
           .toFixed(format.fract.length)
           .toString()
           .slice(1)
      : "";

   let indexNum = 0;

   for (
      let indexFormat = 0;
      indexNum < num.int.length && format.int[indexFormat];
      indexFormat++
   ) {
      switch (format.int[indexFormat]) {
         case "#":
            result.int += num.int[indexNum++];
            break;
         case " ":
            result.int += " ";
            break;
      }
   }

   result.int += num.int.slice(indexNum).join("");
   result.int = result.int.split("").reverse().join("");

   return result.int + result.fract;
}

console.log(formatNumber(2.3, "# ### ###.##"));
console.log(formatNumber(12345.368, "# ### ###.##"));
