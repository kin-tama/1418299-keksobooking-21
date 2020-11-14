"use strict";

(function () {

  const mainPin = document.querySelector(".map__pin--main");
  const main = document.querySelector("main");

  const XOFFSET = 32;
  const YOFFSET = 87;
  const MIN_BUNGALOW_COST = 0;
  const MIN_FLAT_COST = 1000;
  const MIN_HOUSE_COST = 5000;
  const MIN_PALACE_COST = 10000;
  const PALACE_ROOMS = 100;
  const MIN_NOT_PALACE_GUESTS = 1;

  const roomsNumber = document.querySelector("#room_number");
  const guests = document.querySelector("#capacity");
  const type = document.querySelector("#type");
  const price = document.querySelector("#price");
  const checkIn = document.querySelector("#timein");
  const checkOut = document.querySelector("#timeout");
  const form = document.querySelector(".ad-form");
  const title = document.querySelector("#title");
  const wifi = document.querySelector("#feature-wifi");
  const dishwasher = document.querySelector("#feature-dishwasher");
  const parking = document.querySelector("#feature-parking");
  const washer = document.querySelector("#feature-washer");
  const elevator = document.querySelector("#feature-elevator");
  const conditioner = document.querySelector("#feature-conditioner");
  const features = [wifi, dishwasher, parking, washer, elevator, conditioner];
  const description = document.querySelector("#description");

  const map = document.querySelector(".map");
  const adForm = document.querySelector(".ad-form");
  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  const buttons = document.querySelectorAll("button:not(.map__pin--main)");
  const textareas = document.querySelectorAll("textarea");

  const getAddress = function () {
    const addressField = document.querySelector("#address");
    const mainPinX = Math.round(parseInt(mainPin.style.left.slice(0, -2), 10) + XOFFSET);
    const mainPinY = Math.round(parseInt(mainPin.style.top.slice(0, -2), 10) + YOFFSET);
    addressField.value = mainPinX + ", " + mainPinY;
  };

  getAddress();

  const guestsValidator = function () {
    if (guests.value < MIN_NOT_PALACE_GUESTS) {
      roomsNumber.value = PALACE_ROOMS;
    } else if (guests.value > roomsNumber.value && guests.value > 0) {
      roomsNumber.value = guests.value;
    }
  };

  const roomsValidator = function () {

    if (roomsNumber.value < guests.value && roomsNumber.value < 100) {
      guests.value = roomsNumber.value;
    }

    if (roomsNumber.value > (PALACE_ROOMS - 1)) {
      guests.value = 0;
    }

    if (guests.value < MIN_NOT_PALACE_GUESTS && roomsNumber.value < PALACE_ROOMS) {
      guests.value = roomsNumber.value;
    }
  };

  const priceValidator = function () {
    if (type.value === "bungalow") {
      price.min = MIN_BUNGALOW_COST;
      price.placeholder = MIN_BUNGALOW_COST;
    }

    if (type.value === "flat") {
      price.min = MIN_FLAT_COST;
      price.placeholder = MIN_FLAT_COST;
    }

    if (type.value === "house") {
      price.min = MIN_HOUSE_COST;
      price.placeholder = MIN_HOUSE_COST;
    }

    if (type.value === "palace") {
      price.min = MIN_PALACE_COST;
      price.placeholder = MIN_PALACE_COST;
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

  const closeMessage = function () {
    const messageSucess = document.querySelector(".success");
    const messageError = document.querySelector(".error");

    if (messageSucess) {
      main.removeChild(messageSucess);
    }
    if (messageError) {
      main.removeChild(messageError);
    }
    main.removeEventListener("keydown", onEscCloseMessage);
  };

  const onEscCloseMessage = function (evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onClickAndEscCloseMessage = function () {
    main.addEventListener("click", closeMessage);
    main.addEventListener("keydown", onEscCloseMessage);
  };

  const showSuccessMessage = function () {
    const fragment = document.createDocumentFragment();
    const successMessageTemplate = document.querySelector("#success").content.querySelector(".success");

    const successMessage = successMessageTemplate.cloneNode(true);
    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    onClickAndEscCloseMessage();
  };

  let showErrorMessage = function () {
    const fragment = document.createDocumentFragment();
    const errorMessageTemplate = document.querySelector("#error").content.querySelector(".error");

    let errorMessage = errorMessageTemplate.cloneNode(true);
    fragment.appendChild(errorMessage);
    main.appendChild(fragment);

    onClickAndEscCloseMessage();
  };

  const resetFeaturesInTheForm = function () {
    features.forEach((feature) => {
      feature.checked = false;
    });
  };

  const clearForm = function () {
    title.value = "";
    type.options[1].selected = true;
    price.value = "";
    checkIn.options[0].selected = true;
    checkOut.options[0].selected = true;
    roomsNumber.options[0].selected = true;
    guests.options[2].selected = true;
    description.value = "";
    map.classList.add("map--faded");
    adForm.classList.add("ad-form--disabled");
    window.util.disableElement(inputs);
    window.util.disableElement(selects);
    window.util.disableElement(textareas);
    window.util.disableElement(buttons);

    window.filter.resetFilters();
    resetFeaturesInTheForm();
    window.pin.cleanAll();

    if (document.querySelector(".popup")) {
      window.card.closePopUp();
    }

    window.move.mainPin.style.left = "570px";
    window.move.mainPin.style.top = "375px";
    getAddress();

  };

  let submitHandler = function (evt) {
    window.upload(new FormData(form),
        function () {
          form.classList.add("ad-form--disabled");
          clearForm();
          showSuccessMessage();
        },
        showErrorMessage
    );
    evt.preventDefault();
  };

  let listenToTheFormSubmit = function (element, callback) {
    form.addEventListener("submit", function () {
      submitHandler();
      element.addEventListener("click", callback, {once: true});
    });
  };

  const resetButton = document.querySelector(".ad-form__reset");
  let listenToReset = function (element, callback) {
    resetButton.addEventListener("click", function () {
      clearForm();
      element.addEventListener("click", callback, {once: true});
    });
  };

  window.form = {
    getAddress: getAddress,
    listenToTheFormSubmit: listenToTheFormSubmit,
    listenToReset: listenToReset,
  };

})();
