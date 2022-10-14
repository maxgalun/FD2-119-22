class Game {
   constructor(selector, config) {
      this.root = document.querySelector(selector);
      this.config = {
         fieldWidth: "1600px",
         fieldHeight: "800px",
         fieldPadding: "20px",
         squareSize: "50px",
         squareColor: "tomato",
         speed: 1,
      };
      Object.assign(this.config, config);
      this.container = document.createElement("div");
      this.container.style.position = "relative";
      this.container.style.width = this.config.fieldWidth;
      this.container.style.height = this.config.fieldHeight;
      this.container.style.padding = this.config.fieldPadding;
      this.field = document.createElement("div");
      this.field.style.position = "relative";
      this.field.style.height = "100%";
      this.field.style.border = "1px solid black";
      this.field.style.overflow = "hidden";
      this.container.appendChild(this.field);
      this.square = document.createElement("div");
      this.square.style.position = "absolute";
      this.square.style.width = this.config.squareSize;
      this.square.style.height = this.config.squareSize;
      this.square.style.backgroundColor = this.config.squareColor;
      // this.step = this.config.speed / 10;
      // this.step = this.config.squareSize * this.config.speed;
      this.field.appendChild(this.square);
      this.root.appendChild(this.container);
      this.border = {
         top: 0,
         left: 0,
         right: this.field.offsetWidth,
         bottom: this.field.offsetHeight,
      };

      this.speed = this.config.speed;
      this.square.size = this.config.squareSize;
      this.square.width = this.config.squareSize;
      this.square.height = this.config.squareSize;
      this.square.top = 0;
      this.square.left = 0;
      this.square.right = this.square.offsetWidth;
      this.square.bottom = this.square.offsetHeight;
      this.addEventListener();
   }

   render() {
      this.square.style.top = this.square.top + "px";
      this.square.style.left = this.square.left + "px";
   }

   addEventListener() {
      const param = [this.square, this.border, this.step];
      let timer = {};
      let callback;

      function setTimer() {
         if (timer.callback != callback) {
            clearInterval(timer.id);
            callback.call(this, ...param);
            timer.id = setInterval(callback.bind(this), 10, ...param);
            timer.callback = callback;
         }
      }

      function onKeyDown(event) {
         switch (event.keyCode) {
            case 37: //влево
               callback = this.moveToLeft;
               setTimer.call(this);
               break;
            case 38: //вверх
               callback = this.moveToTop;
               setTimer.call(this);
               break;
            case 39: //вправо
               callback = this.moveToRight;
               setTimer.call(this);
               break;
            case 40: //вниз
               callback = this.moveToBottom;
               setTimer.call(this);
               break;
         }
      }

      document.addEventListener("keydown", onKeyDown.bind(this));
   }

   moveToLeft(square, border, step) {
      if (square.left - square.size > border.left) {
         square.left -= square.size;
         square.right = square.left + square.width;
         this.render();
      }
   }

   moveToTop(square, border, step) {
      if (square.top - step > border.top) {
         square.top -= step;
      } else {
         square.top = border.top;
      }
      square.bottom = square.top + square.height;
      this.render();
   }

   moveToRight(square, border) {
      square.right += square.size;

      if (square.right > border.right) {
         square.right = border.right;
      }

      square.left = square.right - square.width;
      this.render();
   }

   moveToBottom(square, border, step) {
      if (square.bottom + step < border.bottom) {
         square.bottom += step;
      } else {
         square.bottom = border.bottom;
      }
      square.top = square.bottom - square.height;
      this.render();
   }
}

new Game("#app");
