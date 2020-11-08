"use strict";
(function () {

  const typeFIlter = document.querySelector("#housing-type");
  const priceFIlter = document.querySelector("#housing-price");
  const roomsFIlter = document.querySelector("#housing-rooms");
  const guestsFIlter = document.querySelector("#housing-guests");
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
    typeFIlter,
    priceFIlter,
    roomsFIlter,
    guestsFIlter
  ];

  const filterValues = {
    any: [0, 1000000],
    low: [0, 9999],
    middle: [10000, 49999],
    high: [50000, 1000000]
  };
  const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

  const hidePins = function (i) {
    window.pin.findMinorPins()[i].classList.add("visually-hidden");
  };

  const showPins = function (i) {
    window.pin.findMinorPins()[i].classList.remove("visually-hidden");
  };

  const getTypeFilter = function () {
    for (let i = 0; i < 8; i++) {
      showPins(i);

      if (window.data.getNewAdv(i).offer.type !== typeFIlter.value) {
        hidePins(i);
      }

      if (typeFIlter.value === "any") {
        showPins(i);
      }
    }
  };

  const getPriceFilter = function () {
    let filterPriceMin = filterValues[priceFIlter.value][0];
    let filterPriceMax = filterValues[priceFIlter.value][1];

    for (let i = 0; i < 8; i++) {
      hidePins(i);

      if ((window.data.getNewAdv(i).offer.price > filterPriceMin) && (window.data.getNewAdv(i).offer.price < filterPriceMax)) {
        showPins(i);
      }
    }
  };

  // const getRoomsFilter = function () {
  //   for (let i = 0; i < 8; i++) {
  //     showPins(i);

  //     if (Number.parseInt(window.data.getNewAdv(i).offer.rooms) === Number.parseInt(roomsFIlter.value)) {
  //       hidePins(i);
  //     }

  //     if (roomsFIlter.value === "any") {
  //       showPins(i);
  //     }
  //   }
  // };

  // const getGuestsFilter = function () {
  //   for (let i = 0; i < 8; i++) {
  //     showPins(i);

  //     if (Number.parseInt(window.data.getNewAdv(i).offer.guests) === Number.parseInt(guestsFIlter.value)) {
  //       hidePins(i);
  //     }

  //     if (guestsFIlter.value === "any") {
  //       showPins(i);
  //     }
  //   }
  // };

  const getFeatureFilter = function (feature, checkbox) {

    for (let i = 0; i < 8; i++) {
      if (!window.data.getNewAdv(i).offer.features.includes(feature) && checkbox.checked) {
        hidePins(i);
      } else {
        (showPins(i));
      }
    }
  };

  const getFeaturesFilter = function () {
    for (let i = 0; i < filterFeatures.length; i++) {
      filterFeatures[i].addEventListener("change", function () {
        getFeatureFilter(FEATURES[i], filterFeatures[i]);
      });
    }
  };


  const getFilters = function () {
    typeFIlter.addEventListener("change", getTypeFilter);
    priceFIlter.addEventListener("change", getPriceFilter);
    // roomsFIlter.addEventListener("change", getRoomsFilter);
    // guestsFIlter.addEventListener("change", getGuestsFilter);
    getFeaturesFilter();
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

