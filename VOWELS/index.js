function vowels(str) {
   const vowels = "аеёиоуэыюя";

   return [...str].reduce((result, current) => {
      return vowels.includes(current.toLowerCase())
         ? result + current
         : result + "";
   }, "").length;
}

console.log(vowels(prompt("Введите строку")));
