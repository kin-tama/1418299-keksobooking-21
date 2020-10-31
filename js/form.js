"use strict";

(function () {

  const mainPin = document.querySelector(".map__pin--main");

  // функция заполнения поля адреса

  const XOFFSET = 20;
  const YOFFSET = 22;

  const addressField = document.querySelector("#address");
  let mainPinX = Math.round(parseInt(mainPin.style.left.slice(0, 3), 10) + XOFFSET);
  let mainPinY = Math.round(parseInt(mainPin.style.top.slice(0, 3), 10) + YOFFSET);

  const getAddress = function () {
    addressField.value = mainPinX + ", " + mainPinY;
  };

  getAddress();

  // валидатор гостей и комнат

  const roomsNumber = document.querySelector("#room_number");
  const guests = document.querySelector("#capacity");

  const guestsValidator = function () {
    if (guests.value < 1) {
      roomsNumber.value = 100;
    } else if (guests.value > roomsNumber.value && guests.value > 0) {
      roomsNumber.value = guests.value;
    }
  };

  const roomsValidator = function () {
    if (roomsNumber.value < guests.value && roomsNumber.value < 100) {
      guests.value = roomsNumber.value;
    }

    if (roomsNumber.value > 99) {
      guests.value = 0;
    }

    if (guests.value < 1 && roomsNumber.value < 100) {
      guests.value = roomsNumber.value;
    }
  };

  guests.addEventListener("change", function () {
    guestsValidator();
  });

  roomsNumber.addEventListener("change", function () {
    roomsValidator();
  });


  window.form = {
    getAddress: getAddress
  };

})();
