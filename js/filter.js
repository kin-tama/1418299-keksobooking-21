"use strict";
(function () {

  const MAX_PINS_ON_MAP = 5;

  const filtersForm = document.querySelector(`.map__filters`);

  const typeFilter = document.querySelector(`#housing-type`);
  const roomsFilter = document.querySelector(`#housing-rooms`);
  const priceFilter = document.querySelector(`#housing-price`);
  const guestsFilter = document.querySelector(`#housing-guests`);
  const wifi = document.querySelector(`#filter-wifi`);
  const dishwasher = document.querySelector(`#filter-dishwasher`);
  const parking = document.querySelector(`#filter-parking`);
  const washer = document.querySelector(`#filter-washer`);
  const elevator = document.querySelector(`#filter-elevator`);
  const conditioner = document.querySelector(`#filter-conditioner`);

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
    any: [0, 10000000000],
    low: [0, 9999],
    middle: [10000, 49999],
    high: [50000, 1000000]
  };

  const compareElementToTheFilterValue = (filterName, element, valueType) => (filterName.value === element.offer[valueType].toString() || filterName.value === `any`);

  const comparePriceToTheFilter = (element) => ((element.offer.price > filterValues[priceFilter.value][0]) && (element.offer.price < filterValues[priceFilter.value][1]));

  const compareFeaturesToAllCheckboxes = (element, filtersArray) => {
    let check = true;
    for (let i = 0; i < filtersArray.length; i++) {
      check = ((filtersArray[i].checked && element.offer.features.includes(filtersArray[i].value) || !filtersArray[i].checked));
      if (!check) {
        break;
      }
    }
    return check;
  };

  const runFiltersAndPins = (object) => {
    window.card.closePopUp();
    window.pin.cleanAll();

    let counter = 0;
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < object.length; i++) {
      if (!(!object[i].offer || !compareElementToTheFilterValue(typeFilter, object[i], `type`) || !comparePriceToTheFilter(object[i]) || !compareElementToTheFilterValue(roomsFilter, object[i], `rooms`) || !compareElementToTheFilterValue(guestsFilter, object[i], `guests`) || !compareFeaturesToAllCheckboxes(object[i], filterFeatures))) {
        fragment.appendChild(window.pin.create(object[i], i));
        counter++;
      }

      if (counter === MAX_PINS_ON_MAP) {
        break;
      }
    }
    window.card.mapPins.appendChild(fragment);
  };

  const onClickGetFilters = (info) => {
    filtersForm.addEventListener(`change`, () => runFiltersAndPins(info));
  };

  const resetFilters = () => {
    filters.forEach((filter) => (filter.options[0].selected = true));
    filterFeatures.forEach((filterFeature) => (filterFeature.checked = false));
  };

  window.filter = {
    runFiltersAndPins,
    resetFilters,
    onClickGetFilters
  };

})();

