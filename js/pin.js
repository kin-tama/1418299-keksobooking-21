"use strict";

(function () {

  let pinElement;
  let fragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");

  const create = function (object, index) {
    pinElement = pinTemplate.cloneNode(true);
    pinElement.style = "left:" + (object.location.x) + "px; top: " + (object.location.y) + "px;";
    pinElement.querySelector("img").src = object.author.avatar;
    pinElement.querySelector("img").alt = object.offer.title;
    pinElement.classList.add("pin__" + index);
    return pinElement;
  };

  window.pin = {
    create: create,
    fragment: fragment
  };
})();

