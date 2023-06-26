window.onload = function() {
	setTimeout(function() {
		page_load = true;
		document.getElementById("pullout").style.pointerEvents = "all";
		document.getElementById("pullout").classList.remove("pull_fade");
		document.getElementById("pullout").style.opacity = 1;
	}, 6750);
	setInterval(blink, 530);
}

document.addEventListener('mousemove', function(e) {
	setTimeout(function() {
		document.getElementById('circle2').style.left = e.pageX + 'px';
		document.getElementById('circle2').style.top = e.pageY + 'px';
	},75);
	setTimeout(function() {
		document.getElementById('circle').style.left = e.pageX + 'px';
		document.getElementById('circle').style.top = e.pageY + 'px';
	}, 200);
},);


let blink_counter = true;

function blink() {
	if (blink_counter) {
		blink_counter = false;
		document.getElementById("blink").innerHTML="  ";
	} else {
		blink_counter = true;
		document.getElementById("blink").innerHTML=" _";
	}
}

var first_pull = 0;
var pullout_state = false;
var animation_counter = false;
var page_position_up = false;
var page_position_down = false;
var page_position_left = false;
var page_position_right = false;
var page_load = false;

setTimeout(move_page_left, 2750);

function clear() {
	var containers = document.querySelectorAll('.container'), i, length;

	for(i = 0, length = containers.length; i < length; i++) {
		containers[i].classList.remove('move_up_back');
		containers[i].classList.remove('move_left_back');
		containers[i].classList.remove('move_down_back');
		containers[i].classList.remove('move_right_back');
	}
}

function pullout() {
	if (pullout_state === false) {
		document.getElementById("pullout").classList.remove("pull_in");
		document.getElementById("pullout").classList.add("pull_out");
		document.getElementById("pull_sign").innerHTML = "<";
		pullout_state = true;
	} else {
		document.getElementById("pullout").classList.remove("pull_out");
		document.getElementById("pullout").classList.add("pull_in");
		document.getElementById("pull_sign").innerHTML = ">";
		pullout_state = false;
	}
}

function move_page_up() {

	if (animation_counter === true ||
		page_position_right === true ||
		page_position_left === true ||
		page_position_down === true ||
		page_load === false) {
		return;
	}

	animation_counter = true;
	setTimeout(function() {animation_counter = false;},1500);

	if (page_position_up === false) {
		clear();
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.add('move_up');
		}
		page_position_up = true;
	} else if (page_position_up === true) {
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.remove('move_up');
			containers[i].classList.add('move_up_back');
		}
		page_position_up = false;
	} else {
		//ADD STUFFFFF
	}
}


function move_page_left(user) {
	if (page_load === false && user === true) {
		return;
	}

	if (animation_counter === true ||
		page_position_right === true ||
		page_position_up === true ||
		page_position_down === true) {
		return;
	}

	animation_counter = true;
	setTimeout(function() {animation_counter = false;},1500);

	if (page_position_left === false) {
		first_pull = 1;
		clear();
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.add('move_left');
		}
		move_text_left();
		page_position_left = true;
	} else {
		if (page_load === false) {
			return;
		}
		if (first_pull === 1) {
			document.getElementById("hint").classList.remove("hint");
			document.getElementById("hint").classList.add("hint2");
		}
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.remove('move_left');
			containers[i].classList.add('move_left_back');
		}
		move_text_left_back();
		page_position_left = false;
	}
}

function move_page_right() {

	if (animation_counter === true ||
		page_position_left === true ||
		page_position_up === true ||
		page_position_down === true ||
		page_load === false) {
		return;
	}

	animation_counter = true;
	setTimeout(function() {animation_counter = false;},1500);

	if (page_position_right === false) {
		clear();
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.add('move_right');
		}
		page_position_right = true;
	} else {
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.remove('move_right');
			containers[i].classList.add('move_right_back');
		}
		page_position_right = false;
	}
}

function move_page_down() {

	if (animation_counter === true ||
		page_position_left === true ||
		page_position_up === true ||
		page_position_right === true ||
		page_load === false) {
		return;
	}

	animation_counter = true;
	setTimeout(function() {animation_counter = false;},1500);

	if (page_position_down === false) {
		clear();
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.add('move_down');
		}
		page_position_down = true;
	} else {
		var containers = document.querySelectorAll('.container'), i, length;

		for(i = 0, length = containers.length; i < length; i++) {
			containers[i].classList.remove('move_down');
			containers[i].classList.add('move_down_back');
		}
		page_position_down = false;
	}
}

function move_text_left() {
	document.getElementById('left_text').classList.remove('move_l_text_back');
	document.getElementById('left_text').classList.add('move_l_text');
}
function move_text_left_back() {
	document.getElementById('left_text').classList.remove('move_l_text');
	document.getElementById('left_text').classList.add('move_l_text_back');
}