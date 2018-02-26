'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_TAIL = 20;

  var map = document.querySelector('.map');

  var mapPins = document.querySelector('.map__pins');

  var mainMapPin = mapPins.querySelector('.map__pin--main');

  var mapFilters = document.querySelector('.map__filters-container');

  var coordsRange = {
    y: {
      start: 375,
      min: 120,
      max: 650
    },
    x: {
      start: 600,
      min: 0,
      max: mapPins.offsetWidth
    }
  };

  // заполнение поля адреса
  var mainPinX = mainMapPin.offsetLeft;
  var mainPinY = mainMapPin.offsetTop;
  var noticeAddress = document.getElementsByName('address')[0];
  noticeAddress.value = mainPinX + ' , ' + mainPinY;

  window.setAddress = function () {
    noticeAddress.setAttribute('readonly', 'readonly');
    mainPinX = mainMapPin.offsetLeft;
    mainPinY = mainMapPin.offsetTop + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TAIL;
    noticeAddress.value = mainPinX + ' , ' + mainPinY;
  };

  var resetAddress = function () {
    mainPinX = coordsRange.x.start;
    mainPinY = coordsRange.y.start;
    mainMapPin.style.left = mainPinX + 'px';
    mainMapPin.style.top = mainPinY + 'px';
    noticeAddress.value = mainPinX + ' , ' + mainPinY;
  };

  // захват - переджвижение - отпускание
  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainMapPin.offsetTop <= coordsRange.y.max && mainMapPin.offsetTop >= coordsRange.y.min) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      } else if (mainMapPin.offsetTop <= coordsRange.y.min) {
        mainMapPin.style.top = coordsRange.y.min + 'px';
      } else {
        mainMapPin.style.top = coordsRange.y.max + 'px';
      }

      if (mainMapPin.offsetLeft <= coordsRange.x.max && mainMapPin.offsetLeft >= coordsRange.x.min) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      } else if (mainMapPin.offsetLeft <= coordsRange.x.min) {
        mainMapPin.style.left = coordsRange.x.min + 'px';
      } else {
        mainMapPin.style.left = coordsRange.x.max + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // активация карты и формы в первый раз
  var onMainPinEnterPress = function (evt) {
    window.keyboard.isEnterEvent(evt, activateMap);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');

    // отображение загруженных пинов на карте
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.notices.length; j++) {
      fragment.appendChild(window.renderMapPin(window.notices[j]));
    }
    var div = document.createElement('div');
    div.className = 'rendering-pins';
    div.appendChild(fragment);
    mapPins.appendChild(div);

    mainMapPin.removeEventListener('mouseup', mainPinClickHandler);
    mainMapPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  var mainPinClickHandler = function () {
    activateMap();
    window.showForm();
  };

  mainMapPin.addEventListener('mouseup', mainPinClickHandler);
  mainMapPin.addEventListener('keydown', onMainPinEnterPress);

  // объявление при клике на пин
  var mapPinHandler = function (evt) {
    var target = evt.target;
    while (target !== mapPins) {
      if (target.className === 'map__pin') {
        window.renderNotice(window.notices[target.getAttribute('id')]);
        map.insertBefore(window.mapCard, mapFilters);

        window.popupNotice = document.querySelector('.popup');
        var closePopupButton = document.querySelector('.popup__close');

        if (window.popupNotice.classList.contains('hidden')) {
          window.popupNotice.classList.remove('hidden');
        }

        var onPopupEscPress = function (e) {
          window.keyboard.isEscEvent(e, closePopup);
        };

        var closePopup = function () {
          window.popupNotice.classList.add('hidden');
          document.removeEventListener('keydown', onPopupEscPress);
        };

        document.addEventListener('keydown', onPopupEscPress);

        closePopupButton.addEventListener('click', closePopup);

        return;
      }
      target = target.parentNode;
    }
  };

  mapPins.addEventListener('click', mapPinHandler);

  // деакцивация карты
  window.deactivateMap = function () {
    map.classList.add('map--faded');

    var renderingPins = mapPins.querySelector('.rendering-pins');
    mapPins.removeChild(renderingPins);

    if (mapPins.nextElementSibling === window.popupNotice) {
      map.removeChild(window.popupNotice);
    }

    resetAddress();

    mainMapPin.addEventListener('mouseup', mainPinClickHandler);
    mainMapPin.addEventListener('keydown', onMainPinEnterPress);
  };
})();
