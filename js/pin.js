"use strict";

(function () {


  const create = function (object, index) {
    const pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style = "left:" + (object.location.x) + "px; top: " + (object.location.y) + "px;";
    pinElement.querySelector("img").src = object.author.avatar;
    pinElement.querySelector("img").alt = object.offer.title;
    pinElement.classList.add("pin__" + index);
    pinElement.addEventListener("click", function () {
    window.card.show(object);
    });
    return pinElement;
  };

  const cleanAll = function () {
    const minorPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");
    minorPins.forEach(pin => {
      pin.remove();
    })
  };

  window.pin = {
    create: create,
    cleanAll: cleanAll
  };
})();

