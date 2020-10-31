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

  // валидаторы

  const roomsNumber = document.querySelector("#room_number");
  const guests = document.querySelector("#capacity");
  const type = document.querySelector("#type");
  const price = document.querySelector("#price");
  const checkIn = document.querySelector("#timein");
  const checkOut = document.querySelector("#timeout");

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

  const priceValidator = function () {
    if (type.value === "bungalow") {
      price.min = 0;
    }

    if (type.value === "flat") {
      price.min = 1000;
    }

    if (type.value === "house") {
      price.min = 5000;
    }

    if (type.value === "palace") {
      price.min = 10000;
    }
  };

  guests.addEventListener("change", function () {
    guestsValidator();
  });

  roomsNumber.addEventListener("change", function () {
    roomsValidator();
  });

  type.addEventListener("change", function () {
    priceValidator();
  });

  checkIn.addEventListener("change", function () {
    if (checkOut.value !== checkIn.value) {
      checkOut.value = checkIn.value;
    }
  });

  checkOut.addEventListener("change", function () {
    if (checkOut.value !== checkIn.value) {
      checkIn.value = checkOut.value;
    }
  });

  window.form = {
    getAddress: getAddress
  };

})();
