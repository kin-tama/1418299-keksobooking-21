"use strict";
(()=> {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  window.download = (onSuccess, onError) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status !== StatusCode.OK) {
        onError(`Никаких кексов сегодня. Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
      onSuccess(xhr.response);
      return (xhr.response);
    });

    xhr.addEventListener(`error`, () => onError(`Произошла ошибка соединения`));

    xhr.addEventListener(`timeout`, () => onError(`Слишком долго ждать. Запрос не успел выполниться за ${xhr.timeout} мс`));

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL);

    xhr.send();
  };

})();
