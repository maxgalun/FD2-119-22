function createForm(form, dataArray) {
   dataArray.forEach((item) => {
      let formElement;
      let formElementText;

      if ("label" in item) {
         formElement = document.createElement("label");
         formElementText = document.createTextNode(item.label);
         formElement.appendChild(formElementText);
         form.appendChild(formElement);
      }

      switch (item.kind) {
         case "radio":
            item.variants.forEach((variant) => {
               formElement = document.createElement("input");
               formElement.type = "radio";
               formElement.name = item.name;
               formElement.value = variant.value;
               formElement.id = variant.value;
               formElement.checked = true;
               const labelElement = document.createElement("label");
               const labelText = document.createTextNode(variant.text);
               labelElement.setAttribute("for", variant.value);
               labelElement.appendChild(labelText);
               form.appendChild(formElement);
               form.appendChild(labelElement);
            });

            break;

         case "submit":
            formElement = document.createElement("button");
            formElement.type = "submit";
            formElementText = document.createTextNode(item.caption);
            formElement.appendChild(formElementText);
            form.appendChild(formElement);
            break;

         case "combo":
            formElement = document.createElement("select");
            formElement.name = item.name;
            formElement.style.width = "300px";
            item.variants.forEach((variant) => {
               const optionElement = document.createElement("option");
               const optionText = document.createTextNode(variant.text);
               optionElement.value = variant.value;
               optionElement.appendChild(optionText);
               formElement.appendChild(optionElement);
            });
            form.appendChild(formElement);
            break;

         case "memo":
            formElement = document.createElement("textarea");
            formElement.name = item.name;
            formElement.rows = 5;
            formElement.cols = 80;
            form.appendChild(formElement);
            break;

         case "longtext":
            formElement = document.createElement("input");
            formElement.name = item.name;
            formElement.style.width = "600px";
            form.appendChild(formElement);
            break;

         case "shorttext":
            formElement = document.createElement("input");
            formElement.name = item.name;
            formElement.style.width = "300px";
            form.appendChild(formElement);
            break;

         case "date":
            formElement = document.createElement("input");
            formElement.name = item.name;
            formElement.type = "date";
            formElement.style.width = "150px";
            form.appendChild(formElement);
            break;

         case "number":
            formElement = document.createElement("input");
            formElement.name = item.name;
            formElement.type = "number";
            formElement.style.width = "150px";
            form.appendChild(formElement);
            break;

         case "check":
            formElement = document.createElement("input");
            formElement.name = item.name;
            formElement.type = "checkbox";
            formElement.checked = true;
            form.appendChild(formElement);
            break;
      }

      if (item.required) {
         formElement.setAttribute("data-required", "");
      }

      formElement = document.createElement("br");
      form.appendChild(formElement);
   });
}

function validForm(form) {
   let isNullValidation = false; //признак проверки поля на пустое значение

   form.addEventListener("focusout", focusoutHandler);
   form.addEventListener("submit", submitHandler);

   function focusoutHandler(event) {
      const target = event.target;
      const errorElement = document.createElement("label");
      errorElement.classList.add("error");

      if (target.nextElementSibling.classList.contains("error")) {
         target.nextElementSibling.remove();
      }

      if (isNullValidation && !target.value && "required" in target.dataset) {
         errorElement.textContent = "Обязательное поле";
         target.after(errorElement);
      }

      if (/[А-Яа-я]/.test(target.value)) {
         errorElement.textContent =
            "Ошибка: значение должно содержать только символы латиницы ";
         target.after(errorElement);
      }

      switch (target.name) {
         case "email":
            if (target.value && !/@/.test(target.value)) {
               errorElement.textContent +=
                  "Ошибка: значение должно быть указано в формате name@domain.com";
               target.after(errorElement);
            }
            break;
         case "visitors":
            if (target.value && target.value < 0) {
               errorElement.textContent +=
                  "Ошибка: значение должно быть положительным числом";
               target.after(errorElement);
            }
            break;
      }
   }

   function submitHandler(event) {
      let hasError = false; //признак наличия ошибки валидации

      [...form.elements].forEach((element) => {
         const errorElement = document.createElement("label");
         errorElement.classList.add("error");

         if (
            "required" in element.dataset &&
            !element.value &&
            !element.nextElementSibling.classList.contains("error")
         ) {
            errorElement.textContent = "Обязательное поле";
            element.after(errorElement);
         }

         if (
            !hasError &&
            element.nextElementSibling.classList.contains("error")
         ) {
            element.scrollIntoView();
            element.focus();
            hasError = true;
         }
      });

      if (hasError) {
         isNullValidation = true;
         event.preventDefault();
      }
   }
}

var formDef1 = [
   {
      label: "Разработчики*",
      kind: "longtext",
      name: "author",
      required: "true",
   },
   {
      label: "Название сайта*",
      kind: "longtext",
      name: "sitename",
      required: "true",
   },
   { label: "URL сайта*", kind: "longtext", name: "siteurl", required: "true" },
   {
      label: "Дата запуска сайта*",
      kind: "date",
      name: "startdate",
      required: "true",
   },
   {
      label: "Посетителей в сутки*",
      kind: "number",
      name: "visitors",
      required: "true",
   },
   {
      label: "E-mail для связи*",
      kind: "shorttext",
      name: "email",
      required: "true",
   },
   {
      label: "Рубрика каталога",
      kind: "combo",
      name: "division",
      variants: [
         { text: "здоровье", value: 1 },
         { text: "домашний уют", value: 2 },
         { text: "бытовая техника", value: 3 },
      ],
   },
   {
      label: "Размещение",
      kind: "radio",
      name: "payment",
      variants: [
         { text: "бесплатное", value: 1 },
         { text: "платное", value: 2 },
         { text: "VIP", value: 3 },
      ],
   },
   { label: "Разрешить отзывы", kind: "check", name: "votes" },
   {
      label: "Описание сайта",
      kind: "memo",
      name: "description",
   },
   { caption: "Опубликовать", kind: "submit" },
];

createForm(document.forms.form1, formDef1);
validForm(document.forms.form1);
