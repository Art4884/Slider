var slidesText = [ 'Sorry', 'I really can not do anything in time', 'I asked for help', 'And hero gave me his code', 'I was desperate', 'So, I copypasted his code and changed style', 'I am very embarrassed', 'Now I checked code and tried to understand it', 'Please, forgive me' ];

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(()=>{load();});
	initialize(slidesText);
	document.getElementById("cross").onclick = function() {
		hide();
		visibilityOfSlider();
	}
	document.getElementById('left-arrow').onclick = function() {
		var currSld = getDotIndex();
		switchBetweenSlide(currSld, currSld - 1);
	}
	document.getElementById('right-arrow').onclick = function() {
		var currSld = getDotIndex();
		switchBetweenSlide(currSld, currSld + 1);
	};

	var currSld;

	document.getElementById('dots').addEventListener('mousedown', () => {
		currSld = getDotIndex();
	});

	document.getElementById('dots').addEventListener('click', () => {
		switchBetweenSlide(currSld, getDotIndex());
	});
});

function load() {
	const visibility = window.localStorage.getItem('slider');
	if (visibility == null) {
		show();
	}
}

function show() {
	document.getElementById("slider").style.display = "block";
}

function initialize(texts) {
	for (var i = 0; i < texts.length; i++) {
		var list = document.getElementById('content-list');
		var dots = document.getElementById('dots');

		var dot = document.createElement('input');
		var item = document.createElement('li');
		var parg = document.createElement('p');
		var text = document.createTextNode(texts[i]);

		parg.appendChild(text);
		item.appendChild(parg);
		list.appendChild(item);

		dot.setAttribute('class', 'dot');
		dot.setAttribute('type', 'radio');
		dot.setAttribute('name', 'r');
		if (i == 0) {
			dot.setAttribute('checked', '');
		}
		dots.appendChild(dot);
	}
}

function hide() {
	document.getElementById("slider").style.display = "none";
}

function visibilityOfSlider() {
	const showCheckBox = document.getElementById("show-slider");
	if (showCheckBox.checked) {
		window.localStorage.setItem('slider', '1');
	}
}

function switchBetweenSlide(indexStart, indexEnd) {
	var currSlideIdx = getSlideIndex(indexStart);
	var nextSlideIdx = getSlideIndex(indexEnd);

	var elem = document.getElementById('content-list');
	var dots = document.getElementsByClassName('dot');
	dots[nextSlideIdx].checked = true;

	var startSlidePosition = -currSlideIdx * 376;
	var endSlidePosition = -nextSlideIdx * 376;
	var step = (endSlidePosition - startSlidePosition) / 47;

	var id = setInterval(frame, 0);
	function frame() {
		if (startSlidePosition == endSlidePosition) {
			clearInterval(id);
		} else {
			startSlidePosition += step;
			elem.style.left = startSlidePosition + 'px';
		}
	}
}

function getSlideIndex(index) {
	var slideCount = getCount();
	if (index < 0) {
		return slideCount + (index % slideCount);
	}
	if (index >= slideCount) {
		return index % slideCount;
	}
	return index;
}

function getCount() {
	var dots = document.getElementsByClassName('dot');
	return dots.length;
}

function getDotIndex() {
	var dots = document.getElementsByClassName('dot');
	for (var i = 0; i < dots.length; i++) {
		if (dots[i].checked) {
			return i;
		}
	}
	return -1;
}