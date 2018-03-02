'use strict';

(function () {
  var Pin = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var div = document.createElement('div');
  div.className = 'rendering-pins';

  window.similarMapPinTemplate = document.querySelector('template').content;
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');

  window.createMapPin = function (notice) {
    window.mapPin = window.similarMapPinTemplate.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = window.mapPin.querySelector('img');
    mapPinImg.src = notice.author.avatar;

    window.mapPin.style.left = notice.location.x + Pin.WIDTH / 2 + 'px';
    window.mapPin.style.top = notice.location.y + Pin.HEIGHT + 'px';

    return window.mapPin;
  };

  // рендерингов пинов
  window.render = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    mapPins.appendChild(div);
    var renderingPin = document.querySelector('.rendering-pins');
    renderingPin.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.createMapPin(data[i]));
      window.mapPin.setAttribute('id', window.notices.indexOf(data[i]));
    }
    renderingPin.appendChild(fragment);
    mapPins.appendChild(renderingPin);
  };
})();
