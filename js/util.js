"use strict";

(function () {

  const TYPES = ["palace", "flat", "house", "bungalow"];
  const TIMES = ["12:00", "13:00", "14:00"];
  const FEATURES = [" wifi", " dishwasher", " parking", " washer", " elevator", " conditioner"];
  const AUTHORS = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"];
  const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const XMIN = 0;
  const XMAX = 750;
  const YMIN = 130;
  const YMAX = 630;


  // функция-рандомайзер
  const getRandomInteger = function (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  // функция для получения массива с рандомным количеством элементов
  let randomArrey = [];
  let getrandomArrey = function (arrey) {
    randomArrey = [];
    for (let i = 0; i < getRandomInteger(1, arrey.length); i++) {
      randomArrey.push(arrey[i]);
    }
    return randomArrey;
  };

  // функция блокировки элемента
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

  // генератор предложений
  let getNewAdv = function (number) {
    return {
      author: {
        avatar: AUTHORS[number]
      },

      offer: {
        title: "Уютное гнездышко для молодоженов",
        address: getRandomInteger(0, 600) + ", " + getRandomInteger(0, 350),
        price: getRandomInteger(2000, 5000),
        type: TYPES[getRandomInteger(0, 3)],
        rooms: getRandomInteger(0, 10),
        guests: getRandomInteger(0, 20),
        checkin: TIMES[getRandomInteger(0, 2)],
        checkout: TIMES[getRandomInteger(0, 2)],
        features: getrandomArrey(FEATURES),
        description: "Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.",
        photos: getrandomArrey(PHOTOS)
      },

      location: {
        x: getRandomInteger(XMIN, XMAX),
        y: getRandomInteger(YMIN, YMAX)
      }
    };
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getrandomArrey: getrandomArrey,
    disableElement: disableElement,
    enableElement: enableElement,
    getNewAdv: getNewAdv
  };

})();

