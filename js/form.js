'use strict';

(function () {
  window.noticeForm = document.querySelector('.notice__form');
  window.noticeFormFieldset = window.noticeForm.querySelectorAll('fieldset');
  var typeOfApartament = window.noticeForm.querySelector('#type');
  var timeIn = window.noticeForm.querySelector('#timein');
  var timeOut = window.noticeForm.querySelector('#timeout');
  var roomNumber = window.noticeForm.querySelector('#room_number');
  var capacityOfApartament = window.noticeForm.querySelector('#capacity');
  var capacityOptions = capacityOfApartament.querySelectorAll('option');
  var resetButton = window.noticeForm.querySelector('.form__reset');

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
  for (var i = 0; i < window.noticeFormFieldset.length; i++) {
    window.noticeFormFieldset[i].disabled = true;
  }

  // активация формы
  window.showForm = function () {
    window.noticeForm.classList.remove('notice__form--disabled');
    for (var j = 0; j < window.noticeFormFieldset.length; j++) {
      window.noticeFormFieldset[j].disabled = false;
      window.setAddress();
    }
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
    var price = apartmentTypeToMinPrice[typeOfApartament.value];
    window.noticeForm.querySelector('#price').setAttribute('min', price);
  };

  typeOfApartament.addEventListener('change', changeMinPrice);

  // валидация гостей
  var changeGuests = function () {
    capacityOfApartament.innerHTML = '';
    var guest = roomsToGuests[roomNumber.value];
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

  // деакцивация формы
  var deactivateForm = function () {
    window.noticeForm.classList.add('notice__form--disabled');
    for (var y = 0; y < window.noticeFormFieldset.length; y++) {
      window.noticeFormFieldset[y].disabled = true;
    }
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
    window.upload(new FormData(window.noticeForm), onLoad, window.onError);
    evt.preventDefault();
  });
})();
