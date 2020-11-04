"use strict";

(function () {

  const XOFFSET = 20;
  const YOFFSET = 22;

  let pinElement;
  let fragment = document.createDocumentFragment();
  let allPins;
  let minorPins;

  // находим что вставлять
  const mapPins = document.querySelector(".map__pins");
  const pinTemplate = document.querySelector("#pin").content.querySelector('.map__pin');

  const createPin = function (object) {
    pinElement = pinTemplate.cloneNode(true);
    pinElement.style = "left:" + (object.location.x + XOFFSET) + "px; top: " + (object.location.y + YOFFSET) + "px;";
    pinElement.querySelector("img").src = object.author.avatar;
    pinElement.querySelector("img").alt = object.offer.title;
    fragment.appendChild(pinElement);
    mapPins.appendChild(fragment);
  };

  const createPins = function (amount, object) {
    minorPins = [];
    for (let i = 0; i < amount; i++) {
      createPin(object(i));
    }

    allPins = document.querySelectorAll(".map__pin");

    for (let i = 0; i < (allPins.length - 1); i++) {
      minorPins[i] = allPins[i + 1];
    }
  };

  // закрывашка карточек

  const closePopUp = function () {
    let openedCard = document.querySelector(".popup");
    mapPins.removeChild(openedCard);
  };

  const onPopUpEscPress = function (evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closePopUp();
    }
  };

  const onClickAndEscClosePopUp = function () {
    let popUpClose = document.querySelector(".popup__close");
    if (popUpClose) {
      popUpClose.addEventListener("click", closePopUp, {once: true});
      document.addEventListener("keydown", onPopUpEscPress, {once: true});
    }
  };

  // открывашка карточек по пину
  let findPin = function (pin, card) {
    pin.addEventListener("click", function () {
      let oldCard = document.querySelector(".popup");
      if (window.card.mapPins.contains(oldCard)) {
        window.card.mapPins.removeChild(oldCard);
      }
      window.card.mapPins.appendChild(card);
      onClickAndEscClosePopUp();
    });
  };

  let showCard = function () {
    for (let i = 0; i < 8; i++) {
      findPin(minorPins[i], window.card.allCards[i]);
    }
  };

  window.pin = {
    createPins: createPins,
    showCard: showCard,
    minorPins: minorPins
  };
})();

