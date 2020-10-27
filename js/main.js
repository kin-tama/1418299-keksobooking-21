"use strict";

// список констант
const ADS_NUMBER = 8;
const TYPES = ["palace", "flat", "house", "bungalow"];
const TIMES = ["12:00", "13:00", "14:00"];
const FEATURES = [" wifi", " dishwasher", " parking", " washer", " elevator", " conditioner"];
const AUTHORS = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"];
const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const apartsList = {
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом",
  palace: "Дворец"
};
const XMIN = 0;
const XMAX = 750;
const YMIN = 130;
const YMAX = 630;
const XOFFSET = 40;
const YOFFSET = 20;


// функция-рандомайзер
const getRandomInteger = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};


// функция для получения массива с рандомным количеством элементов
let randomArrey = [];
let getrandomArrey = function (array) {
  randomArrey = [];
  for (let i = 0; i < getRandomInteger(1, array.length); i++) {
    randomArrey.push(array[i]);
  }
  return randomArrey;
};

// объявляем функцию, которая будет создавать предложения
let adv = 0;

let getNewAdv = function (number) {
  adv = {
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
  return adv;
};

// Находим объект "карта" и убираем у него класс "map--faded"
const map = document.querySelector(".map");
map.classList.remove("map--faded");

// находим куда вставлять
const mapPins = document.querySelector(".map__pins");

// находим что вставлять
const pinTemplate = document.querySelector("#pin").content.querySelector('.map__pin');

// функция, создающая пин
let pinElement;

const createPin = function (object) {
  pinElement = pinTemplate.cloneNode(true);
  pinElement.style = "left:" + (object.location.x + XOFFSET) + "px; top: " + (object.location.y + YOFFSET) + "px;";
  pinElement.querySelector("img").src = object.author.avatar;
  pinElement.querySelector("img").alt = object.offer.title;
  fragment.appendChild(pinElement);
};

// функция, создающая карточку
let cardElement = 0;
let cardTemplate = document.querySelector("#card").content.querySelector(".popup");
let fragmentTwo = document.createDocumentFragment();
let popupPhotos = 0;

let createCard = function (object) {
  cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".popup__title").textContent = object.offer.title;
  cardElement.querySelector(".popup__text--address").textContent = object.offer.address;
  cardElement.querySelector(".popup__text--price").textContent = object.offer.price + "₽/ночь";
  cardElement.querySelector(".popup__type").textContent = apartsList[object.offer.type];
  cardElement.querySelector(".popup__text--capacity").textContent = object.offer.rooms + " комнаты для " + object.offer.guests + " гостей";
  cardElement.querySelector(".popup__text--time").textContent = "заезд после " + object.offer.checkin + ", выезд до " + object.offer.checkout;
  cardElement.querySelector(".popup__features").textContent = String(object.offer.features);
  cardElement.querySelector(".popup__description").textContent = object.offer.description;
  cardElement.querySelector(".popup__avatar").src = object.author.avatar;

  popupPhotos = cardElement.querySelector(".popup__photos");
  popupPhotos.querySelector(".popup__photo").src = PHOTOS[0];
  for (let i = 1; i < PHOTOS.length; i++) {
    let photo = document.createElement("img");
    photo.alt = "Фотография жилья";
    photo.height = 40;
    photo.width = 40;
    photo.classList.add("popup__photo");
    photo.src = PHOTOS[i];
    popupPhotos.appendChild(photo);
  }

  fragmentTwo.appendChild(cardElement);
};

// создаем и вставляем 8 пинов + карточки
let fragment = document.createDocumentFragment();

for (let i = 0; i < ADS_NUMBER; i++) {
  getNewAdv(i);
  createPin(adv);
  createCard(adv);
}

mapPins.appendChild(fragment);
mapPins.appendChild(fragmentTwo);
