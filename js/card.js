"use strict";

(function () {
  const ApartsTranslation = {
    flat: "Квартира",
    bungalow: "Бунгало",
    house: "Дом",
    palace: "Дворец"
  };

  const mapPins = document.querySelector(".map__pins");

  const create = function (object) {
    const fragment = document.createDocumentFragment();
    const cardTemplate = document.querySelector("#card").content.querySelector(".popup");
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".popup__title").textContent = object.offer.title;
    cardElement.querySelector(".popup__text--address").textContent = object.offer.address;
    cardElement.querySelector(".popup__text--price").textContent = object.offer.price + "₽/ночь";
    cardElement.querySelector(".popup__type").textContent = ApartsTranslation[object.offer.type];
    cardElement.querySelector(".popup__text--capacity").textContent = object.offer.rooms + " комнаты для " + object.offer.guests + " гостей";
    cardElement.querySelector(".popup__text--time").textContent = "заезд после " + object.offer.checkin + ", выезд до " + object.offer.checkout;
    cardElement.querySelector(".popup__features").textContent = String(object.offer.features);
    cardElement.querySelector(".popup__description").textContent = object.offer.description;
    cardElement.querySelector(".popup__avatar").src = object.author.avatar;

    const popupPhotos = cardElement.querySelector(".popup__photos");
    popupPhotos.removeChild(popupPhotos.querySelector(".popup__photo"));
    const photos = object.offer.photos;
    for (let i = 0; i < photos.length; i++) {
      const photo = document.createElement("img");
      photo.alt = "Фотография жилья";
      photo.height = 40;
      photo.width = 40;
      photo.classList.add("popup__photo");
      photo.src = photos[i];
      popupPhotos.appendChild(photo);
    }

    fragment.appendChild(cardElement);
    mapPins.appendChild(fragment);
  };

  const closePopUp = function () {
    const openedCard = document.querySelector(".popup");
      if (openedCard) {
      mapPins.removeChild(openedCard);
      document.removeEventListener("keydown", onPopUpEscPress);
    }
  };

  const onPopUpEscPress = function (evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closePopUp();
    }
  };

  const onClickAndEscClosePopUp = function () {
    const popUpClose = document.querySelector(".popup__close");
    if (popUpClose) {
      popUpClose.addEventListener("click", closePopUp, {once: true});
      document.addEventListener("keydown", onPopUpEscPress, {once: true});
    }
  };

  const show = function (element) {
    const oldCard = document.querySelector(".popup");
    if (mapPins.contains(oldCard)) {
      mapPins.removeChild(oldCard);
    }
    create(element);
    onClickAndEscClosePopUp();
  };


  window.card = {
    closePopUp: closePopUp,
    onClickAndEscClosePopUp: onClickAndEscClosePopUp,
    create: create,
    mapPins: mapPins,
    show: show
  };

})();
