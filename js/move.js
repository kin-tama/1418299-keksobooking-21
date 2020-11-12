"use strict";

(function () {
  const MINY = 103;
  const MAXY = 543;
  const MINX = -32;
  const MAXX = 1168;

  const mainPin = document.querySelector(".map__pin--main");

  const pin = function () {
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

        let currentYCoordinates = Math.round(parseInt(mainPin.style.top.slice(0, -2), 10));
        let currentXCoordinates = Math.round(parseInt(mainPin.style.left.slice(0, -2), 10));

        if (currentYCoordinates > MAXY) {
          mainPin.style.top = MAXY + "px";
        }

        if (currentYCoordinates < MINY) {
          mainPin.style.top = MINY + "px";
        }

        if (currentXCoordinates > MAXX) {
          mainPin.style.left = MAXX + "px";
        }

        if (currentXCoordinates < MINX) {
          mainPin.style.left = MINX + "px";
        }

        window.form.getAddress();
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
    pin: pin,
    mainPin: mainPin
  };

})();
