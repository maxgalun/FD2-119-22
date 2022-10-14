class Snake {
   constructor(selector) {
      this.root = document.querySelector(selector);

      this.config = {
         fieldCellsAmount: 25,
         length: 3,
         speed: 10,
      };

      this.cell = {}; //параметр ячейки змейки
      this.getCell(this.root.offsetWidth, this.root.offsetHeight);

      this.canvas = document.createElement("canvas");
      this.getCanvasSize(this.root.offsetWidth, this.root.offsetHeight);
      this.context = this.canvas.getContext("2d");

      this.field = {};
      this.getField();

      this.startAnimationTime; //время начала анимации

      this.snake = {}; //змейка
      this.getSnake();

      this.walls = []; //препятствия
      this.getWalls();

      this.food = {}; //еда
      this.getFood();

      document.addEventListener("keydown", (event) => {
         //влево
         if (event.key === "ArrowLeft" && this.snake.dx === 0) {
            this.snake.dx = -this.cell.size;
            this.snake.dy = 0;
         }

         // вверх
         if (event.key === "ArrowUp" && this.snake.dy === 0) {
            this.snake.dy = -this.cell.size;
            this.snake.dx = 0;
         }

         // вправо
         if (event.key === "ArrowRight" && this.snake.dx === 0) {
            this.snake.dx = this.cell.size;
            this.snake.dy = 0;
         }

         // Стрелка вниз
         if (event.key === "ArrowDown" && this.snake.dy === 0) {
            this.snake.dy = this.cell.size;
            this.snake.dx = 0;
         }
      });

      this.root.appendChild(this.canvas);
   }

   getCell(width, height) {
      let size = Math.floor(width / this.config.fieldCellsAmount);
      if (size < 16) {
         size = 16;
      }

      this.cell.size = size;
      this.cell.xAmount = Math.floor(width / size);
      this.cell.yAmount = Math.floor(height / size);

      console.log("size " + this.cell.size);
      console.log("Xamount " + this.cell.xAmount);
      console.log("Yamount " + this.cell.yAmount);
   }

   getCanvasSize(width, height) {
      this.canvas.width = Math.floor(width / this.cell.size) * this.cell.size;
      this.canvas.height = Math.floor(height / this.cell.size) * this.cell.size;
   }

   getField() {
      this.field.x = 0;
      this.field.y = this.cell.size * 2;
      this.field.width = this.canvas.width;
      this.field.height = this.canvas.height - this.cell.size * 2;
   }

   getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   getSnake() {
      (this.snake = {
         x: Math.floor(this.cell.xAmount / 2) * this.cell.size - this.cell.size, //голова
         y: Math.floor(this.cell.yAmount / 2) * this.cell.size - this.cell.size, //голова
         dx: this.cell.size,
         dy: 0,
         length: this.config.length,
         cells: [], //массив координат всех ячеек змейки вместе в головой, голова  - первый элемент
         color: "#ffdf00",
         headColor: "orange",
      }),
         this.fillSnakeCells();
   }

   fillSnakeCells() {
      for (let i = 0; i < this.snake.length; i++) {
         const x = this.snake.x - this.snake.dx * i;
         const y = this.snake.y - this.snake.dy * i;

         this.snake.cells.push({ x, y });
      }
   }

   getFood() {
      let x, y;

      do {
         x = this.getRandomInteger(0, this.cell.xAmount) * this.cell.size;
         y = this.getRandomInteger(0, this.cell.yAmount) * this.cell.size;
      } while (
         this.walls.filter((element) => {
            return element.x === x && element.y === y;
         }).length > 0 &&
         this.snake.cells.filter((element) => {
            return element.x === x && element.y === y;
         })
      );

      this.food.x = x;
      this.food.y = y;

      this.food.color = "#ff2755";
      console.log("this.food.x" + this.food.x);
      console.log("this.food.y" + this.food.y);
   }

   getWalls() {
      let x, y, color;

      do {
         x = this.getRandomInteger(0, this.cell.xAmount) * this.cell.size;
         y = this.getRandomInteger(0, this.cell.yAmount) * this.cell.size;
      } while (
         this.walls.filter((element) => {
            return element.x === x && element.y === y;
         }).length > 0 &&
         this.snake.cells.filter((element) => {
            return element.x === x && element.y === y;
         })
      );

      color = "chocolate";
      this.walls.push({ x, y, color });
   }

   play() {
      window.requestAnimationFrame(this.animate.bind(this));
   }

   restart() {
      this.getSnake();
      this.getFood();
      this.walls.length = 0;
      this.getWalls();
   }

   gameover() {}

   drawField() {
      this.context.fillStyle = "#545454";

      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.fillStyle = "#646464";
      for (let y = 1; y < this.cell.yAmount + 1; y++) {
         for (let x = 1; x < this.cell.xAmount + 1; x++) {
            if (y % 2) {
               if (x % 2) {
                  this.context.fillRect(
                     this.cell.size * (x - 1),
                     this.cell.size * (y - 1),
                     this.cell.size,
                     this.cell.size
                  );
               }
            } else {
               if (!(x % 2)) {
                  this.context.fillRect(
                     this.cell.size * (x - 1),
                     this.cell.size * (y - 1),
                     this.cell.size,
                     this.cell.size
                  );
               }
            }
         }
      }
   }

   animate(timestamp) {
      window.requestAnimationFrame(this.animate.bind(this));

      if (!this.startAnimationTime) {
         this.startAnimationTime = timestamp;
      }

      const progress = timestamp - this.startAnimationTime;

      if (progress < 1000 / this.config.speed) {
         return;
      }
      this.startAnimationTime = timestamp;

      //очистка поля
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //рисуем поле
      this.drawField();

      //рисуем еду
      this.context.fillStyle = this.food.color;
      this.context.fillRect(
         this.food.x,
         this.food.y,
         this.cell.size,
         this.cell.size
      );

      //рисуем препятствия
      this.walls.forEach((element) => {
         this.context.fillStyle = element.color;
         this.context.fillRect(
            element.x,
            element.y,
            this.cell.size,
            this.cell.size
         );
      });

      //опрееляем новые координаты головы змейки
      this.snake.x += this.snake.dx;
      this.snake.y += this.snake.dy;

      //проверяем на пересечение границ игрового поля
      if (this.snake.x < 0) {
         this.snake.x = this.canvas.width - this.cell.size;
      } else if (this.snake.x >= this.canvas.width) {
         this.snake.x = 0;
      }

      if (this.snake.y < 0) {
         this.snake.y = this.canvas.height - this.cell.size;
      } else if (this.snake.y >= this.canvas.height) {
         this.snake.y = 0;
      }

      //добавляем голову змейки в начало массива
      this.snake.cells.unshift({ x: this.snake.x, y: this.snake.y });

      //проверяем пересечение с едой
      if (
         this.snake.cells[0].x === this.food.x &&
         this.snake.cells[0].y === this.food.y
      ) {
         this.snake.length++;
         this.getFood();
         this.getWalls();
      }

      // проверяем пересечение головы c препятствием
      this.walls.forEach((element) => {
         if (
            this.snake.cells[0].x === element.x &&
            this.snake.cells[0].y === element.y
         ) {
            this.restart();
         }
      });

      // проверяем пересечение головы с туловищем
      for (let i = 1; i < this.snake.length; i++) {
         // debugger;
         if (
            this.snake.cells[0].x === this.snake.cells[i].x &&
            this.snake.cells[0].y === this.snake.cells[i].y
         ) {
            this.restart();
            return;
         }
      }

      //удаляем последнюю ячейку змейки после смещения головы вперед
      if (this.snake.cells.length > this.snake.length) {
         this.snake.cells.pop();
      }

      // рисуем змейку

      this.snake.cells.forEach((cell, index) => {
         this.context.fillStyle = this.snake.color;

         if (index == 0) {
            this.context.fillStyle = this.snake.headColor;
         }
         this.context.fillRect(cell.x, cell.y, this.cell.size, this.cell.size);
      });
   }
}

new Snake("#app").play();
