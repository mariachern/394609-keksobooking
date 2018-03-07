'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');

  var typeOfApartment = noticeForm.querySelector('#type');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacityOfApartment = noticeForm.querySelector('#capacity');
  var resetButton = noticeForm.querySelector('.form__reset');

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
  noticeFormFieldset.forEach(function (el) {
    el.disabled = true;
  });

  var activateForm = function () {
    noticeForm.classList.remove('notice__form--disabled');
    noticeFormFieldset.forEach(function (el) {
      el.disabled = false;
      window.map.setAddress();
    });
  };

  var deactivateForm = function () {
    noticeForm.classList.add('notice__form--disabled');
    noticeFormFieldset.forEach(function (el) {
      el.disabled = true;
    });
    window.avatar.clear();
    window.photos.remove();
    noticeForm.reset();
  };

  // заполнение полей времени
  noticeForm.querySelector('#time').addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === timeIn) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    }
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  // изменение минимального значения цены
  var changeMinPrice = function () {
    var price = apartmentTypeToMinPrice[typeOfApartment.value];
    noticeForm.querySelector('#price').setAttribute('min', price);
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

  resetButton.addEventListener('click', function () {
    deactivateForm();
    window.filters.deactivate();
    window.map.deactivate();
  });

  var onLoad = function () {
    deactivateForm();
    window.filters.deactivate();
    window.map.deactivate();
  };

  // отправка формы
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), onLoad, window.utils.showError);
  });

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
