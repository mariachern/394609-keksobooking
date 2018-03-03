'use strict';

(function () {
  window.filters = document.querySelector('.map__filters');
  var filterElements = window.filters.querySelectorAll('select');
  var filterFeatures = window.filters.querySelector('.map__filter-set');
  var filterFeatureElements = filterFeatures.querySelectorAll('input');

  var apartmentType = window.filters.querySelector('#housing-type').value;
  var apartmentPrice = window.filters.querySelector('#housing-price').value;
  var apartmentRooms = window.filters.querySelector('#housing-rooms').value;
  var apartmentGuests = window.filters.querySelector('#housing-guests').value;

  var selectedFeatures = [];

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

  var getSelectedElement = function (evt) {
    var target = evt.target;
    if (target.className === 'map__filter') {
      apartmentType = window.filters.querySelector('#housing-type').value;
      apartmentPrice = window.filters.querySelector('#housing-price').value;
      apartmentRooms = window.filters.querySelector('#housing-rooms').value;
      apartmentGuests = window.filters.querySelector('#housing-guests').value;
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

      var isTypeMatch = apartmentType === 'any' ? true : el.offer.type === apartmentType;
      var isRoomsMatch = apartmentRooms === 'any' ? true : el.offer.rooms.toString() === apartmentRooms;
      var isGuestsMatch = apartmentGuests === 'any' ? true : el.offer.guests.toString() === apartmentGuests;
      var isPriceMatch = apartmentPrice === 'any' ? true : getPriceString(el.offer.price) === apartmentPrice;

      return isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch && checkFeatures(el.offer.features, selectedFeatures);
    });
    window.render(filteredNotices);
  };

  window.filters.addEventListener('change', function (evt) {
    window.deleteNotice();
    getSelectedElement(evt);
    window.debounce(updateNotices);
  });
})();

