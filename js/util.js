"use strict";

(function () {

  // функция-рандомайзер
  const getRandomInteger = function (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  // функция для получения массива с рандомным количеством элементов
  let getrandomArrey = function (arrey) {
    let randomArrey = [];
    for (let i = 0; i < getRandomInteger(1, arrey.length); i++) {
      randomArrey.push(arrey[i]);
    }
    return randomArrey;
  };

  const disableElement = function (arr) {
    for (let element of arr) {
      element.disabled = true;
    }
  };

  // if (document.querySelector(".popup")) {
  //   window.pin.closePopUp();
  // }

  const enableElement = function (arr) {
    for (let element of arr) {
      element.disabled = false;
    }
  };

  // error

  let errorHandler = function (errorMessage) {
    let errorChild = document.createElement("div");
    errorChild.style = "z-index: 100; margin: auto; text-align: center; background-color: yellow; height: 200px; padding: 60px";
    errorChild.style.position = "absolute";
    errorChild.style.left = 0;
    errorChild.style.right = 0;
    errorChild.style.fontSize = "50px";
    errorChild.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", errorChild);
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getrandomArrey: getrandomArrey,
    disableElement: disableElement,
    enableElement: enableElement,
    errorHandler: errorHandler
  };

})();

