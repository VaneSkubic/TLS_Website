import Swiper from 'swiper/bundle';

(function () {
	var exampleSlider = document.getElementById('example-slider');

	if (exampleSlider) {
		new Swiper(exampleSlider, {
            spaceBetween:0,
			slidesPerView: 1,
			pagination: {
				el: '.example-slider-pagination',
				clickable: true
			}
		});
	}
})();