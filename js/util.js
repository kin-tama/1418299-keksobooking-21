"use strict";

(function () {

  const disableElement = (arr) => {
    arr.forEach((element) => {
      element.disabled = true;
    });
  };

  const enableElement = (arr) => {
    arr.forEach((element) => {
      element.disabled = false;
    });
  };

  const errorHandler = (errorMessage) => {
    let errorChild = document.createElement(`div`);
    errorChild.style = `z-index: 100; margin: auto; text-align: center; background-color: yellow; height: 200px; padding: 60px`;
    errorChild.style.position = `absolute`;
    errorChild.style.left = 0;
    errorChild.style.right = 0;
    errorChild.style.fontSize = `50px`;
    errorChild.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorChild);
  };

  const checkEvtEscKey = (evt) => (evt.key === `Escape`);

  window.util = {
    disableElement,
    enableElement,
    errorHandler,
    checkEvtEscKey
  };

})();

