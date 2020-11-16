"use strict";

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);
  const main = document.querySelector(`main`);

  const XOFFSET = 32;
  const YOFFSET = 87;
  const MIN_BUNGALOW_COST = 0;
  const MIN_FLAT_COST = 1000;
  const MIN_HOUSE_COST = 5000;
  const MIN_PALACE_COST = 10000;
  const PALACE_ROOMS = 100;
  const MIN_NOT_PALACE_GUESTS = 1;

  const roomsNumber = document.querySelector(`#room_number`);
  const guests = document.querySelector(`#capacity`);
  const type = document.querySelector(`#type`);
  const price = document.querySelector(`#price`);
  const checkIn = document.querySelector(`#timein`);
  const checkOut = document.querySelector(`#timeout`);
  const form = document.querySelector(`.ad-form`);
  const title = document.querySelector(`#title`);
  const wifi = document.querySelector(`#feature-wifi`);
  const dishwasher = document.querySelector(`#feature-dishwasher`);
  const parking = document.querySelector(`#feature-parking`);
  const washer = document.querySelector(`#feature-washer`);
  const elevator = document.querySelector(`#feature-elevator`);
  const conditioner = document.querySelector(`#feature-conditioner`);
  const features = [wifi, dishwasher, parking, washer, elevator, conditioner];
  const description = document.querySelector(`#description`);

  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const inputs = document.querySelectorAll(`input`);
  const selects = document.querySelectorAll(`select`);
  const buttons = document.querySelectorAll(`button:not(.map__pin--main)`);
  const textareas = document.querySelectorAll(`textarea`);

  const getAddress = () => {
    const addressField = document.querySelector(`#address`);
    const mainPinX = Math.round(parseInt(mainPin.style.left.slice(0, -2), 10) + XOFFSET);
    const mainPinY = Math.round(parseInt(mainPin.style.top.slice(0, -2), 10) + YOFFSET);
    addressField.value = mainPinX + `, ` + mainPinY;
  };

  getAddress();

  const validateGuests = () => {
    switch (guests.value) {
      case "1": roomsNumber.value = 1;
        break;

      case "2": roomsNumber.value = 2;
        break;

      case "3": roomsNumber.value = 3;
        break;

      default: roomsNumber.value = 100;
        break;
    }
  };

  const validateRooms = () => {

    const roomsLessThanGuests = (roomsNumber.value < guests.value && roomsNumber.value < 100) || (guests.value < MIN_NOT_PALACE_GUESTS && roomsNumber.value < PALACE_ROOMS);
    if (roomsLessThanGuests) {
      (guests.value = roomsNumber.value);
    }

    const palaceRooms = (Number(roomsNumber.value) === PALACE_ROOMS);
    if (palaceRooms) {
      guests.value = 0;
    }
  };

  const validatePrice = () => {
    if (type.value === `bungalow`) {
      price.min = MIN_BUNGALOW_COST;
      price.placeholder = MIN_BUNGALOW_COST;
    }

    if (type.value === `flat`) {
      price.min = MIN_FLAT_COST;
      price.placeholder = MIN_FLAT_COST;
    }

    if (type.value === `house`) {
      price.min = MIN_HOUSE_COST;
      price.placeholder = MIN_HOUSE_COST;
    }

    if (type.value === `palace`) {
      price.min = MIN_PALACE_COST;
      price.placeholder = MIN_PALACE_COST;
    }
  };

  guests.addEventListener(`change`, function () {
    validateGuests();
  });

  roomsNumber.addEventListener(`change`, function () {
    validateRooms();
  });

  type.addEventListener(`change`, function () {
    validatePrice();
  });

  checkIn.addEventListener(`change`, function () {
    if (checkOut.value !== checkIn.value) {
      checkOut.value = checkIn.value;
    }
  });

  checkOut.addEventListener(`change`, function () {
    if (checkOut.value !== checkIn.value) {
      checkIn.value = checkOut.value;
    }
  });

  const closeMessage = function () {
    const messageSucess = document.querySelector(`.success`);
    const messageError = document.querySelector(`.error`);

    if (messageSucess) {
      main.removeChild(messageSucess);
    }
    if (messageError) {
      main.removeChild(messageError);
    }
    main.removeEventListener(`keydown`, onEscCloseMessage);
  };

  const onEscCloseMessage = function (evt) {
    if (window.util.checkEvtEscKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onClickAndEscCloseMessage = function () {
    main.addEventListener(`click`, closeMessage);
    main.addEventListener(`keydown`, onEscCloseMessage);
  };

  const showSuccessMessage = function () {
    const fragment = document.createDocumentFragment();
    const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

    const successMessage = successMessageTemplate.cloneNode(true);
    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    onClickAndEscCloseMessage();
  };

  let showErrorMessage = function () {
    const fragment = document.createDocumentFragment();
    const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

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
    title.value = ``;
    type.options[1].selected = true;
    price.value = ``;
    checkIn.options[0].selected = true;
    checkOut.options[0].selected = true;
    roomsNumber.options[0].selected = true;
    guests.options[2].selected = true;
    description.value = ``;
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.util.disableElement(inputs);
    window.util.disableElement(selects);
    window.util.disableElement(textareas);
    window.util.disableElement(buttons);

    window.filter.resetFilters();
    resetFeaturesInTheForm();

    if (document.querySelector(`.popup`)) {
      window.card.closePopUp();
    }

    window.pin.cleanAll();
    window.move.mainPin.style.left = `570px`;
    window.move.mainPin.style.top = `375px`;
    getAddress();
  };

  let submitHandler = function () {
    window.upload(new FormData(form),
        function () {
          form.classList.add(`ad-form--disabled`);
          clearForm();
          showSuccessMessage();
        },
        showErrorMessage
    );
  };

  let onFormSubmit = function (element, callback) {
    form.addEventListener(`submit`, function (evt) {
      evt.preventDefault();
      element.addEventListener(`click`, callback, {once: true});
      submitHandler();
    });
  };

  const resetButton = document.querySelector(`.ad-form__reset`);
  let listenToReset = function (element, callback) {
    resetButton.addEventListener(`click`, function () {
      clearForm();
      element.addEventListener(`click`, callback, {once: true});
    });
  };

  window.form = {
    getAddress,
    onFormSubmit,
    listenToReset,
  };

})();
