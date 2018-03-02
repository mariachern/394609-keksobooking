'use strict';

(function () {
  var apartmentType;
  var currentType;
  var apartmentPrice;
  var currentPrice;
  var apartmentRooms;
  var currentRooms;
  var apartmentGuests;
  var currentGuests;
  var selectedValues = ['any', 'any', 'any', 'any'];
  var features;
  var currentFeatures;
  var selectedFeatures = [];

  var lastTimeout;

  window.filters = document.querySelector('.map__filters');
  var filterElements = window.filters.querySelectorAll('select');
  var filterFeatures = window.filters.querySelector('.map__filter-set');
  var filterFeatureElements = filterFeatures.querySelectorAll('input');

  // фильтры неактивны
  filterFeatures.disabled = true;
  for (var i = 0; i < filterElements.length; i++) {
    filterElements[i].disabled = true;
  }

  // активация фильтров
  window.activateFilters = function () {
    filterFeatures.disabled = false;
    for (var j = 0; j < filterElements.length; j++) {
      filterElements[j].disabled = false;
    }
  };

  // деакцивация фильтров
  window.deactivateFilters = function () {
    filterFeatures.disabled = true;
    for (var j = 0; j < filterElements.length; j++) {
      filterElements[j].disabled = true;
    }
    window.filters.reset();
  };

  var getSelectedElement = function (evt) {
    var target = evt.target;
    if (target.className === 'map__filter') {
      selectedValues = [];
      for (var y = 0; y < filterElements.length; y++) {
        var selectedValue = filterElements[y].value;
        selectedValues.push(selectedValue);
      }
    }
    apartmentType = selectedValues[0];
    apartmentPrice = selectedValues[1];
    apartmentRooms = selectedValues[2];
    apartmentGuests = selectedValues[3];
    if (target.tagName === 'INPUT') {
      selectedFeatures = [];
      for (var x = 0; x < filterFeatureElements.length; x++) {
        if (filterFeatureElements[x].checked) {
          var selectedFeature = filterFeatureElements[x];
          selectedFeatures.push(selectedFeature.value);
        }
      }
    }
    features = selectedFeatures;
  };

  var checkFeatures = function (where, what) {
    for (var u = 0; u < what.length; u++) {
      if (where.indexOf(what[u]) === -1) {
        return false;
      }
    }
    return true;
  };

  var updateNotices = function () {
    var similarNotices = window.notices.filter(function (el) {
      currentFeatures = el.offer.features;
      if (apartmentType === 'any') {
        currentType = apartmentType;
      } else {
        currentType = el.offer.type;
      }

      if (apartmentRooms === 'any') {
        currentRooms = apartmentRooms;
      } else {
        currentRooms = el.offer.rooms.toString();
      }

      if (apartmentGuests === 'any') {
        currentGuests = apartmentGuests;
      } else {
        currentGuests = el.offer.guests.toString();
      }

      if (apartmentPrice === 'any') {
        currentPrice = apartmentPrice;
      } else if (el.offer.price >= 10000 && el.offer.price <= 50000) {
        currentPrice = 'middle';
      } else if (el.offer.price < 10000) {
        currentPrice = 'low';
      } else {
        currentPrice = 'high';
      }

      return currentType === apartmentType && currentRooms === apartmentRooms && currentGuests === apartmentGuests && currentPrice === apartmentPrice && checkFeatures(currentFeatures, features);
    });
    window.render(similarNotices);
  };

  window.filters.addEventListener('change', function (evt) {
    window.deleteNotice();
    getSelectedElement(evt);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateNotices();
    }, 500);
  });
})();

