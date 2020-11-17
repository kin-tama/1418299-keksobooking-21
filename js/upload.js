"use strict";

(()=> {

  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const StatusCode = {
    OK: 200
  };

  window.upload = (data, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

})();
