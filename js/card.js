"use strict";

(function () {
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
    let photos = object.offer.photos;
    for (let i = 0; i < photos.length; i++) {
      let photo = document.createElement("img");
      photo.alt = "Фотография жилья";
      photo.height = 40;
      photo.width = 40;
      photo.classList.add("popup__photo");
      photo.src = photos[i];
      popupPhotos.appendChild(photo);
    }

    fragmentTwo.appendChild(cardElement);
    mapPins.appendChild(fragmentTwo);
  };


  window.card = {
    createCard: createCard,
    mapPins: mapPins,
    apartsList: apartsList,
  };

})();
