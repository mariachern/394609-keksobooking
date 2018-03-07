'use strict';

(function () {
  var photoContainer = document.querySelector('.form__photo-container');
  var photoApartmentFileChooser = photoContainer.querySelector('input[type=file]');
  var uploadingPhotos = document.querySelector('.form__photo-container .upload');

  var draggedItem;
  var parentDraggedItem;
  var formApartmentPhotos;

  var removePhotos = function () {
    if (formApartmentPhotos) {
      formApartmentPhotos.forEach(function (el) {
        uploadingPhotos.removeChild(el);
      });
    }
    formApartmentPhotos = false;
  };

  photoApartmentFileChooser.addEventListener('change', function (evt) {
    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
      var fileName = photoApartmentFileChooser.files[i].name.toLowerCase();
      var matches = window.window.utils.imgTypes.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
          var div = document.createElement('div');
          div.classList.add('form__photo');
          div.draggable = 'true';
          div.innerHTML = '<img src="' + e.target.result + '">';
          uploadingPhotos.appendChild(div);
          formApartmentPhotos = document.querySelectorAll('.form__photo');
        });
        reader.readAsDataURL(files[i]);
      }
    }
  });

  photoContainer.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target;
    parentDraggedItem = evt.target.parentNode;
    if (evt.target.className === 'form__photo') {
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  photoContainer.addEventListener('drop', function (evt) {
    var currentItem = evt.target;
    if (evt.target.parentNode.className === 'form__photo') {
      if (evt.target !== draggedItem) {
        parentDraggedItem.removeChild(draggedItem);
        currentItem.parentNode.appendChild(draggedItem);
        parentDraggedItem.appendChild(currentItem);
        evt.preventDefault();
      }
    }
  });

  window.photos = {
    remove: removePhotos
  };
})();
