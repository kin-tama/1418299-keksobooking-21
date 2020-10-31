"use strict";

(function () {
  const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const apartsList = {
    flat: "Квартира",
    bungalow: "Бунгало",
    house: "Дом",
    palace: "Дворец"
  };

  let cardElement = 0;
  let cardTemplate = document.querySelector("#card").content.querySelector(".popup");
  let fragmentTwo = document.createDocumentFragment();
  let popupPhotos = 0;

  // после разбиения на модули, mapPins.appendChild(fragment) в файле main работать перестало. Временно включил в функцию ниже (36 строка)
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
    // mapPins.appendChild(fragmentTwo);
  };

  window.card = {
    createCard: createCard
  };

})();
