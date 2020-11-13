"use strict";

const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const buttons = document.querySelectorAll("button:not(.map__pin--main)");
const textareas = document.querySelectorAll("textarea");
const map = document.querySelector(".map");
const mainPin = document.querySelector(".map__pin--main");
const adForm = document.querySelector(".ad-form");

window.util.disableElement(inputs);
window.util.disableElement(selects);
window.util.disableElement(textareas);
window.util.disableElement(buttons);

mainPin.addEventListener("click", function (evt) {
  if (evt.button === 0) {
    map.classList.remove("map--faded");
    adForm.classList.remove("ad-form--disabled");
    window.util.enableElement(inputs);
    window.util.enableElement(selects);
    window.util.enableElement(textareas);
    window.util.enableElement(buttons);
    window.filter.runFiltersAndPins(window.data.allOffers);
    window.filter.onClickGetFilters()
    window.card.onClickAndEscClosePopUp();
    window.move.pin();
    window.form.getAddress();
    window.form.listenToTheFormSubmit();
    window.form.listenToReset();
  }
}, {once: true});
