'use strict';

(function () {
  window.notices = [];

  // загрузка данных
  var onLoad = function (data) {
    window.notices = data;
  };

  window.data = {
    onLoad: onLoad
  };
})();
