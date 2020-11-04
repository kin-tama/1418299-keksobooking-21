"use strict";

(function () {
  const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const apartsList = {
    flat: "Квартира",
    bungalow: "Бунгало",
    house: "Дом",
    palace: "Дворец"
  };

  let cardElement;
  let cardTemplate = document.querySelector("#card").content.querySelector(".popup");
  let popupPhotos;
  const mapPins = document.querySelector(".map__pins");
  let fragmentTwo = document.createDocumentFragment();

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
    popupPhotos.removeChild(popupPhotos.querySelector(".popup__photo"));
    for (let i = 0; i < PHOTOS.length; i++) {
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

  let createCards = function () {
    for (let i = 0; i < 8; i++) {
      createCard(window.data.getNewAdv(i));
    }
  };

  createCards();

  let allCards = fragmentTwo.querySelectorAll(".popup");

  window.card = {
    allCards: allCards,
    mapPins: mapPins,
  };

})();
