"use strict";

function randomDiap(n, m) {
   return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
   var colors = [
      "",
      "красный",
      "оранжевый",
      "жёлтый",
      "зелёный",
      "голубой",
      "синий",
      "фиолетовый",
   ];

   console.log("цветов: " + colorsCount);
   let result = [];

   while (result.length < colorsCount) {
      var n = randomDiap(1, 7);
      if (result.includes(n)) continue;
      result.push(n);
      var colorName = colors[n];
      console.log(colorName);
   }
}

mood(3);
