"use strict";

(function () {
  const MINY = 130;
  const MAXY = 630;
  const X_OFFSET = 20;
  const Y_OFFSET = 40;
  const mainPin = document.querySelector(".map__pin--main");

  const changeAddress = function () {
    const addressField = document.querySelector("#address");
    let mainPinX = Math.round(parseInt(mainPin.style.left.slice(0, -2), 10) + X_OFFSET);
    let mainPinY = Math.round(parseInt(mainPin.style.top.slice(0, -2), 10) + Y_OFFSET);
    addressField.value = mainPinX + ", " + mainPinY;
  };

  const movePin = function () {
    mainPin.addEventListener("mousedown", function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let onMouseMove = function (moveEvt) {

        let shift = {
          shiftX: startCoords.x - moveEvt.clientX,
          shiftY: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.left = mainPin.offsetLeft - shift.shiftX + "px";
        mainPin.style.top = mainPin.offsetTop - shift.shiftY + "px";

        if ((startCoords.y - shift.shiftY) > MAXY) {
          mainPin.style.top = MAXY - Y_OFFSET + "px";
        }

        if ((startCoords.y - shift.shiftY) < MINY) {
          mainPin.style.top = MINY - Y_OFFSET + "px";
        }

        changeAddress();
      };

      let onMouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseup);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseup);
    });
  };

  window.move = {
    movePin: movePin
  };

})();
