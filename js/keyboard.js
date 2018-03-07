'use strict';

(function () {
  var Keycode = {
    ENTER: 13,
    ESC: 27
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ENTER) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ESC) {
      action();
    }
  };

  window.keyboard = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
