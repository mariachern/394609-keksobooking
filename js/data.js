'use strict';

(function () {
  window.notices = [];

  window.onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    var removeErrorPopup = function () {
      node.style.display = 'none';
    };

    setTimeout(removeErrorPopup, 10000);
  };

  // загрузка данных
  window.onLoad = function (noticesArray) {
    for (var j = 0; j < noticesArray.length; j++) {
      window.notices.push(noticesArray[j]);
    }
  };

  window.load(window.onLoad, window.onError);
})();
