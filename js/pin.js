'use strict';

(function () {
  var Pin = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var similarMapPinTemplate = document.querySelector('template').content;
  var mapPins = document.querySelector('.map__pins');

  var fragment = document.createDocumentFragment();
  var pinsBlock = document.createElement('div');

  pinsBlock.className = 'rendering-pins';

  var createPin = function (notice) {
    window.mapPin = similarMapPinTemplate.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = window.mapPin.querySelector('img');
    mapPinImg.src = notice.author.avatar;

    window.mapPin.style.left = notice.location.x + Pin.WIDTH / 2 + 'px';
    window.mapPin.style.top = notice.location.y + Pin.HEIGHT + 'px';

    return window.mapPin;
  };

  // рендерингов пинов
  var renderPin = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    mapPins.appendChild(pinsBlock);
    var renderingPin = document.querySelector('.rendering-pins');
    renderingPin.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPin(data[i]));
      window.mapPin.setAttribute('id', window.data.notices.indexOf(data[i]));
    }
    renderingPin.appendChild(fragment);
    mapPins.appendChild(renderingPin);
  };

  window.pin = {
    similarMapPinTemplate: similarMapPinTemplate,
    render: renderPin
  };
})();
