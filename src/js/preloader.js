document.addEventListener('DOMContentLoaded', function () {
  var preloader = document.getElementById('preloader');
  setTimeout(function () {
    preloader.classList.add('transparent');
    setTimeout(function () {
      preloader.style.display = 'none';
      console.log('Preloader is hidden');
    }, 500);
  }, 4500);
});
