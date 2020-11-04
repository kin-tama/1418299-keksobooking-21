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

  // функция блокировки элемента
  // перепроверить if (!element.classList.contains("map__pin--main"))
  const disableElement = function (arr) {
    for (let element of arr) {
      if (!element.classList.contains("map__pin--main")) {
        element.disabled = true;
      }
    }
  };

  // функция разблокировки элемента
  const enableElement = function (arr) {
    for (let element of arr) {
      element.disabled = false;
    }
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getrandomArrey: getrandomArrey,
    disableElement: disableElement,
    enableElement: enableElement,
  };

})();

