'use strict';

(function () {
  window.noticeForm = document.querySelector('.notice__form');
  window.noticeFormFieldset = window.noticeForm.querySelectorAll('fieldset');

  var typeOfApartment = window.noticeForm.querySelector('#type');
  var timeIn = window.noticeForm.querySelector('#timein');
  var timeOut = window.noticeForm.querySelector('#timeout');
  var roomNumber = window.noticeForm.querySelector('#room_number');
  var capacityOfApartment = window.noticeForm.querySelector('#capacity');
  var resetButton = window.noticeForm.querySelector('.form__reset');

  var capacityOptions = capacityOfApartment.querySelectorAll('option');

  var apartmentTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  // все поля формы неактивные
  window.noticeFormFieldset.forEach(function (el) {
    el.disabled = true;
  });

  // активация формы
  window.showForm = function () {
    window.noticeForm.classList.remove('notice__form--disabled');
    window.noticeFormFieldset.forEach(function (el) {
      el.disabled = false;
      window.setAddress();
    });
  };

  // заполнение полей времени
  window.noticeForm.querySelector('#time').addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === timeIn) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    }
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  // изменение минимального значения цены
  var changeMinPrice = function () {
    var price = apartmentTypeToMinPrice[typeOfApartment.value];
    window.noticeForm.querySelector('#price').setAttribute('min', price);
  };

  typeOfApartment.addEventListener('change', function () {
    changeMinPrice();
  });

  // валидация гостей
  var changeGuests = function () {
    capacityOfApartment.innerHTML = '';
    var guest = roomsToGuests[roomNumber.value];
    for (var i = 0; i < guest.length; i++) {
      capacityOptions.forEach(function (el) {
        if (el.value === guest[i]) {
          el.classList.remove('hidden');
          capacityOfApartment.appendChild(el);
        }
      });
    }
  };

  roomNumber.addEventListener('change', function () {
    changeGuests();
  });

  // деакцивация формы
  var deactivateForm = function () {
    window.noticeForm.classList.add('notice__form--disabled');
    window.noticeFormFieldset.forEach(function (el) {
      el.disabled = true;
    });
    window.noticeForm.reset();
  };

  resetButton.addEventListener('click', function () {
    deactivateForm();
    window.deactivateFilters();
    window.deactivateMap();
  });

  var onLoad = function () {
    deactivateForm();
    window.deactivateFilters();
    window.deactivateMap();
  };

  // отправка формы
  window.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.noticeForm), onLoad, window.onError);
  });
})();
