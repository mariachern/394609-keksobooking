'use strict';

// убрали класс
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');

// основной массив
var notices = [];
var NOTICE_COUNTER = 8;

// titles
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

// types
var types = ['flat', 'house', 'bungalo'];

// checkin - checkout
var times = ['12:00', '13:00', '14:00'];

// features
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// photos
var pictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomFeatures = function () {
  var featuresCounter = Math.ceil(Math.random() * features.length);
  var randomFeaturesArray = features.slice(0, featuresCounter);
  return randomFeaturesArray;
};

// случайный элемент массива
var getRandomElement = function (array) {
  var value = Math.floor(Math.random() * array.length);
  return array[value];
};

// случайное число
var generateRandomNumber = function (min, max) {
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
};

// перемешать
var shuffleArray = function () {
  return Math.random() - 0.5;
};

// объект
for (var i = 0; i < NOTICE_COUNTER; i++) {
  var coordX = generateRandomNumber(300, 900);
  var coordY = generateRandomNumber(150, 500);

  var randomNotice = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: titles[i],
      address: coordX + ' , ' + coordY,
      price: generateRandomNumber(1000, 1000000),
      type: getRandomElement(types),
      rooms: generateRandomNumber(1, 5),
      guests: generateRandomNumber(1, 10),
      checkin: getRandomElement(times),
      checkout: getRandomElement(times),
      features: getRandomFeatures(),
      description: '',
      pictures: pictures.sort(shuffleArray)
    },
    location: {
      x: coordX,
      y: coordY
    }
  };
  notices.push(randomNotice);
}

var similarMapPinTemplate = document.querySelector('template').content;

// отрисовка pin
var renderMapPin = function (notice) {
  var mapPin = similarMapPinTemplate.querySelector('.map__pin').cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.src = notice.author.avatar;

  mapPin.style.left = notice.location.x + 25 + 'px';
  mapPin.style.top = notice.location.y + 70 + 'px';

  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < NOTICE_COUNTER; j++) {
  fragment.appendChild(renderMapPin(notices[j]));
}

mapPins.appendChild(fragment);

var mapCard = similarMapPinTemplate.querySelector('.map__card').cloneNode(true);

// отрисовка объявления
var renderNotice = function (notice) {
  mapCard.querySelector('.popup__avatar').src = notice.author.avatar;

  mapCard.querySelector('h3').textContent = notice.offer.title;

  mapCard.querySelector('small').textContent = notice.offer.address;

  mapCard.querySelector('.popup__price').textContent = notice.offer.price + '\u20BD' + '/ночь';

  mapCard.querySelector('h4').textContent = 'Квартира';
  if (notice.offer.type === 'house') {
    mapCard.querySelector('h4').textContent = 'Дом';
  }

  mapCard.querySelector('.guests-and-rooms').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';

  mapCard.querySelector('.checkin-and-checkout').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;

  for (var k = 0; k < notice.offer.features.length; k++) {
    var newFeature = '<li class="feature"></li>';
    var popupFeatures = mapCard.querySelector('.popup__features');
    popupFeatures.insertAdjacentHTML('afterbegin', newFeature);
    var featureElement = 'feature--' + notice.offer.features[k];
    popupFeatures.querySelector('li').classList.add(featureElement);
  }

  mapCard.querySelector('.description').textContent = notice.offer.description;

  for (var l = 0; l < notice.offer.pictures.length; l++) {
    var newPicture = '<li><img src=""></li>';
    var popupPictures = mapCard.querySelector('.popup__pictures');
    popupPictures.insertAdjacentHTML('afterbegin', newPicture);
    var picture = popupPictures.querySelector('img');
    picture.src = notice.offer.pictures[l];
    picture.width = 100;
    picture.height = 100;
  }
};

renderNotice(notices[0]);

map.insertBefore(mapCard, mapFilters);
