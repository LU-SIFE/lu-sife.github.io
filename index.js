//event listeners
window.addEventListener('click', onMouseClick, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('resize', onWindowResize, false);

var data_array = [
	["Puzzle Crawler", "https://lu-sife.github.io/Puzzle-Crawler/", "#6D00CF"],
	["LEVELED (WIP)", "https://lu-sife.github.io/LEVELED/", "#C71266"],
	["Web Dev Ticketing", "https://lu-sife.github.io/ticketing", "#F25050"]
];

//scene initialization
const scene = new THREE.Scene();

//sets camera perspective depending on viewport
if (window.innerWidth >= window.innerHeight) {
	var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
} else {
	var camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
}

camera.position.z = 8.5;

//misc. variables
var hover_color = "0xd19847";
var intersect_link;
var current_selection = 0;
var last_intersect;
var intersection_counter = 0;
var currently_moving = 0;
var hover_offscreen = 1;
var hover_offscreen2 = 1;
var hover_offscreen3 = 1;
var link_class = document.getElementsByClassName("link_body");
var artist_text = "";
var music_text = "";

function getInnerHeight( elm ){
  var computed = getComputedStyle(elm),
      padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

  return elm.clientHeight - padding
}

function getInnerWidth( elm ){
  var computed = getComputedStyle(elm),
      padding = parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);

  return elm.clientWidth - padding
}

//creates WebGL renderer
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(getInnerWidth(three_div), getInnerHeight(three_div));

//sets attributes to renderer
renderer.domElement.id = 'render_canvas';
document.getElementById("three_div").appendChild(renderer.domElement);
document.getElementById('render_canvas').style.zIndex = '-1';

//Box geometry
var geometry = new THREE.BoxGeometry();

//creates quaternions for cube rotations
const quaternion = new THREE.Quaternion(0, 0, 0, 0);
const quaternion2 = new THREE.Quaternion(0.5, 0.5, 0, 0.5);
const quaternion3 = new THREE.Quaternion(0.5, 0, 0, -0.5);

//applies quaternion to geometry
geometry.applyQuaternion(quaternion);

//materials
//no clue why. but material1 creates 2 colors for outlineMaterial0 and 3.
var material0 = new THREE.MeshBasicMaterial({color: '#ffb347'});
var material1 = new THREE.MeshBasicMaterial({side: THREE.BackSide});


let amount = data_array.length;
var position_array = new Array(amount);

//converts radians to degrees when needed.
function toRads (angle) {
  return angle * (Math.PI / 180);
}

function main_func() {

	//theta is the degrees between each element.
	let theta = 360/amount;

	for (let i = 0; i < amount; i++) {
		position_array[i] = new Array();
		position_array[i][0] = (Math.cos(toRads((theta * i + 270)))) * 2;
		position_array[i][1] = -(((Math.sin(toRads((theta * i + 270)))) - 1) * 2);
	}
}

main_func();

var count_array = new Array(amount);
for (i = 0; i < position_array.length; i++) {
	count_array[i] = data_array[i];
}

//objects
const cube_insts = new Object;
var bobbing_counter = new Object;
var outline_insts = new Object;
var cube_count = 0;
//creates cubes for every entry in data_array
for (let i = 0; i < data_array.length; i++) {
	cube_count++;
	bobbing_counter["cube" + i] = 0;
	cube_insts["cube" + i] = new THREE.Mesh(geometry, material1);
	cube_insts["cube" + i].scale.multiplyScalar(0.90);
	cube_insts["cube" + i].userData.URL = data_array[i][1];
	cube_insts["cube" + i].title = "<span id='special' class='link_body'>" + data_array[i][0] + "</span>";
	outline_insts["cube" + i] = new THREE.MeshBasicMaterial({color: data_array[i][2], side: THREE.BackSide});
	outline_insts["cube" + i].mesh =new THREE.Mesh(geometry, outline_insts["cube" + i]);
	outline_insts["cube" + i].mesh.scale.multiplyScalar(1.05);
	scene.add(cube_insts["cube" + i]);
	scene.add(outline_insts["cube" + i].mesh);
}

//sets object positions
//NEEDS MAJOR REVAMP!! FIX OTHER FUNCTIONS AT THE SAME TIME!!
for (i = 0; i < data_array.length; i++) {

	outline_insts["cube" + i].mesh.position.x = position_array[i][0];
	cube_insts["cube" + i].position.x = position_array[i][0];
	outline_insts["cube" + i].mesh.position.z = position_array[i][1];
	cube_insts["cube" + i].position.z = position_array[i][1];
}

cube_insts.cube2.position.y = -0.4;
outline_insts.cube2.mesh.position.y = -0.4;

cube_insts.cube1.position.y = -0.5;
outline_insts.cube1.mesh.position.y = -0.5;
	
//mouse and raycaster variables
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
mouse.x = -1;
mouse.y = -1;

//mouse movement calculation
function onMouseMove(event) {
	var rect = renderer.domElement.getBoundingClientRect();
mouse.x = ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
mouse.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
}

//mouse clicks
function onMouseClick() {
	if (intersection_counter == 1) {
		window.open(intersect_link, '_blank');
	}
}

//window resizing
function onWindowResize() {

	//gets camera aspect ratio and updates projection matrix to appropriate size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
		renderer.setSize(getInnerWidth(three_div), getInnerHeight(three_div));
	
//changes camera fov if the aspect ratio is portrait
	if (window.innerWidth + 50 >= window.innerHeight) {
		camera.fov = 50;
		camera.updateProjectionMatrix();
		return;
	}
		camera.fov = 85;
		camera.updateProjectionMatrix();
}
//mouse hover over objects
function hoverPieces() {
	
	//initializes raycaster
	raycaster.setFromCamera(mouse, camera);
	const intersects = 	raycaster.intersectObjects(scene.children);

	//checks if there is an object in the raycaster's path, only executes if its a cube and not an outline.
	if (intersects.length == 2) {
		for (i = 0; i < data_array.length; i++) {
			if (intersects[0].object == cube_insts["cube" + i]) {

				//clones the objects material to revert it later
				const newMaterial = intersects[0].object.material.clone();

				//changes the objects material to the new color
				newMaterial.color.setHex(hover_color);
				intersects[0].object.material = newMaterial;

				//extra needed variables
				last_intersect = intersects;
				intersection_counter = 1;
				intersect_link = intersects[0].object.userData.URL;

				//checks which object is being hovered
				for (i = 0; i < data_array.length; i++) {
					if (intersects[0].object == cube_insts["cube" + i]) {
						currently_moving = i + 1;
					}
				}
				return;
			}
		}
	}
	
	//reverts rotation amd material
	currently_moving = 0;

	for (i = 0; i < data_array.length; i++) {
		cube_insts["cube" + i].material = material0;
	}
	intersection_counter = 0;
}

function quaternion_rotate() {
//cube selection
	if (currently_moving == 1) {
		quaternion_rotate_towards(1);
		quaternion_revert(2);
		quaternion_revert(3);
		return;
//cube2
	} else if (currently_moving == 2) {
		quaternion_rotate_towards(2);
		quaternion_revert(1);
		quaternion_revert(3);
		return;
	} else if (currently_moving == 3) {
		quaternion_rotate_towards(3);
		quaternion_revert(1);
		quaternion_revert(2);
		return;
	}
//revert rotations
	quaternion_revert(1);
	quaternion_revert(2);
	quaternion_revert(3);
}

//OK! (reverts the rotation back to normal)
function quaternion_revert(quat_select) {

	for (i = 0; i < data_array.length; i++) {
		if (quat_select == i + 1) {
			cube_insts["cube" + i].quaternion.rotateTowards(quaternion2, 0.1);
			outline_insts["cube" + i].mesh.quaternion.rotateTowards(quaternion2, 0.1);
			return;
		}
	}
}

//OK! (rotates cube to quaternion when hovered)
function quaternion_rotate_towards(quat_select) {

	for (i = 0; i < data_array.length; i++) {
		if (quat_select == i + 1) {
			cube_insts["cube" + i].quaternion.rotateTowards(quaternion3, 0.1);
			outline_insts["cube" + i].mesh.quaternion.rotateTowards(quaternion3, 0.1);
			return;
		}
	}
}

//OK! cannot be deprecated due to return;
function bob_master() {
	for (let i = 0; i < cube_count; i++) {
		bob_main("cube" + i);
	}
}

//OK! cannot be deprecated due to return;
function bob_main(cube_number) {

		if (bobbing_counter[cube_number] == 0 && cube_insts[cube_number].position.y < 0.20) {
			outline_insts[cube_number].mesh.position.y += 0.005;
			cube_insts[cube_number].position.y += 0.005;
			return;
		}
		bobbing_counter[cube_number] = 1;

		if (bobbing_counter[cube_number] == 1 && cube_insts[cube_number].position.y > -0.20) {
			outline_insts[cube_number].mesh.position.y -= 0.005;
			cube_insts[cube_number].position.y -= 0.005;
			return;
		}
		bobbing_counter[cube_number] = 0;
}


//object position calculation on next button press
function next_selection() {

	position_array.push(position_array.shift());
	count_array.unshift(count_array.pop());
	calc_position();
}

//object position calculation on previous button press
function prev_selection() {

	position_array.unshift(position_array.pop());
	count_array.push(count_array.shift());
	calc_position();
}

//NEEDS MAJOR REVAMP!!
function calc_position() {
	for (i = 0; i < 3; i++) {
		for (i = 0; i < data_array.length; i++) {
			outline_insts["cube" + i].mesh.position.x = position_array[i][0];
			cube_insts["cube" + i].position.x = position_array[i][0];
			outline_insts["cube" + i].mesh.position.z = position_array[i][1];
			cube_insts["cube" + i].position.z = position_array[i][1];
		}
	}

	document.getElementById("very_special").href = count_array[0][1];
	document.getElementById("very_special").innerHTML = count_array[0][0];
}

function randomize_songs() {

	artist_text = "";
	music_text = "";

	shuffle(music_array);
	for (let i = 0; i < 10; i++) {
		artist_text += music_array[i][0] + "<br>";
	}

	for (let i = 0; i < 10; i++) {
		music_text += music_array[i][1] + "<br>";
	}

	document.getElementById("artist_container").innerHTML = artist_text;
	document.getElementById("song_container").innerHTML = music_text;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//Music array
var music_array = [
// ["Artist", "Song"]
//24 char limit
	["Arc System Works", "Trigger"],
	["Arc System Works", "Disaster of Passion"],
	["Fox Capture Plan", "Overdrive"],
	["Fox Capture Plan", "Greatest Blue"],
	["Fox Capture Plan", "Acceleration"],
	["Strawberry Girls", "First Kiss"],
	["Strawberry Girls", "Spanish Bay"],
	["Keygen Church", "gebuerjeit"],
	["Keygen Church", "Hareklavit"],
	["Mother Mother", "Oh Ana"],
	["Mother Mother", "Polynesia"],
	["Ken Ashcorp", "Absolute Territory"],
	["Ken Ashcorp", "Touch Fluffy Tail"],
	["Ken Ashcorp", "On The Rocks"],
	["The Megas", "The Message From Dr. Light"],
	["The Megas", "History Repeating Pt. 2"],
	["The Megas", "I Want to Be the One"],
	["The Megas", "Programmed to Fight"],
	["The Megas", "GeminEye"],
	["Hyleo", "Galaxy Cutter"],
	["Hyleo", "Smash"],
	["Hyleo", "Illumination"],

	["Ozzy Osborne", "Patient Number 9"],
	["Ozzy Osborne", "Crazy Train"],
	["Ozzy Osborne", "Straight To Hell"],
	["Jeff Williams", "Hero"],
	["Jeff Williams", "Die"],
	["Jeff Williams", "This Will Be The Day"],
	["Jeff Williams", "Touch The Sky"],
	["Jeff Williams", "Let's Get Real"],
	["Pentakill", "Aftershock"],
	["A Love Like Pi", "Till I Die"],
	["Corey Hart", "Sunglasses At Night"],
	["ASIAN KUNG-FU GENERATION", "Re:Re:"],
	["Everything Everything", "Blast Doors"],
	["Thank You Scientist", "Mr. Invisible"],
	["An Endless Sporadic", "Impulse II"],
	["Challenger Deep", "Immersive"],
	["Hollywood Burns", "Girls with Guns"],
	["Arctic Monkeys", "There'd Better Be A Mirrorball"],
	["Bohemianvoodoo", "Golden Forest"],
	["SixteenInMono", "Time Divergence"],
	["Jeff Williams", "Ignite"],
	["Lord Phobos", "Galactic Chase"],
	["Victory Kid", "Clownin'"],
	["Inabakumori", "Sinktank"],
	["Tally Hall", "Ruler of Everything"],
	["KANA-BOON", "Torch of Liberty"],
	["Blink-182", "Heaven"],
	["Gorillaz", "Empire Ants"],
	["Justice", "Europa"],
	["Pheeno", "Rest"],

	["Polyphia", "G.O.A.T."],
	["Polyphia", "Nasty"]
];

randomize_songs();


var page_load;

myFunction();

function myFunction() {
  page_load = setTimeout(showPage, 1500);
}

function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("top_section").style.display = "flex";
	document.getElementById("about_container").style.display = "inline-block";
	document.getElementById("business_container").style.display = "flex";
	document.getElementById("the_playlist").style.display = "inline-block";
	document.getElementById("footer").style.display = "inline-block";
	onWindowResize();
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    
    document.getElementById("return_button").style.opacity = 1;
  } else {
    document.getElementById("return_button").style.opacity = 0;
  }
}

function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
    screen_save();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
    document.documentElement.webkitRequestFullscreen();
    screen_save();
  } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
    document.documentElement.msRequestFullscreen();
    screen_save();
  }
}

function screen_save() {
	document.getElementById("loader").style.display = "flex";
	document.getElementById("load_text").style.display = "none";
	document.getElementById("load_text_2").style.display = "none";
	document.getElementById("top_section").style.display = "none";
	document.getElementById("about_container").style.display = "none";
	document.getElementById("business_container").style.display = "none";
	document.getElementById("the_playlist").style.display = "none";
	document.getElementById("footer").style.display = "none";
}

if (document.addEventListener) {
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler() {
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		showPage();
	}
}

//Main animation function
//Is called every frame, please don't mess with unless adding or removing functions
function animate() {
	window.requestAnimationFrame( animate );
	quaternion_rotate();
	bob_master();
	hoverPieces();
	renderer.render( scene, camera );
}

animate();

function praise_the_code() {
	alert("Woohoo! secret lol");
}
