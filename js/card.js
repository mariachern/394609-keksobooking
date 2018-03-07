'use strict';

(function () {
  var PictureOfApartment = {
    HEIGHT: 50,
    WIDTH: 50
  };

  var mapCard = window.pin.similarMapPinTemplate.querySelector('.map__card').cloneNode(true);
  var popupFeatures = mapCard.querySelector('.popup__features');
  var popupPictures = mapCard.querySelector('.popup__pictures');

  var renderNotice = function (notice) {
    mapCard.querySelector('.popup__avatar').src = notice.author.avatar;
    mapCard.querySelector('h3').textContent = notice.offer.title;
    mapCard.querySelector('small').textContent = notice.offer.address;
    mapCard.querySelector('.popup__price').textContent = notice.offer.price + '\u20BD' + '/ночь';
    mapCard.querySelector('h4').textContent = notice.offer.type === 'house' ? 'Дом' : 'Квартира';
    mapCard.querySelector('.guests-and-rooms').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
    mapCard.querySelector('.checkin-and-checkout').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
    popupFeatures.innerHTML = '';
    if (notice.offer.features.length === 0) {
      popupFeatures.classList.add('hidden');
    } else {
      popupFeatures.classList.remove('hidden');
      for (var i = 0; i < notice.offer.features.length; i++) {
        var newFeature = '<li class="feature"></li>';
        popupFeatures.insertAdjacentHTML('afterbegin', newFeature);
        var featureElement = 'feature--' + notice.offer.features[i];
        popupFeatures.querySelector('li').classList.add(featureElement);
      }
    }
    mapCard.querySelector('.description').textContent = notice.offer.description;
    popupPictures.innerHTML = '';
    if (notice.offer.photos.length === 0) {
      popupPictures.classList.add('hidden');
    } else {
      popupPictures.classList.remove('hidden');
      for (var j = 0; j < notice.offer.photos.length; j++) {
        var newPicture = '<li><img src=""></li>';
        popupPictures.insertAdjacentHTML('afterbegin', newPicture);
        var picture = popupPictures.querySelector('img');
        picture.src = notice.offer.photos[j];
        picture.width = PictureOfApartment.WIDTH;
        picture.height = PictureOfApartment.HEIGHT;
      }
    }
  };

  window.card = {
    mapCard: mapCard,
    render: renderNotice
  };
})();
