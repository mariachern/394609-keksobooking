'use strict';

(function () {
  var NOTICE_DATA = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPES: ['flat', 'house', 'bungalo'],
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PICTURES: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  window.NOTICE_COUNTER = 8;

  window.notices = [];

  var randomize = {
    features: function () {
      var featuresCounter = Math.ceil(Math.random() * NOTICE_DATA.FEATURES.length);
      var randomFeaturesArray = NOTICE_DATA.FEATURES.slice(0, featuresCounter);
      return randomFeaturesArray;
    },
    element: function (array) {
      var value = Math.floor(Math.random() * array.length);
      return array[value];
    },
    number: function (min, max) {
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      return number;
    }
  };

  var shuffleArray = function () {
    return Math.random() - 0.5;
  };

  // объект
  for (var i = 0; i < window.NOTICE_COUNTER; i++) {
    var coordX = randomize.number(300, 900);
    var coordY = randomize.number(150, 500);

    var randomNotice = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: NOTICE_DATA.TITLES[i],
        address: coordX + ' , ' + coordY,
        price: randomize.number(1000, 1000000),
        type: randomize.element(NOTICE_DATA.TYPES),
        rooms: randomize.number(1, 5),
        guests: randomize.number(1, 10),
        checkin: randomize.element(NOTICE_DATA.TIMES),
        checkout: randomize.element(NOTICE_DATA.TIMES),
        features: randomize.features(),
        description: '',
        pictures: NOTICE_DATA.PICTURES.slice().sort(shuffleArray)
      },
      location: {
        x: coordX,
        y: coordY
      }
    };
    window.notices.push(randomNotice);
  }
})();
