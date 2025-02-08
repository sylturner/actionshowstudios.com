var main = document.querySelector('#tv'),
	text = document.querySelector('.text'),
	ww = window.innerWidth,
	menu = document.querySelector('.menu')

// Glitch
for (i = 0; i < 4; i++) {
	var span = text.firstElementChild.cloneNode(true);
	text.appendChild(span);
}

window.addEventListener('DOMContentLoaded', function(e) {
  setTimeout(function() {
    main.classList.add('on');
    main.classList.remove('off');
  }, 1500);
});
