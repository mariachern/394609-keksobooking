'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 62;

  var MAIN_PIN_TAIL = 22;

  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');

  var mapPins = document.querySelector('.map__pins');

  var mainMapPin = mapPins.querySelector('.map__pin--main');

  var mapFilters = document.querySelector('.map__filters-container');

  // заполнение поля адреса
  var mainPinX = mainMapPin.offsetTop;
  var mainPinY = mainMapPin.offsetLeft;
  var noticeAddress = document.getElementsByName('address')[0];
  noticeAddress.value = mainPinX + ' , ' + mainPinY;

  var setAddress = function () {
    noticeAddress.setAttribute('readonly', 'readonly');
    mainPinX = mainMapPin.offsetTop + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TAIL;
    mainPinY = mainMapPin.offsetLeft;
    noticeAddress.value = mainPinX + ' , ' + mainPinY;
  };

  // отпускание
  var MainPinClickHandler = function () {
    map.classList.remove('map--faded');
    window.noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < window.noticeFormFieldset.length; i++) {
      window.noticeFormFieldset[i].disabled = false;
      setAddress();
    }

    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.NOTICE_COUNTER; j++) {
      fragment.appendChild(window.renderMapPin(window.notices[j]));
    }

    mapPins.appendChild(fragment);
    mainMapPin.removeEventListener('mouseup', MainPinClickHandler);
  };

  mainMapPin.addEventListener('mouseup', MainPinClickHandler);

  // объявление при клике на пин
  var mapPinHandler = function (evt) {
    var target = evt.target;
    while (target !== mapPins) {
      if (target.className === 'map__pin') {
        window.renderNotice(window.notices[target.getAttribute('id')]);
        map.insertBefore(window.mapCard, mapFilters);

        var popupNotice = document.querySelector('.popup');
        var closePopupButton = document.querySelector('.popup__close');

        if (popupNotice.classList.contains('hidden')) {
          popupNotice.classList.remove('hidden');
        }

        var closePopup = function () {
          popupNotice.classList.add('hidden');
          document.removeEventListener('keydown', onPopupEscPress);
        };

        var onPopupEscPress = function (e) {
          if (e.keyCode === ESC_KEYCODE) {
            closePopup();
          }
        };

        document.addEventListener('keydown', onPopupEscPress);
        closePopupButton.addEventListener('click', closePopup);

        return;
      }
      target = target.parentNode;
    }
  };

  mapPins.addEventListener('click', mapPinHandler);
})();
