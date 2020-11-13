"use strict";
(function () {

  const MAX_PINS_ON_MAP = 5;

  const filtersForm = document.querySelector(".map__filters");

  const typeFilter = document.querySelector("#housing-type");
  const roomsFilter = document.querySelector("#housing-rooms");
  const priceFilter = document.querySelector("#housing-price");
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

  const compareElementToTheFilterValue = function (filterName, element, valueType) {
    return (filterName.value === element.offer[valueType].toString() || filterName.value === "any")
  };

  const comparePriceToTheFilter = function (element) {
    return ((element.offer.price > filterValues[priceFilter.value][0]) && (element.offer.price < filterValues[priceFilter.value][1]))
  };

  const compareFeaturesToAllCheckboxes = function (element, filtersArray) {
    let check;
    for (let i = 0; i < filtersArray.length; i++) {
      if (filtersArray[i].checked && element.offer.features.includes(filtersArray[i].value) || !filtersArray[i].checked) {
        check = true;
      } else {
        check = false;
        break
      }
    }
    return check;
  };

  const runFiltersAndPins = function (object) {
    window.pin.cleanAll();
    window.card.closePopUp();

    let counter = 0;
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < object.length; i++) {
      if (!(!compareElementToTheFilterValue(typeFilter, object[i], "type") || !comparePriceToTheFilter(object[i]) || !compareElementToTheFilterValue(roomsFilter, object[i], "rooms") || !compareElementToTheFilterValue(guestsFilter, object[i], "guests") || !compareFeaturesToAllCheckboxes(object[i], filterFeatures))) {
        fragment.appendChild(window.pin.create(object[i], i));
        counter ++;
      }

      if (counter === MAX_PINS_ON_MAP) {
        break;
      }
    }

    window.card.mapPins.appendChild(fragment);

  };

  const onClickGetFilters = function () {

    filtersForm.addEventListener("change", function () {
      runFiltersAndPins(window.data.allOffers);
    });
  };

  const resetFilters = function () {
    filters.forEach(filter => {
      filter.options[0].selected = true;
    })

    filterFeatures.forEach(filterFeature => {
      filterFeature.checked = false;
    })
  };

  window.filter = {
    runFiltersAndPins: runFiltersAndPins,
    resetFilters: resetFilters,
    onClickGetFilters: onClickGetFilters
  };

})();

