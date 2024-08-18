anime({
	targets: '.b1',
	scaleX: ["1.5", "1", "1.1", "1"],
	scaleY: ["0.8", "0.8", "1", "1.1"],
	rotate: ["-15deg", "10deg"],

	duration: 14000,
	delay: 500,
	endDelay: 500,
	loop: true,
	direction: 'alternate',
	easing: 'easeInOutQuad',
});

anime({
	targets: '.b2',
	scaleX: ["1.5", "1.2", "1.1", "1"],
	scaleY: ["1.8", "1.6", "1.3", "1.4"],
	rotate: ["-15deg", "-5deg"],

	duration: 15000,
	delay: 500,
	endDelay: 750,
	loop: true,
	direction: 'alternate',
	easing: 'easeInOutQuad',
});

var colorMode = 0; //dark

function color_mode() {
	if (colorMode === 0) {
		colorMode = 1;
		anime({
			targets: 'body',
			backgroundColor: '#FFFFFF',
			duration: 0
		});
	} else if (colorMode === 1) {
		colorMode = 0;
		anime({
			targets: 'body',
			backgroundColor: "#1F1F1F",
			duration: 0
		});
	}
}


document.onmousemove = function(event) {
  document.getElementById('cursor').style.left = event.clientX + 'px';
  document.getElementById('cursor').style.top = event.clientY + 'px';
};
