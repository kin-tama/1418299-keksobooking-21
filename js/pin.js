"use strict";

(function () {

  let pinElement;
  let fragment = document.createDocumentFragment();
  let allPins;
  let minorPins;

  const mapPins = document.querySelector(".map__pins");
  const pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");

  const createPin = function (object) {
    pinElement = pinTemplate.cloneNode(true);
    pinElement.style = "left:" + (object.location.x) + "px; top: " + (object.location.y) + "px;";
    pinElement.querySelector("img").src = object.author.avatar;
    pinElement.querySelector("img").alt = object.offer.title;
    fragment.appendChild(pinElement);
    mapPins.appendChild(fragment);
  };

  const findMinorPins = function () {
    allPins = document.querySelectorAll(".map__pin");
    for (let i = 0; i < (allPins.length - 1); i++) {
      minorPins[i] = allPins[i + 1];
    }
    return minorPins;
  };

  // error

  let errorHandler = function (errorMessage) {
    let errorChild = document.createElement("div");
    errorChild.style = "z-index: 100; margin: auto; text-align: center; background-color: yellow; height: 200px; padding: 60px";
    errorChild.style.position = "absolute";
    errorChild.style.left = 0;
    errorChild.style.right = 0;
    errorChild.style.fontSize = "50px";
    errorChild.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", errorChild);
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

  // открывашка карточек

  let getPinsListeners = function (pins, cards) {
    for (let i = 0; i < pins.length; i++) {
      onPinClickShowCard(pins, pins[i], cards);
    }
  };

  let onPinClickShowCard = function (pins, pin, cards) {
    pin.addEventListener("click", function () {
      let oldCard = document.querySelector(".popup");
      if (window.card.mapPins.contains(oldCard)) {
        window.card.mapPins.removeChild(oldCard);
      }
      window.card.createCard(cards[pins.indexOf(pin)]);
      onClickAndEscClosePopUp();
    });
  };

  const createCards = function (cards) {
    getPinsListeners(findMinorPins(), cards);
  };

  const getCardFromServer = function () {
    window.download(createCards);
  };

  const createPins = function (object) {
    minorPins = [];
    for (let i = 0; i < 5; i++) {
      createPin(object[i]);
    }
    allPins = document.querySelectorAll(".map__pin");
    findMinorPins();
  };

  const getPinsFromServer = function () {
    window.download(createPins, errorHandler);
  };

  window.pin = {
    createPins: createPins,
    minorPins: minorPins,
    findMinorPins: findMinorPins,
    getPinsFromServer: getPinsFromServer,
    getCardFromServer: getCardFromServer,
    onClickAndEscClosePopUp: onClickAndEscClosePopUp,
    closePopUp: closePopUp
  };
})();

