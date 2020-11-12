"use strict";
(function () {

  const typeFilter = document.querySelector("#housing-type");
  const priceFilter = document.querySelector("#housing-price");
  const roomsFilter = document.querySelector("#housing-rooms");
  const guestsFilter = document.querySelector("#housing-guests");
  const wifi = document.querySelector("#filter-wifi");
  const dishwasher = document.querySelector("#filter-dishwasher");
  const parking = document.querySelector("#filter-parking");
  const washer = document.querySelector("#filter-washer");
  const elevator = document.querySelector("#filter-elevator");
  const conditioner = document.querySelector("#filter-conditioner");

  const filterFeatures = [
    wifi,
    dishwasher,
    parking,
    washer,
    elevator,
    conditioner
  ];

  const filters = [
    typeFilter,
    priceFilter,
    roomsFilter,
    guestsFilter
  ];

  const filterValues = {
    any: [0, 1000000000],
    low: [0, 10000],
    middle: [10000, 49999],
    high: [50000, 1000000]
  };

let runFilter = function (object) {
  let fineOffers = []
  let minorPins = document.querySelectorAll(".map__pin:not(.map__pin--main)")

  for (let pin of minorPins) {
    pin.remove();
  }

  for (let element of object) {
    let scores = [];

    if (element.offer.type !== typeFilter.value && typeFilter.value !== "any") {
      scores[0] = 0;
    } else {
      scores[0] = 1;
    }

    // Пытался писать условия с помощью тернарного оператора, но почему-то ничего не работает, хотя синтаксис вроде ок?

    // (element.offer.type !== typeFilter.value && typeFilter.value !== "any") ? (scores[0] = 0) : (scores[0] = 1);

    if ((element.offer.price < filterValues[priceFilter.value][0]) || (element.offer.price > filterValues[priceFilter.value][1])) {
      scores[1] = 0;
    } else {
      scores[1] = 1;
    }

    if (element.offer.rooms !== Number.parseInt(roomsFilter.value) && roomsFilter.value !== "any") {
      scores[2] = 0;
    } else {
      scores[2] = 1;
    }

    if (element.offer.guests !== Number.parseInt(guestsFilter.value) && guestsFilter.value !== "any") {
      scores[3] = 0;
    } else {
      scores[3] = 1;
    }


    let filterByCheckbox = function (checkbox, element, number) {
      if (checkbox.checked && element.offer.features.includes(checkbox.value) || !checkbox.checked) {
        scores[number] = 1;
      } else {
        scores[number] = 0;
      }
    }

    filterByCheckbox (wifi, element, 4);
    filterByCheckbox (dishwasher, element, 5);
    filterByCheckbox (parking, element, 6);
    filterByCheckbox (washer, element, 7);
    filterByCheckbox (elevator, element, 8);
    filterByCheckbox (conditioner, element, 9);

    if (!scores.includes(0)) {
      fineOffers.push(element);
    }

    if (fineOffers.length === window.map.MAX_PINS_ON_MAP) {
      break;
    }

  }
  window.map.createPins(fineOffers);
}

const filtersForm = document.querySelector(".map__filters");

const getFilters = function () {
  filtersForm.addEventListener("change", function () {
    window.download(runFilter);
  })
};

const getFiltersAsTheyWere = function () {
  for (let filter of filters) {
    filter.options[0].selected = true;
  }

  for (let filterFeature of filterFeatures) {
    filterFeature.checked = false;
  }
};

  window.filter = {
    getFilters: getFilters,
    getFiltersAsTheyWere: getFiltersAsTheyWere
  };

})();

