function HashStorageFunc() {
   const hash = {};

   this.addValue = function (key, value) {
      hash[key] = value;
   };
   this.getValue = function (key) {
      return hash[key];
   };
   this.deleteValue = function (key) {
      if (key in hash) return delete hash[key];
      return false;
   };

   this.getKeys = function () {
      return Object.keys(hash);
   };
}

const drinkStorage = new HashStorageFunc();

function addDrink() {
   const name = prompt("Укажите название напитка");
   const isAlco = confirm("Напиток алкогольный?");
   const recipe = prompt("Укажите рецепт приготовления");
   drinkStorage.addValue(name, {
      isAlco,
      recipe,
   });

   console.log(`Данные о напитке ${name} добавлены`);
}

function getDrink(name) {
   if (!drinkStorage.getValue(name)) {
      console.log(`Нет информации о напитке ${name}`);
      return;
   }

   const isAlco = drinkStorage.getValue(name)["isAlco"];
   const recipe = drinkStorage.getValue(name)["recipe"];

   console.log(`напиток: ${name}
алкогольный: ${isAlco ? "да" : "нет"}
рецепт приготовления: ${recipe}`);
}

function deleteDrink(name) {
   console.log(
      drinkStorage.deleteValue(name)
         ? `Информация о напитке ${name} удалена`
         : "Такого напитка нет"
   );
}

function getDrinksName() {
   for (let name of drinkStorage.getKeys()) {
      console.log(name);
   }
}
