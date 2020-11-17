"use strict";
(()=> {

  const getAllOffers = (data) => {
    window.filter.runAll(data);
    window.filter.onClickGetFilters(data);
  };

  window.data = {
    getAllOffers
  };

})();
