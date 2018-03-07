'use strict';

(function () {
  var notices = [];

  // загрузка данных
  var onLoad = function (data) {
    window.data.notices = data;
  };

  window.data = {
    onLoad: onLoad,
    notices: notices
  };
})();
