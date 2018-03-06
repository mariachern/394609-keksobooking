'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT_INTERVAL = 10000; // ms

  var getStatus = function (url, method, onLoad, onError) {
    window.xhr = new XMLHttpRequest();
    window.xhr.responseType = 'json';

    window.xhr.addEventListener('load', function () {
      if (window.xhr.status === SUCCESS_STATUS) {
        onLoad(window.xhr.response);
        if (method === 'GET') {
          window.render(window.notices);
          window.filters.activate();
        }
      } else {
        onError('Статус ответа: ' + window.xhr.status + ' ' + window.xhr.statusText);
      }
    });

    window.xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    window.xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + window.xhr.timeout + 'мс');
    });

    window.xhr.timeout = TIMEOUT_INTERVAL;
    window.xhr.open(method, url);
  };

  window.upload = function (data, onLoad, onError) {
    getStatus('https://js.dump.academy/keksobooking', 'POST', onLoad, onError);

    window.xhr.send(data);
  };

  window.load = function (onLoad, onError) {
    getStatus('https://js.dump.academy/keksobooking/data', 'GET', onLoad, onError);
    window.xhr.send();
  };
})();
