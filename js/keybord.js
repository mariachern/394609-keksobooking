'use strict';

(function () {
  var Keycode = {
    ENTER: 13,
    ESC: 27
  };

  window.keyboard = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    }
  };
})();
