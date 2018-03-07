'use strict';

(function () {
  window.FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_IMG = 'img/muffin.png';

  var avatarFileChooser = document.querySelector('.notice__photo input[type=file]');
  var avatarPreview = document.querySelector('.notice__preview img');

  var addFile = function (image, preview) {
    var file = image.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
    }
    reader.readAsDataURL(file);
  };

  avatarFileChooser.addEventListener('change', function () {
    addFile(avatarFileChooser, avatarPreview);
  });

  var clearAvatarInput = function () {
    avatarPreview.src = DEFAULT_IMG;
  };

  window.avatar = {
    clear: clearAvatarInput
  };
})();
