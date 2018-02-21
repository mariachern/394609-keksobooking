'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var counter = 0;

  window.similarMapPinTemplate = document.querySelector('template').content;

  window.renderMapPin = function (notice) {
    var mapPin = window.similarMapPinTemplate.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.src = notice.author.avatar;
    mapPin.setAttribute('id', counter);

    mapPin.style.left = notice.location.x + PIN_WIDTH / 2 + 'px';
    mapPin.style.top = notice.location.y + PIN_HEIGHT + 'px';

    counter++;
    return mapPin;
  };
})();
