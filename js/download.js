"use strict";
(function () {
  const URL = "https://21.javascript.pages.academy/keksobooking/data";
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  window.download = function (onSuccess, onError) {

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        return (xhr.response);
      } else {
        onError("Никаких кексов сегодня. Статус ответа: " + xhr.status + " " + xhr.statusText);
      }
    });

    xhr.addEventListener("error", function () {
      onError("Произошла ошибка соединения");
    });

    xhr.addEventListener("timeout", function () {
      onError("Слишком долго ждать. Запрос не успел выполниться за " + xhr.timeout + "мс");
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open("GET", URL);

    xhr.send();
  };

})();
