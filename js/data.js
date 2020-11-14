"use strict";
(function () {

  const getAllOffers = function (data) {
    window.data = {
      allOffers: data
    };
  };

  window.download(getAllOffers, window.util.errorHandler);

})();
