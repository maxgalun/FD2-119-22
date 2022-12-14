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

      formElement = document.createElement("br");
      form.appendChild(formElement);
   });
}

var formDef1 = [
   { label: "???????????????? ??????????:", kind: "longtext", name: "sitename" },
   { label: "URL ??????????:", kind: "longtext", name: "siteurl" },
   { label: "?????????????????????? ?? ??????????:", kind: "number", name: "visitors" },
   { label: "E-mail ?????? ??????????:", kind: "shorttext", name: "email" },
   {
      label: "?????????????? ????????????????:",
      kind: "combo",
      name: "division",
      variants: [
         { text: "????????????????", value: 1 },
         { text: "???????????????? ??????", value: 2 },
         { text: "?????????????? ??????????????", value: 3 },
      ],
   },
   {
      label: "????????????????????:",
      kind: "radio",
      name: "payment",
      variants: [
         { text: "????????????????????", value: 1 },
         { text: "??????????????", value: 2 },
         { text: "VIP", value: 3 },
      ],
   },
   { label: "?????????????????? ????????????:", kind: "check", name: "votes" },
   { label: "???????????????? ??????????:", kind: "memo", name: "description" },
   { caption: "????????????????????????", kind: "submit" },
];

var formDef2 = [
   { label: "??????????????:", kind: "longtext", name: "lastname" },
   { label: "??????:", kind: "longtext", name: "firstname" },
   { label: "????????????????:", kind: "longtext", name: "secondname" },
   { label: "??????????????:", kind: "number", name: "age" },
   { caption: "????????????????????????????????????", kind: "submit" },
];

createForm(document.forms.form1, formDef1);
createForm(document.forms.form2, formDef2);
