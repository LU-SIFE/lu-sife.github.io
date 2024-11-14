//let test_date = new Date();
//test_date.setDate(test_date.getDate() - 7);
let mode = 'light';
let active_index = 0;
let form_title_el = document.getElementById('title');
let form_due_el = document.getElementById('due_date');
let form_priority_el = document.getElementById('priority');

let day_array = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let tasks = [];



function populate_tasks(index) {

	tasks.sort((a, b) => {
		if (a.due === b.due) {
			console.log(true);
			return a.priority - b.priority;
		}
		return a.due - b.due;
	});

	document.querySelector('.left').innerHTML = '';
	for (i = 0; i < tasks.length; i++) {
		populate_new_task(i);
	}



	const jsonArray = JSON.stringify(tasks);

	localStorage.setItem("tasks", jsonArray);
}

function populate_new_task(index) {
	let task = document.createElement('div');
	let h1 = document.createElement('h1');
	let sub = document.createElement('span');
	let del = document.createElement('button');
	let done = document.createElement('button');
	let prior = document.createElement('span');
	prior.innerHTML = tasks[index].priority;
	prior.className = 'pr';
	done.innerHTML = '✓';
	done.className = 'tb done_task'
	del.innerHTML = 'x';
	del.className = 'tb delete_task';

	done.addEventListener('click', function(index) {
		tasks.pop(index);
		populate_tasks();
		document.querySelector('.congrats').style.display = 'flex';
	});

	del.addEventListener('click', function(index) {tasks.pop(index); populate_tasks();});
	task.addEventListener('click', function() {
		active_index = index;
		if (tasks.length != 0) {
			if (typeof tasks[index].subtitle == 'undefined') {
				document.getElementById('subtitle').value = '';
				tasks[index].subtitle = '';
			}
			document.getElementById('subtitle').value = tasks[index].subtitle;
			document.getElementById('title_header').textContent = tasks[index].title;
		} else {
			document.getElementById('subtitle').value = ' ';
			document.getElementById('title_header').textContent = ' ';
		}
	});
	h1.innerHTML = tasks[index].title;
	sub.innerHTML = get_day_of(index);
	task.appendChild(prior);
	task.appendChild(h1);
	task.appendChild(sub);
	task.appendChild(del);
	task.appendChild(done);
	task.className = 'task_card';
	document.querySelector('.left').appendChild(task);
	task.click();
}
window.onload = function() {
	if (typeof localStorage.getItem('tasks') != "undefined") {
		data = JSON.parse(localStorage.getItem('tasks'));
		for (i = 0; i < data.length; i++) {
			tasks[i] = {title: data[i].title, priority: data[i].priority, due: new Date(data[i].due), subtitle: data[i].subtitle};
		}
		document
	}
	
	if (localStorage.getItem('lm') === 'light') {
		light_mode();
	} else if (localStorage.getItem('lm') === 'dark') {
		dark_mode();
	}
	
	if (tasks.length == 0) {
		document.getElementById('title_header').innerHTML = '';
		document.getElementById('subtitle').value = ' ';
		return;
	}
	populate_tasks();

	
	if (typeof tasks[0].subtitle != 'undefined') {
		document.getElementById('subtitle').value = tasks[0].subtitle;
	} else {
		document.getElementById('subtitle').value = '';
	}
	document.getElementById('title_header').textContent = tasks[0].title;
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


	document.getElementById('light_mode').src = 'imgs/light.svg';
	document.getElementById('mode_text').textContent = 'Light Mode';
	mode = 'dark';
	localStorage.setItem('lm', 'dark');
}

function light_mode() {
	document.querySelector(':root').style.setProperty('--c4', 'hsl(50, 21%, 95%)');
	document.querySelector(':root').style.setProperty('--c3', 'hsl(38, 8%, 72%)');
	document.querySelector(':root').style.setProperty('--c2', 'hsl(21, 6%, 51%)');
	document.querySelector(':root').style.setProperty('--c1', 'hsl(25, 9%, 25%)');


	document.getElementById('light_mode').src = 'imgs/dark.svg';
	document.getElementById('mode_text').textContent = 'Dark Mode';
	mode = 'light';
	localStorage.setItem('lm', 'light');
}

function get_day_of(index) {
	if (tasks[index].due.getDate() === new Date().getDate()) {return 'Today';}
	if (tasks[index].due.getDate() - 1 === new Date().getDate()) {return 'Tomorrow';}
	if (tasks[index].due < new Date()) {return 'Overdue!'; tasks[index].overdue = true;}
	if (tasks[index].due.getDate() - new Date().getDate() < 8) {return day_array[index]}

	return 'In ' + (tasks[index].due.getDate() - new Date().getDate()) + ' Days. (' + (tasks[index].due.getMonth() + 1) + '/' + (tasks[index].due.getDate()) + ')';
}

document.onmousemove = function (event) {
	document.getElementById('cursor').style.left = event.clientX + 'px';
	document.getElementById('cursor').style.top = event.clientY + 'px';
};

document.getElementById('submit').addEventListener('click', (event) => {
	event.preventDefault();
	if (!verify()) {return;}

	create_task();
});

function verify() {
	if (form_title_el.value == '') {return false;}
	if (form_due_el.value == '') {return false;}
	return true;
}

function create_task() {
	let due_date = new Date(new Date().setDate(new Date(form_due_el.value).getDate() + 1));
	due_date.setHours(0);
	due_date.setMinutes(0);
	due_date.setSeconds(0);
	tasks.push({
		title: form_title_el.value,
		due: due_date,
		priority: Math.round(parseInt(document.getElementById('priority_slider').style.width) / 10)
	});

	populate_tasks(tasks.length - 1);
}

document.getElementById('priority').addEventListener('click', (event) => {
	var bcr = event.currentTarget.getBoundingClientRect();
	document.getElementById('priority_slider').style.width = (((event.clientX - bcr.left) / bcr.width) * 100) + '%';
});

document.getElementById('priority').addEventListener('click', (event) => {
	var bcr = event.currentTarget.getBoundingClientRect();
	document.getElementById('priority_slider').style.width = (((event.clientX - bcr.left) / bcr.width) * 100) + '%';
});

function downloadObjectAsJson(exportObj, exportName){
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href",     dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	downloadAnchorNode.style.display = 'none';
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

document.getElementById('subtitle').addEventListener('keyup', (event) => {
	tasks[active_index].subtitle = document.getElementById('subtitle').value;
	const jsonArray = JSON.stringify(tasks);
	localStorage.setItem("tasks", jsonArray);
});

document.querySelector('.congrats_close').addEventListener('click', (event) => {
	document.querySelector('.congrats').style.display = 'none';
})

//downloadObjectAsJson(tasks, 'tasks');