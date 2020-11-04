"use strict";

(function () {
  const MINY = 130;
  const MAXY = 630;
  const MINX = 0;
  const MAXX = 1200 - 80;
  const Y_OFFSET = 40;
  const mainPin = document.querySelector(".map__pin--main");

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
      }

      mainPin.style.left = startCoords.x - shift.shiftX + "px";
      mainPin.style.top = startCoords.y - shift.shiftY + "px";

      // mainPin.style.left = mainPin.offsetTop - shift.shiftX + "px";
      // mainPin.style.top = mainPin.offsetLeft - shift.shiftY + "px";

      if ((startCoords.y - shift.shiftY) > MAXY) {
        mainPin.style.top = MAXY - Y_OFFSET + "px";
      }

      if ((startCoords.y - shift.shiftY) < MINY) {
        mainPin.style.top = MINY - Y_OFFSET + "px";
      }

      if ((startCoords.x - shift.shiftX) > MAXX) {
        mainPin.style.left = MAXX + "px";
      }

      if ((startCoords.x - shift.shiftX) < MINX) {
        mainPin.style.left = MINX + "px";
      }

    }

    let onMouseup = function (upEvt) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseup);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseup);

  })

  };

  window.move = {
    movePin: movePin
  };

})();
