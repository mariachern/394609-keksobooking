'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var TIMEOUT_ERROR = 10000; // ms
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var showError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    var removeErrorPopup = function () {
      node.style.display = 'none';
    };

    setTimeout(removeErrorPopup, TIMEOUT_ERROR);
  };

  window.utils = {
    imgTypes: FILE_TYPES,
    debounce: debounce,
    showError: showError
  };
})();
