"use strict";

const malePensionAge = 63;
const femalePensionAge = 58;
const ageLimit = 120;

const isEmptyStr = (str) => {
   return !str?.trim();
};

const isUncorrectAge = (age) => {
   return (
      isEmptyStr(age) ||
      isNaN(age) ||
      !Number.isInteger(+age) ||
      !(+age > 0 && +age < ageLimit)
   );
};

const proper = (str) =>
   str.trim()[0].toUpperCase() + str.trim().substring(1).toLowerCase();

const getFIO = (requestStr) => {
   let response;

   do {
      response = prompt(requestStr);
   } while (isEmptyStr(response));

   return proper(response);
};

const getAge = (requestStr) => {
   let age;

   do {
      age = prompt(requestStr);
   } while (isUncorrectAge(age));

   return +age;
};

const isPensioner = (isMale, age) =>
   (isMale && age >= malePensionAge) || (!isMale && age >= femalePensionAge)
      ? true
      : false;

const surname = getFIO("Укажите фамилию");
const name = getFIO("Укажите имя");
const patronymic = getFIO("Укажите отчество");
const age = getAge("Укажите возраст");
const isMale = confirm("Ваш пол - мужской?");

alert(`ваше ФИО: ${surname} ${name} ${patronymic}
ваш возраст в годах: ${age}
ваш возраст в днях: ${age * 365}
через 5 лет вам будет: ${age + 5}
ваш пол: ${isMale ? "мужской" : "женский"}
вы на пенсии: ${isPensioner(isMale, age) ? "да" : "нет"}`);
