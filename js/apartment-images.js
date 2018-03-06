'use strict';

(function () {
  var photoApartmentFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var uploadingPhotos = document.querySelector('.form__photo-container .upload');
  var photoContainer = document.querySelector('.form__photo-container');

  var draggedItem;
  var parentDraggedItem;

  photoApartmentFileChooser.addEventListener('change', function (evt) {
    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
      var fileName = photoApartmentFileChooser.files[i].name.toLowerCase();
      var matches = window.FILE_TYPES.some(function (it) {
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
})();
