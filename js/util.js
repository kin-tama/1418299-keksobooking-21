"use strict";

(function () {

  const disableElement = function (arr) {
    arr.forEach(element => {
      element.disabled = true;
    });
  };

  const enableElement = function (arr) {
    arr.forEach(element => {
      element.disabled = false;
    });
  };

  const errorHandler = function (errorMessage) {
    let errorChild = document.createElement("div");
    errorChild.style = "z-index: 100; margin: auto; text-align: center; background-color: yellow; height: 200px; padding: 60px";
    errorChild.style.position = "absolute";
    errorChild.style.left = 0;
    errorChild.style.right = 0;
    errorChild.style.fontSize = "50px";
    errorChild.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", errorChild);
  };

  window.util = {
    disableElement: disableElement,
    enableElement: enableElement,
    errorHandler: errorHandler
  };

})();

