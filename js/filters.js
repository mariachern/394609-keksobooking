'use strict';

(function () {
  window.filters = document.querySelector('.map__filters');
  var filterElements = window.filters.querySelectorAll('select');
  var filterFeatures = window.filters.querySelector('.map__filter-set');
  var filterFeatureElements = filterFeatures.querySelectorAll('input');

  var apartmentType = window.filters.querySelector('#housing-type');
  var apartmentRooms = window.filters.querySelector('#housing-rooms');
  var apartmentGuests = window.filters.querySelector('#housing-guests');
  var apartmentPrice = window.filters.querySelector('#housing-price');

  var selectedFeatures = [];

  var typeValue = apartmentType.value;
  var roomsValue = apartmentRooms.value;
  var guestsValue = apartmentGuests.value;
  var priceValue = apartmentPrice.value;

  // фильтры неактивны
  filterFeatures.disabled = true;
  filterElements.forEach(function (el) {
    el.disabled = true;
  });

  // активация фильтров
  window.activateFilters = function () {
    if (window.notices.length !== 0) {
      filterFeatures.disabled = false;
      filterElements.forEach(function (el) {
        el.disabled = false;
      });
    }
  };

  // деакцивация фильтров
  window.deactivateFilters = function () {
    filterFeatures.disabled = true;
    filterElements.forEach(function (el) {
      el.disabled = true;
    });
    window.filters.reset();
  };

  var updateFilterValues = function (evt) {
    var target = evt.target;
    if (target.className === 'map__filter') {
      typeValue = apartmentType.value;
      roomsValue = apartmentRooms.value;
      guestsValue = apartmentGuests.value;
      priceValue = apartmentPrice.value;
    }
    if (target.tagName === 'INPUT') {
      selectedFeatures = [];
      filterFeatureElements.forEach(function (el) {
        if (el.checked) {
          var selectedFeature = el;
          selectedFeatures.push(selectedFeature.value);
        }
      });
    }
  };

  var updateNotices = function () {
    var filteredNotices = window.notices.filter(function (el) {
      var getPriceString = function (price) {
        var priceString;
        if (price >= 10000 && price <= 50000) {
          priceString = 'middle';
        } else if (price < 10000) {
          priceString = 'low';
        } else {
          priceString = 'high';
        }
        return priceString;
      };

      var checkFeatures = function (where, what) {
        for (var y = 0; y < what.length; y++) {
          if (where.indexOf(what[y]) === -1) {
            return false;
          }
        }
        return true;
      };

      var isTypeMatch = typeValue === 'any' ? true : el.offer.type === typeValue;
      var isRoomsMatch = roomsValue === 'any' ? true : el.offer.rooms.toString() === roomsValue;
      var isGuestsMatch = guestsValue === 'any' ? true : el.offer.guests.toString() === guestsValue;
      var isPriceMatch = priceValue === 'any' ? true : getPriceString(el.offer.price) === priceValue;

      return isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch && checkFeatures(el.offer.features, selectedFeatures);
    });
    window.render(filteredNotices);
  };

  window.filters.addEventListener('change', function (evt) {
    window.deleteNotice();
    updateFilterValues(evt);
    window.debounce(updateNotices);
  });
})();

