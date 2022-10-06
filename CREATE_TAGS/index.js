class Menu {
   constructor(form) {
      form.onclick = this.onClick.bind(this);
   }

   createPopup(tag) {
      document.getElementById("modal").style.display = "block";
      const popupHTML = `<div class="modal__popup popup">
   <div class="popup__content">
      <div class="popup__header">
         <div class="popup__title">Укажите содержимое для элемента ${tag}</div>
      </div>
      <div class="popup__body">
      <input type="text" class="popup__input" placeholder='enter content'>
      </div>
      ${
         tag == "ul"
            ? '<button id="plus" class="popup__plus" data-action="clone">+</button>'
            : ""
      }
      <div id="popup__footer" class="popup__footer">
         <button class="popup__button" data-action="add">
            Добавить
         </button>
         <button class="popup__button" data-action="cancel">
            Отменить
         </button>
      </div>
   </div>
</div>`;

      document.getElementById("modal").innerHTML = popupHTML;
      document.getElementsByClassName("popup__input")[0].focus();
   }

   cancel() {
      document.getElementsByClassName("popup")[0].remove();
      document.getElementById("modal").style.display = "none";
   }

   add(tag) {
      let childNode;
      switch (tag) {
         case "ul":
            const ul = document.createElement("ul");

            [...document.getElementsByClassName("popup__input")].forEach(
               (element) => {
                  if (element.value) {
                     const textNode = document.createTextNode(element.value);
                     const li = document.createElement("li");
                     li.appendChild(textNode);
                     ul.appendChild(li);
                  }
               }
            );
            childNode = ul;

            break;

         default:
            const textNode = document.createTextNode(
               document.getElementsByClassName("popup__input")[0].value
            );
            const tagNode = document.createElement(tag);
            tagNode.appendChild(textNode);
            childNode = tagNode;
            break;
      }

      document.getElementById("app").appendChild(childNode);

      this.cancel();
   }

   clone() {
      const inputElement = document
         .getElementsByClassName("popup__input")[0]
         .cloneNode();
      inputElement.value = "";
      document
         .getElementsByClassName("popup__body")[0]
         .appendChild(inputElement);
   }

   onClick(event) {
      const tag = event.target.dataset.tag;
      const action = event.target.dataset.action;

      if (tag) {
         this.tag = tag;
         this.createPopup(tag);
      }

      if (action) {
         this[action](this.tag);
      }
   }
}

new Menu(document.getElementById("menu"));
