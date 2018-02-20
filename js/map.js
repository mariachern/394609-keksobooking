'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPES = ['flat', 'house', 'bungalo'];

var TIMES = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PICTURES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAIN_PIN_HEIGHT = 62;

var MAIN_PIN_TAIL = 22;

var PIN_HEIGHT = 70;

var PIN_WIDTH = 50;

var ESC_KEYCODE = 27;

var NOTICE_COUNTER = 8;

var notices = [];

var map = document.querySelector('.map');

var mapPins = document.querySelector('.map__pins');

var mainMapPin = mapPins.querySelector('.map__pin--main');

var mapFilters = document.querySelector('.map__filters-container');

var noticeForm = document.querySelector('.notice__form');

var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');

// все поля формы неактивные
for (var t = 0; t < noticeFormFieldset.length; t++) {
  noticeFormFieldset[t].disabled = true;
}

var getRandomFeatures = function () {
  var featuresCounter = Math.ceil(Math.random() * FEATURES.length);
  var randomFeaturesArray = FEATURES.slice(0, featuresCounter);
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
      title: TITLES[i],
      address: coordX + ' , ' + coordY,
      price: generateRandomNumber(1000, 1000000),
      type: getRandomElement(TYPES),
      rooms: generateRandomNumber(1, 5),
      guests: generateRandomNumber(1, 10),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getRandomFeatures(),
      description: '',
      pictures: PICTURES.slice().sort(shuffleArray)
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
var counter = 0;
var renderMapPin = function (notice) {
  var mapPin = similarMapPinTemplate.querySelector('.map__pin').cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.src = notice.author.avatar;
  mapPin.setAttribute('id', counter);

  mapPin.style.left = notice.location.x + PIN_WIDTH / 2 + 'px';
  mapPin.style.top = notice.location.y + PIN_HEIGHT + 'px';

  counter++;
  return mapPin;
};

var fragment = document.createDocumentFragment();

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

  var popupFeatures = mapCard.querySelector('.popup__features');
  popupFeatures.innerHTML = ' ';

  for (var k = 0; k < notice.offer.features.length; k++) {
    var newFeature = '<li class="feature"></li>';
    popupFeatures.insertAdjacentHTML('afterbegin', newFeature);
    var featureElement = 'feature--' + notice.offer.features[k];
    popupFeatures.querySelector('li').classList.add(featureElement);
  }

  mapCard.querySelector('.description').textContent = notice.offer.description;

  var popupPictures = mapCard.querySelector('.popup__pictures');
  popupPictures.innerHTML = ' ';

  for (var l = 0; l < notice.offer.pictures.length; l++) {
    var newPicture = '<li><img src=""></li>';
    popupPictures.insertAdjacentHTML('afterbegin', newPicture);
    var picture = popupPictures.querySelector('img');
    picture.src = notice.offer.pictures[l];
    picture.width = 100;
    picture.height = 100;
  }
};

// заполнение поля адреса
var mainPinX = mainMapPin.offsetTop;
var mainPinY = mainMapPin.offsetLeft;
var noticeAddress = document.getElementsByName('address')[0];
noticeAddress.value = mainPinX + ' , ' + mainPinY;

var setAddress = function () {
  mainPinX = mainMapPin.offsetTop + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TAIL;
  mainPinY = mainMapPin.offsetLeft;
  noticeAddress.value = mainPinX + ' , ' + mainPinY;
};

// три фазы
// захват элемента
// перемещение
// отпускание
var MainPinClickHandler = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');

  for (t = 0; t < noticeFormFieldset.length; t++) {
    noticeFormFieldset[t].disabled = false;
    setAddress();
  }

  for (var j = 0; j < NOTICE_COUNTER; j++) {
    fragment.appendChild(renderMapPin(notices[j]));
  }

  mapPins.appendChild(fragment);
  mainMapPin.removeEventListener('mouseup', MainPinClickHandler);
};

mainMapPin.addEventListener('mouseup', MainPinClickHandler);

// объявление при клике на пин
var mapPinHandler = function (evt) {
  var target = evt.target;
  while (target !== mapPins) {
    if (target.className === 'map__pin') {
      renderNotice(notices[target.getAttribute('id')]);
      map.insertBefore(mapCard, mapFilters);

      var popupNotice = document.querySelector('.popup');
      var closePopupButton = document.querySelector('.popup__close');

      if (popupNotice.classList.contains('hidden')) {
        popupNotice.classList.remove('hidden');
      }

      var closePopup = function () {
        popupNotice.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
      };

      var onPopupEscPress = function (e) {
        if (e.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      };

      document.addEventListener('keydown', onPopupEscPress);
      closePopupButton.addEventListener('click', closePopup);

      return;
    }
    target = target.parentNode;
  }
};

mapPins.addEventListener('click', mapPinHandler);
