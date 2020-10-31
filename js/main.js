"use strict";

const ADS_NUMBER = 8;

// блокировка-разблокировка

const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const buttons = document.querySelectorAll("button");
const textareas = document.querySelectorAll("textarea");
const map = document.querySelector(".map");
const mainPin = document.querySelector(".map__pin--main");

window.util.disableElement(inputs);
window.util.disableElement(selects);
window.util.disableElement(textareas);
window.util.disableElement(buttons);

mainPin.addEventListener("click", function (evt) {
  if (evt.button === 0) {
    map.classList.remove("map--faded");
    window.util.enableElement(inputs);
    window.util.enableElement(selects);
    window.util.enableElement(textareas);
    window.util.enableElement(buttons);
    window.form.getAddress();
  }
});

// находим куда вставлять
// const mapPins = document.querySelector(".map__pins");

// создаем пины и карточки

for (let i = 0; i < ADS_NUMBER; i++) {
  let newAdv = window.util.getNewAdv(i);
  window.pin.createPin(newAdv);
  window.card.createCard(newAdv);
}

// mapPins.appendChild(fragment);
// mapPins.appendChild(fragmentTwo);

