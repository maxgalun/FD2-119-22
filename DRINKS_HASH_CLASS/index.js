class _HashStorageClass {
   _hash = {};

   addValue = function (key, value) {
      this._hash[key] = value;
   };

   getValue = function (key) {
      return this._hash[key];
   };

   deleteValue = function (key) {
      if (key in this._hash) return delete this._hash[key];
      return false;
   };

   getKeys = function () {
      return Object.keys(this._hash);
   };
}

const drinkStorage = new _HashStorageClass();

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
