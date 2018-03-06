'use strict';

(function () {
  var TIMEOUT_ERROR = 10000;

  window.notices = [];

  window.onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    var removeErrorPopup = function () {
      node.style.display = 'none';
    };

    setTimeout(removeErrorPopup, TIMEOUT_ERROR);
  };

  // загрузка данных
  window.onLoad = function (data) {
    window.notices = data;
  };
})();
