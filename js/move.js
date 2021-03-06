"use strict";

(()=> {
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinHeight = Number(window.getComputedStyle(mainPin).height.slice(0, -2));
  const mainPinWidth = Number(window.getComputedStyle(mainPin).width.slice(0, -2));
  const mainPinTailHeight = 22;
  const maxXAddresCoords = 1200;
  const minXAddresCoords = 0;
  const maxYAddresCoords = 630;
  const minYAddresCoords = 130;

  const MINY = Math.round(minYAddresCoords - mainPinHeight - mainPinTailHeight);
  const MAXY = Math.round(maxYAddresCoords - mainPinHeight - mainPinTailHeight);
  const MINX = Math.round(minXAddresCoords - mainPinWidth / 2);
  const MAXX = Math.round(maxXAddresCoords - mainPinWidth / 2);

  let Pin = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {

      const shift = {
        shiftX: startCoords.x - moveEvt.clientX,
        shiftY: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.left = `${(mainPin.offsetLeft - shift.shiftX)}px`;
      mainPin.style.top = `${(mainPin.offsetTop - shift.shiftY)}px`;

      const currentYCoordinates = Math.round(parseInt(mainPin.style.top.slice(0, -2), 10));
      const currentXCoordinates = Math.round(parseInt(mainPin.style.left.slice(0, -2), 10));

      if (currentYCoordinates > MAXY) {
        mainPin.style.top = `${MAXY}px`;
      }

      if (currentYCoordinates < MINY) {
        mainPin.style.top = `${MINY}px`;
      }

      if (currentXCoordinates > MAXX) {
        mainPin.style.left = `${MAXX}px`;
      }

      if (currentXCoordinates < MINX) {
        mainPin.style.left = `${MINX}px`;
      }

      window.form.getAddress();
    };

    const onMouseup = () => {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseup);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseup);
  };

  const onClickPin = () => {
    mainPin.addEventListener(`mousedown`, Pin);
  };

  window.move = {
    Pin,
    onClickPin,
    mainPin
  };

})();
