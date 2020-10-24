// здесь будет говнокод
"use strict";

// список констант

const ADS_NUMBER = 8;
const TYPE = ["palace", "flat", "house", "bungalow"];
const TIME = ["12:00", "13:00", "14:00"];
const FEATURES = [" wifi", " dishwasher", " parking", " washer", " elevator", " conditioner"];
const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const APARTS = {
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом",
  palace: "Дворец"
};

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

getAuthors(ADS_NUMBER);

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
        avatar: authors[i]
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

for (let i = 0; i < ADS_NUMBER; i++) {
  let pinElement = pinTemplate.cloneNode(true);
  pinElement.style = "left:" + (ads[i].location.x + 40) + "px; top: " + (ads[i].location.y + 20) + "px;";
  pinElement.querySelector("img").src = ads[i].author.avatar;
  pinElement.querySelector("img").alt = ads[i].offer.title;
  fragment.appendChild(pinElement);
}

mapPins.appendChild(fragment);

// module3-task2
// вставляем в mapPins (как на строке 131)

let cardTemplate = document.querySelector("#card").content.querySelector(".popup");
let fragmentTwo = document.createDocumentFragment();

for (let i = 0; i < ADS_NUMBER; i++) {
  let cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".popup__title").textContent = ads[i].offer.title;
  cardElement.querySelector(".popup__text--address").textContent = ads[i].offer.address;
  cardElement.querySelector(".popup__text--price").textContent = ads[i].offer.price + "₽/ночь";
  cardElement.querySelector(".popup__type").textContent = APARTS[ads[i].offer.type];
  cardElement.querySelector(".popup__text--capacity").textContent = ads[i].offer.rooms + " комнаты для " + ads[i].offer.guests + " гостей";
  cardElement.querySelector(".popup__text--time").textContent = "заезд после " + ads[i].offer.checkin + ", выезд до " + ads[i].offer.checkout;
  cardElement.querySelector(".popup__features").textContent = String(ads[i].offer.features);
  cardElement.querySelector(".popup__description").textContent = ads[i].offer.description;
  // cardElement.querySelector(".popup__photos").appendChild(img).src = ads[i].offer.photos; не совсем понял, что и куда конкретно нужно вставлять - поправлю в следующей итерации
  cardElement.querySelector(".popup__avatar").src = ads[i].author.avatar;
  fragmentTwo.appendChild(cardElement);
}

mapPins.appendChild(fragmentTwo);



{/* <template id="card">
    <article class="map__card popup">
      <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <button type="button" class="popup__close">Закрыть</button>
      <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
      <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
      <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
      <h4 class="popup__type">Квартира</h4>
      <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
      <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>
      <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
      <div class="popup__photos">
        <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      </div>
    </article>
  </template> */}
