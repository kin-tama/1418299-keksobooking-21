"use strict";
(function () {

  const TYPES = ["palace", "flat", "house", "bungalow"];
  const TIMES = ["12:00", "13:00", "14:00"];
  const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const AUTHORS = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"];
  const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const XMIN = 0;
  const XMAX = 750;
  const YMIN = 130;
  const YMAX = 630;


  let getNewAdv = function (number) {
    return {
      author: {
        avatar: AUTHORS[number]
      },

      offer: {
        title: "Уютное гнездышко для молодоженов",
        address: window.util.getRandomInteger(0, 600) + ", " + window.util.getRandomInteger(0, 350),
        price: window.util.getRandomInteger(2000, 5000),
        type: TYPES[window.util.getRandomInteger(0, 3)],
        rooms: window.util.getRandomInteger(1, 3),
        guests: window.util.getRandomInteger(0, 2),
        checkin: TIMES[window.util.getRandomInteger(0, 2)],
        checkout: TIMES[window.util.getRandomInteger(0, 2)],
        features: window.util.getrandomArrey(FEATURES),
        description: "Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.",
        photos: window.util.getrandomArrey(PHOTOS)
      },

      location: {
        x: window.util.getRandomInteger(XMIN, XMAX),
        y: window.util.getRandomInteger(YMIN, YMAX)
      }
    };
  };

  window.data = {
    getNewAdv: getNewAdv,
  };
})();
