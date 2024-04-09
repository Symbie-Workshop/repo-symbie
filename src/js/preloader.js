document.addEventListener('DOMContentLoaded', function () {
  var preloader = document.getElementById('preloader');
  setTimeout(function () {
    preloader.classList.add('hidden');
    preloader.style.display = 'none';
  }, 4800);
});
