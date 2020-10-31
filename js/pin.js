"use strict";

(function () {

  const XOFFSET = 20;
  const YOFFSET = 22;

  // функция, создающая пин
  let pinElement;
  let fragment = document.createDocumentFragment();

  // находим что вставлять
  const pinTemplate = document.querySelector("#pin").content.querySelector('.map__pin');
  // const mapPins = document.querySelector(".map__pins");

  // после разбиения на модули, mapPins.appendChild(fragment) в файле main работать перестало. Временно включил в функцию ниже (20 строка)
  const createPin = function (object) {
    pinElement = pinTemplate.cloneNode(true);
    pinElement.style = "left:" + (object.location.x + XOFFSET) + "px; top: " + (object.location.y + YOFFSET) + "px;";
    pinElement.querySelector("img").src = object.author.avatar;
    pinElement.querySelector("img").alt = object.offer.title;
    fragment.appendChild(pinElement);
    // mapPins.appendChild(fragment);
  };

  window.pin = {
    createPin: createPin,
  };
})();

