function vowelsForEach(str) {
   const vowels = "аеёиоуэыюя";
   let count = 0;

   [...str].forEach((element) => {
      if (vowels.includes(element.toLowerCase())) count++;
   });

   return count;
}

function vowelsFilter(str) {
   const vowels = "аеёиоуэыюя";

   let result = [...str].filter((element) => {
      return vowels.includes(element.toLowerCase());
   });

   return result.length;
}

function vowelsReduce(str) {
   const vowels = "аеёиоуэыюя";

   return [...str].reduce((result, current) => {
      return vowels.includes(current.toLowerCase())
         ? result + current
         : result + "";
   }, "").length;
}

const str = prompt("Введите строку");
console.log(`Метод forEach: гласных букв ${vowelsForEach(str)}`);
console.log(`Метод filter:гласных букв ${vowelsFilter(str)}`);
console.log(`Метод reduce:гласных букв ${vowelsReduce(str)}`);
