'use strict';

(function () {
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  window.noticeForm = document.querySelector('.notice__form');

  window.noticeFormFieldset = window.noticeForm.querySelectorAll('fieldset');

  var typeOfApartament = window.noticeForm.querySelector('#type');

  var timeIn = window.noticeForm.querySelector('#timein');

  var timeOut = window.noticeForm.querySelector('#timeout');

  var roomNumber = window.noticeForm.querySelector('#room_number');

  var capacityOfApartament = window.noticeForm.querySelector('#capacity');

  var capacityOptions = capacityOfApartament.querySelectorAll('option');

  // все поля формы неактивные
  for (var i = 0; i < window.noticeFormFieldset.length; i++) {
    window.noticeFormFieldset[i].disabled = true;
  }

  // заполнение полей времени
  var setTime = function (evt) {
    var target = evt.target;
    if (target === timeIn) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    }
    timeIn.selectedIndex = timeOut.selectedIndex;
  };

  window.noticeForm.querySelector('#time').addEventListener('click', setTime);

  var changeMinPrice = function () {
    var price = MIN_PRICE[typeOfApartament.value];
    window.noticeForm.querySelector('#price').setAttribute('min', price);
  };

  typeOfApartament.addEventListener('click', changeMinPrice);

  // валидация гостей
  var changeGuests = function () {
    capacityOfApartament.innerHTML = '';
    var guest = GUESTS[roomNumber.value];
    for (var j = 0; j < guest.length; j++) {
      for (var y = 0; y < capacityOptions.length; y++) {
        if (capacityOptions[y].value === guest[j]) {
          capacityOptions[y].classList.remove('hidden');
          capacityOfApartament.appendChild(capacityOptions[y]);
        }
      }
    }
  };

  roomNumber.addEventListener('change', changeGuests);
})();
