// @ts-nocheck
document.addEventListener('DOMContentLoaded', function () {
	$("img.img-svg").each(function () {
		var $img = $(this);
		var imgClass = $img.attr("class");
		var imgURL = $img.attr("src");
		$.get(imgURL, function (data) {
			var $svg = $(data).find("svg");
			if (typeof imgClass !== "undefined") {
				$svg = $svg.attr("class", imgClass + " replaced-svg");
			}
			$svg = $svg.removeAttr("xmlns:a");
			if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
				$svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"));
			}
			$img.replaceWith($svg);
		}, "xml");
	});
});

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			//console.log('animItem:', animItem);
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains("_anim-no-hide")) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageX || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
}