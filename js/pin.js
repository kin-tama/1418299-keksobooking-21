"use strict";

(()=> {

  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

  const activatePin = (clickedPin) => {
    const recentActivePin = document.querySelector(`.map__pin--active`);
    if (recentActivePin) {
      recentActivePin.classList.remove(`map__pin--active`);
    }
    clickedPin.classList.add(`map__pin--active`);
  };

  const create = (object, index) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style = `left: ${(object.location.x - (PIN_WIDTH / 2))}px; top: ${(object.location.y - PIN_HEIGHT)}px;`;
    pinElement.querySelector(`img`).src = object.author.avatar;
    pinElement.querySelector(`img`).alt = object.offer.title;
    pinElement.classList.add(`pin__${index}`);
    pinElement.addEventListener(`click`, function () {
      window.card.show(object);
      activatePin(pinElement);
    });
    return pinElement;
  };

  const cleanAll = () => {
    const minorPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    minorPins.forEach((pin) => {
      pin.remove();
    });
  };

  window.pin = {
    create,
    cleanAll
  };
})();

