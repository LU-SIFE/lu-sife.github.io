let mode = 'light';
let scrolled = false;
let color_text_array = ['#453f3a', '#8a807b', '#bdb9b2', '#f5f4f0'];
let math_string = '0123456789'

document.onmousemove = function (event) {
	document.getElementById('cursor').style.left = event.clientX + 'px';
	document.getElementById('cursor').style.top = event.clientY + 'px';
	setTimeout(function() {
		document.getElementById('cursor2').style.left = event.clientX + 'px';
		document.getElementById('cursor2').style.top = event.clientY + 'px';
	}, 25);

};

setTimeout(function() {
setInterval(function() {
	line_calc();
}, 0);
}, 800);

function line_calc() {
	const element1 = document.getElementById('cursor_center');
	const element2 = document.getElementById('cursor2');
	const line = document.getElementById('line');
	
	// Get the bounding rectangles of the elements
	const rect1 = element1.getBoundingClientRect();
	const rect2 = element2.getBoundingClientRect();
	
	// Calculate the center points of the elements
	const x1 = rect1.left + rect1.width / 2;
	const y1 = rect1.top + rect1.height / 2;
	const x2 = rect2.left + rect2.width / 2;
	const y2 = rect2.top + rect2.height / 2;
	
	// Calculate the distance between the center points
	const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
	
	// Calculate the angle between the elements
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
	
	// Set the style of the line
	line.style.width = `${distance}px`;
	line.style.transform = `rotate(${angle}deg)`;
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;
}

function copy(text) {
	switch (text) {
		case 0:
			navigator.clipboard.writeText(document.querySelector('.c1').textContent);
			notif('Copied to clipboard!');
			break;
		case 1:
			navigator.clipboard.writeText(document.querySelector('.c2').textContent);
			notif('Copied to clipboard!');
			break;
		case 2:
			navigator.clipboard.writeText(document.querySelector('.c3').textContent);
			notif('Copied to clipboard!');
			break;
		case 3:
			navigator.clipboard.writeText(document.querySelector('.c4').textContent);
			notif('Copied to clipboard!');
			break;
	
		default:
			break;
	}
}

let notif_timeout

function notif(text) {
	document.querySelector('.notification').textContent = text;
	if (notif_timeout !== undefined) {clearTimeout(notif_timeout)}
	
	anime({
		targets: '.notification',
		left: ['-100%', '2em'],
		duration: 500,
		easing: 'easeInOutExpo'
	});
	notif_timeout = setTimeout(function() {
		anime({
			targets: '.notification',
			left: ['2em', '-100%'],
			duration: 500,
			easing: 'easeInOutExpo'
		});
		notif_timeout = undefined;
	}, 1000);
}

document.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains('mh')) {
        console.log('Element has class "mh"');
		document.getElementById('cursor2').style.transform = 'translate(-50%, -50%) scale(1.5)';
		document.getElementById('cursor2').style.backgroundColor = 'var(--c2)';
		document.getElementById('cursor2').style.opacity = '0.25';
    } else {
        console.log('Element does not have class "mh"');
		document.getElementById('cursor2').style.transform = 'translate(-50%, -50%)';
		document.getElementById('cursor2').style.backgroundColor = 'transparent';
		document.getElementById('cursor2').style.opacity = '1';
    }
});


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

let fullscreen_state = false;
function fullscreen() {
	if (fullscreen_state === false) {
		anime({
			targets: '.border_full',
			margin: 0,
			borderRadius: 0,
			duration: 800,
			easing: 'easeInOutExpo'
		});
		fullscreen_state = true;
	} else {
		anime({
			targets: '.border_full',
			margin: '1em',
			borderRadius: '1em',
			duration: 800,
			easing: 'easeInOutExpo'
		});
		fullscreen_state = false;
	}
}

window.onload = function () {
	anime({
		targets: 'body',
		scale: [0.5	, 1],
		opacity: [0, 1],
		translateY: ['50em', '0'],
		borderRadius: ['50em', '0em'],
		duration: 900,
		easing: 'easeOutQuad'
	});

	anime({
		targets: ['.t1', '.t2', '.t3'],
		paddingTop: ['0.75em', '0'],
		paddingBottom: ['0.75em', '0'],
		duration: 800,
		delay: 300,
		easing: 'easeInOutExpo'
	});


	if (localStorage.getItem('lm') === 'light') {
		light_mode();
	} else if (localStorage.getItem('lm') === 'dark') {
		dark_mode();
	}
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
	document.getElementById('left_close').src = 'imgs/caret-light.svg';
	document.getElementById('mode_text').textContent = 'Light Mode';
	//document.querySelector('.card_bottom').style.backgroundColor = 'var(--c4)';
	mode = 'dark';
	localStorage.setItem('lm', 'dark');
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
	document.getElementById('left_close').src = 'imgs/caret-dark.svg';
	document.getElementById('mode_text').textContent = 'Dark Mode';
	//document.querySelector('.card_bottom').style.backgroundColor = 'var(--c3)';
	mode = 'light';
	localStorage.setItem('lm', 'light');
}

let left_open = false;
function open_left() {
	if (left_open === false) {

		anime({
			targets: '.left',
			width: '0',
			duration: 500,
			easing: 'easeInOutExpo'
		});
		
		anime({
			targets: '#caret',
			rotate: 180,
			duration: 1500,
			easing: 'easeInOutExpo'
		});

		setTimeout(function() {document.querySelector('.left').style.borderRight = 'none';}, 300);
		left_open = true;
	} else {

		anime({
			targets: '.left',
			width: 100/3+'%',
			duration:500,
			easing: 'easeInOutExpo'
		});

		anime({
			targets: '#caret',
			rotate: 0,
			duration: 1500,
			easing: 'easeInOutExpo'
		});
		document.querySelector('.left').style.borderRight = '2px solid var(--c3)';
		left_open = false;
	}
}



//let toggle = true;
//document.getElementById('close_btn').addEventListener('click', function() {
//	if (toggle === true) {
//		document.querySelector('.card').style.height = '2em';
//		document.querySelector('.card_bottom').style.display = 'none';
//		document.querySelector('.card_top').style.borderBottom = 'none';
//		toggle = false;
//	} else {
//		document.querySelector('.card').style.height = '10.5em';
//		document.querySelector('.card_bottom').style.display = 'flex';
//		document.querySelector('.card_top').style.borderBottom = '2px solid var(--c2)';
//		toggle = true;
//	}
//});

//let mh = document.querySelectorAll('.mh');
//
//for (i = 0; i < mh.length; i++) {
//	mh[i].addEventListener('mouseenter', function() {
//		anime({
//			targets: '#cursor',
//			scale: 1.25,
//			duration: 450
//		});
//	});
//}
//
//for (i = 0; i < mh.length; i++) {
//	mh[i].addEventListener('mouseleave', function() {
//		anime({
//			targets: '#cursor',
//			scale: 1,
//			duration: 450
//		});
//	})
//}