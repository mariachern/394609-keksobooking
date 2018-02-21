'use strict';

(function () {
  window.mapCard = window.similarMapPinTemplate.querySelector('.map__card').cloneNode(true);

  // отрисовка объявления
  window.renderNotice = function (notice) {
    window.mapCard.querySelector('.popup__avatar').src = notice.author.avatar;

    window.mapCard.querySelector('h3').textContent = notice.offer.title;

    window.mapCard.querySelector('small').textContent = notice.offer.address;

    window.mapCard.querySelector('.popup__price').textContent = notice.offer.price + '\u20BD' + '/ночь';

    window.mapCard.querySelector('h4').textContent = 'Квартира';
    if (notice.offer.type === 'house') {
      window.mapCard.querySelector('h4').textContent = 'Дом';
    }

    window.mapCard.querySelector('.guests-and-rooms').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';

    window.mapCard.querySelector('.checkin-and-checkout').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;

    var popupFeatures = window.mapCard.querySelector('.popup__features');
    popupFeatures.innerHTML = ' ';

    for (var i = 0; i < notice.offer.features.length; i++) {
      var newFeature = '<li class="feature"></li>';
      popupFeatures.insertAdjacentHTML('afterbegin', newFeature);
      var featureElement = 'feature--' + notice.offer.features[i];
      popupFeatures.querySelector('li').classList.add(featureElement);
    }

    window.mapCard.querySelector('.description').textContent = notice.offer.description;

    var popupPictures = window.mapCard.querySelector('.popup__pictures');
    popupPictures.innerHTML = ' ';

    for (var j = 0; j < notice.offer.pictures.length; j++) {
      var newPicture = '<li><img src=""></li>';
      popupPictures.insertAdjacentHTML('afterbegin', newPicture);
      var picture = popupPictures.querySelector('img');
      picture.src = notice.offer.pictures[j];
      picture.width = 100;
      picture.height = 100;
    }
  };
})();
