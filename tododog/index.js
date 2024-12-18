// document form elements

let form_title_el = document.getElementById('title');
let form_due_el = document.getElementById('due_date');
let form_priority_el = document.getElementById('priority');

let day_array = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let tasks = [];
let mode = 'light';
let active_index = 0;

//store data function
const store_data = () => {localStorage.setItem("tasks", JSON.stringify(tasks))}

window.onload = function () {

	//parse task data from local storage
	if (localStorage.getItem("tasks") !== null) {

		data = JSON.parse(localStorage.getItem('tasks'));

		for (i = 0; i < data.length; i++) {

			//normally, this could just be parsed as tasks[i] = data[i], but the JSON breaks the date format.
			tasks[i] = {
				title: data[i].title,
				priority: data[i].priority,
				due: new Date(data[i].due),
				subtitle: data[i].subtitle
			};
		}
	}

	//light mode/dark mode storage
	if (localStorage.getItem('lm') === 'light') { light_mode() }
	else if (localStorage.getItem('lm') === 'dark') { dark_mode() }

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

function populate_tasks(index) {

	//sort tasks based on date, then priority.
	tasks.sort((a, b) => {
		if (a.due === b.due) {
			return a.priority - b.priority;
		}
		return a.due - b.due;
	});

	//reset div and populate with tasks
	document.querySelector('.left').innerHTML = '';
	for (i = 0; i < tasks.length; i++) {populate_new_task(i)}

	//store tasks in local storage as JSON
	store_data();

}

function populate_new_task(index) {
	//create card elements
	let task = document.createElement('div');
	let h1 = document.createElement('h1');
	let sub = document.createElement('span');
	let prior = document.createElement('span');
	let del = document.createElement('button');
	let done = document.createElement('button');

	//add class names
	if (!Number.isInteger(tasks[index].priority)) {tasks[index].priority = 0;}
	task.className = 'task_card';
	prior.className = 'pr prior' + tasks[index].priority;
	del.className = 'tb delete_task';
	done.className = 'tb done_task'

	//add inner content
	prior.innerHTML = tasks[index].priority;
	h1.innerHTML = tasks[index].title;
	sub.innerHTML = get_day_of(index);
	del.innerHTML = 'x';
	done.innerHTML = '✓';

	//complete event listener
	done.addEventListener('click', function (index) {
		tasks.pop(index);
		populate_tasks();
		document.querySelector('.congrats').style.display = 'flex';
	});

	//delete event listener
	del.addEventListener('click', function (index) { tasks.pop(index); populate_tasks(); });

	//card event listener
	task.addEventListener('click', function () {
		active_index = index;

		//needed for empty lists
		if (tasks.length != 0) {

			//define subtitle if it's a new task
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

	//append elements to the DOM
	task.appendChild(prior);
	task.appendChild(h1);
	task.appendChild(sub);
	task.appendChild(del);
	task.appendChild(done);
	document.querySelector('.left').appendChild(task);

	//set as active element when created
	task.click();
}


//swap colors
function dark_mode() {
	document.querySelector(':root').style.setProperty('--c1', 'hsl(50, 21%, 95%)');
	document.querySelector(':root').style.setProperty('--c2', 'hsl(38, 8%, 72%)');
	document.querySelector(':root').style.setProperty('--c3', 'hsl(21, 6%, 51%)');
	document.querySelector(':root').style.setProperty('--c4', 'hsl(25, 9%, 25%)');

	document.getElementById('mode_text').textContent = 'Light Mode';
	document.getElementById('light_mode').src = 'imgs/light.svg';
	mode = 'dark';
	localStorage.setItem('lm', 'dark');
}

//swap colors
function light_mode() {
	document.querySelector(':root').style.setProperty('--c4', 'hsl(50, 21%, 95%)');
	document.querySelector(':root').style.setProperty('--c3', 'hsl(38, 8%, 72%)');
	document.querySelector(':root').style.setProperty('--c2', 'hsl(21, 6%, 51%)');
	document.querySelector(':root').style.setProperty('--c1', 'hsl(25, 9%, 25%)');

	document.getElementById('mode_text').textContent = 'Dark Mode';
	document.getElementById('light_mode').src = 'imgs/dark.svg';
	mode = 'light';
	localStorage.setItem('lm', 'light');
}

function get_day_of(index) {
	let curr_date = new Date();
	let task_date = tasks[index].due;

	//normalize date
	curr_date.setHours(0);
	curr_date.setMinutes(0);
	curr_date.setSeconds(0);
	curr_date.setMilliseconds(0);

	let c_month = curr_date.getMonth();
	let t_month = task_date.getMonth();

	let c_day = curr_date.getDate();
	let t_day = task_date.getDate();

	if (t_month == c_month && t_day == c_day) {return 'Today'}
	if (t_month == c_month &&  t_day - 1 == c_day) {return 'Tomorrow'}
	if (task_date < curr_date) { return 'Overdue!'; tasks[index].overdue = true; }

	// task is within a week, display the day name
	if (t_month == c_month && (t_day - c_day) < 8) {return day_array[task_date.getDay() - 1];}

	// if the date is far away, display number till and date.
	return 'In ' + getDaysBetweenDates(task_date, curr_date) + ' Days. (' + (t_month + 1) + '/' + (t_day) + ')';

}

function getDaysBetweenDates(date1, date2) {
	const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
	// Convert dates to UTC to avoid DST issues
	const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
	return Math.round(Math.abs(utcDate2 - utcDate1) / oneDay);
  }

function create_task() {
	let due_date = new Date(form_due_el.value + 'T00:00:00');
	tasks.push({
		title: form_title_el.value,
		due: due_date,
		priority: Math.round(parseInt(document.getElementById('priority_slider').style.width) / 10),
		overdue: false
	});
	populate_tasks(tasks.length - 1);
}

//
// Listeners
//

//create new task button
document.getElementById('submit').addEventListener('click', (event) => {
	event.preventDefault();
	
	if (form_title_el.value == '') {return}
	if (form_due_el.value == '') {return}

	create_task();
});

//priority slider
document.getElementById('priority').addEventListener('click', (event) => {
	var bcr = event.currentTarget.getBoundingClientRect();
	document.getElementById('priority_slider').style.width = (((event.clientX - bcr.left) / bcr.width) * 100) + '%';
});

//subtitle text area
document.getElementById('subtitle').addEventListener('keyup', (event) => {
	tasks[active_index].subtitle = document.getElementById('subtitle').value;
	store_data();
});

//completion close button
document.querySelector('.congrats_close').addEventListener('click', (event) => {
	document.querySelector('.congrats').style.display = 'none';
});

// cursor movement
document.onmousemove = function (event) {
	document.getElementById('cursor').style.left = event.clientX + 'px';
	document.getElementById('cursor').style.top = event.clientY + 'px';
};

//light mode button
document.getElementById('light_mode').addEventListener('click', function () {
	if (mode === 'light') { dark_mode() } else { light_mode() }
});

//downloadObjectAsJson(tasks, 'tasks');