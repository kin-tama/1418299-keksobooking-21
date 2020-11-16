"use strict";
(function () {

  const getAllOffers = (data) => {
    window.filter.runFiltersAndPins(data);
    window.filter.onClickGetFilters(data);
  };

  window.data = {
    getAllOffers
  };

})();
