// здесь будет говнокод
"use strict";

// список констант

const ADS_NUMBER = 8;
const TYPE = ["palace", "flat", "house", "bungalow"];
const TIME = ["12:00", "13:00", "14:00"];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];


// функция-рандомайзер
const getRandomInteger = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// генератор неповторяющихся чисел
let arrayRandomNumbers;

const getRandomarray = function (min, max) {
  arrayRandomNumbers = [];
  let totalNumbers = max - min + 1;
  let arrayTotalNumbers = [];
  let tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }
  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }
  return arrayRandomNumbers;
};

// создаем массив авторов

let authors = [];
let getAuthors = function (number) {
  getRandomarray(1, number);
  for (let i = 0; i < 8; i++) {
    authors[i] = "img/avatars/user0" + arrayRandomNumbers[i] + ".png";
  }
  return authors;
};

// features

let randomFeatures = [];
let getrandomFeatures = function (array) {
  randomFeatures = [];
  for (let i = 0; i < getRandomInteger(1, array.length); i++) {
    randomFeatures.push(array[i]);
  }
  return randomFeatures;
};

// генератор предложений

let offers = [];

let getOffers = function (number) {
  for (let i = 0; i < number; i++) {
    offers[i] = {
      title: "Уютное гнездышко для молодоженов",
      address: getRandomInteger(0, 600) + ", " + getRandomInteger(0, 350),
      price: getRandomInteger(0, 1000),
      type: TYPE[getRandomInteger(0, 3)],
      rooms: getRandomInteger(0, 10),
      guests: getRandomInteger(0, 20),
      checkin: TIME[getRandomInteger(0, 2)],
      checkout: TIME[getRandomInteger(0, 2)],
      features: getrandomFeatures(FEATURES),
      description: "Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.",
      photos: getrandomFeatures(PHOTOS)
    };
  }
  return offers;
};

// создаем массив объектов предложений

let ads = [];
let getSomeAdds = function (numberOfAds) {
  for (let i = 0; i < numberOfAds; i++) {
    ads[i] = {
      author: {
        avatar: getAuthors(numberOfAds)[i]
      },
      offer: getOffers(numberOfAds)[i],
      location: {
        x: getRandomInteger(0, 750),
        y: getRandomInteger(130, 630)
      }
    };
  }
  return ads;
};

// задание

let map = document.querySelector(".map");
map.classList.remove("map--faded");

// находим куда вставлять
let mapPins = document.querySelector(".map__pins");

// находим что вставлять

let pinTemplate = document.querySelector("#pin").content.querySelector('.map__pin');

// вставляем

getSomeAdds(ADS_NUMBER);

let fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  let pinElement = pinTemplate.cloneNode(true);
  pinElement.style = "left:" + (ads[i].location.x + 40) + "px; top: " + (ads[i].location.y + 20) + "px;";
  pinElement.querySelector("img").src = ads[i].author.avatar;
  pinElement.querySelector("img").alt = ads[i].offer.title;
  fragment.appendChild(pinElement);
}

mapPins.appendChild(fragment);
