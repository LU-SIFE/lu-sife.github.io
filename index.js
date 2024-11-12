let mode = 'light';
let scrolled = false;
let color_text_array = ['#453f3a', '#8a807b', '#bdb9b2', '#f5f4f0'];

document.onmousemove = function (event) {
	document.getElementById('cursor').style.left = event.clientX + 'px';
	document.getElementById('cursor').style.top = event.clientY + 'px';
};

function get_scroll(scroller) {
	let height = scroller.clientHeight;
	let scrollHeight = scroller.scrollHeight - height;
	let scrollTop = scroller.scrollTop;
	let percent = scrollTop / scrollHeight * 100;
	return percent;
}

document.querySelector('.right').addEventListener('scroll', (event) => {
	let sp = get_scroll(document.querySelector('.right'));
	document.getElementById('scroll_bar_fill').style.height = sp + "%";
	if (scrolled !== true) {
		anime({
			targets: '#sc_text',
			opacity: [1, 0],
			duration: 1000
		});
		scrolled = true;
		setTimeout(function() {
			document.getElementById('sc_text').style.display = 'hidden';
		}, 1000);
	}
});

window.onload = function () {
	anime({
		targets: 'body',
		scale: [0.9, 1],
		translateY: ['8em', '0'],
		borderRadius: ['50em', '0em'],
		duration: 800,
		easing: 'easeOutQuad'
	});
}

document.getElementById('light_mode').addEventListener('click', function () {
	if (mode === 'light') {
		dark_mode();
	} else {
		light_mode();
	}
});

function dark_mode() {
	document.querySelector(':root').style.setProperty('--c1', 'hsl(50, 21%, 95%)');
	document.querySelector(':root').style.setProperty('--c2', 'hsl(38, 8%, 72%)');
	document.querySelector(':root').style.setProperty('--c3', 'hsl(21, 6%, 51%)');
	document.querySelector(':root').style.setProperty('--c4', 'hsl(25, 9%, 25%)');

	for (i = 0; i < 4; i++) {
		document.querySelector('.c' + (4 - i)).textContent = color_text_array[i];
	}

	document.getElementById('light_mode').src = 'imgs/light.svg';
	document.getElementById('mode_text').textContent = 'Light Mode';
	mode = 'dark';
}

function light_mode() {
	document.querySelector(':root').style.setProperty('--c4', 'hsl(50, 21%, 95%)');
	document.querySelector(':root').style.setProperty('--c3', 'hsl(38, 8%, 72%)');
	document.querySelector(':root').style.setProperty('--c2', 'hsl(21, 6%, 51%)');
	document.querySelector(':root').style.setProperty('--c1', 'hsl(25, 9%, 25%)');

	for (i = 0; i < 4; i++) {
		document.querySelector('.c' + (4 - i)).textContent = color_text_array[3 - i];
	}

	document.getElementById('light_mode').src = 'imgs/dark.svg';
	document.getElementById('mode_text').textContent = 'Dark Mode';
	mode = 'light';
}