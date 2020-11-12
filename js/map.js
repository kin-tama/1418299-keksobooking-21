"use strict";

(function () {
  const MAX_PINS_ON_MAP = 5;

  const closePopUp = function () {
    let openedCard = document.querySelector(".popup");
    window.card.mapPins.removeChild(openedCard);
    document.removeEventListener("keydown", onPopUpEscPress);
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

  const showCard = function (element) {
    let oldCard = document.querySelector(".popup");
    if (window.card.mapPins.contains(oldCard)) {
      window.card.mapPins.removeChild(oldCard);
    }
    window.card.create(element);
    onClickAndEscClosePopUp();
  };

  const createPins = function (object) {
    for (let i = 0; i < object.length; i++) {
      let fragment = document.createDocumentFragment();
      fragment.appendChild(window.pin.create(object[i], i));
      window.card.mapPins.appendChild(fragment);

      let currentPin = document.querySelector(".pin__" + i);
      currentPin.addEventListener("click", function () {
        showCard(object[i]);
      });
      if (i > (MAX_PINS_ON_MAP - 2)) {
        break;
      }
    }
  };

  const getPinsFromServer = function () {
    window.download(createPins, window.util.errorHandler);
  };

  window.map = {
    onClickAndEscClosePopUp: onClickAndEscClosePopUp,
    closePopUp: closePopUp,
    getPinsFromServer: getPinsFromServer,
    createPins: createPins,
    MAX_PINS_ON_MAP: MAX_PINS_ON_MAP
  };

})();


