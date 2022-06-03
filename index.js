//event listeners
window.addEventListener('click', onMouseClick, false);
window.addEventListener( 'mousemove', onMouseMove, false);
window.addEventListener( 'resize', onWindowResize, false );

//scene initialization
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x1f1f1f );

//sets camera perspective depending on viewport
if (window.innerWidth + 50 >= window.innerHeight) {
	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
} else {
	var camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
}

//misc. variables
var intersect_link;
var current_selection = 0;
var last_intersect;
var intersection_counter = 0;
var currently_moving = 0;
var hover_offscreen = 1;
var hover_offscreen2 = 1;
var hover_offscreen3 = 1;
var bobbing_counter = 0;
var bobbing_counter2 = 0;
var bobbing_counter3 = 0;

//position selection array
var position_array = [3, 1, 2];
//creates WebGL renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );

//sets attributes to renderer
renderer.domElement.id = 'render_canvas';
document.body.appendChild( renderer.domElement );
document.getElementById('render_canvas').style.position = 'absolute';
document.getElementById('render_canvas').style.top = '0';
document.getElementById('render_canvas').style.left = '0';
document.getElementById('render_canvas').style.zIndex = '-1';

//Box geometry
const geometry = new THREE.BoxGeometry();

//creates quaternions for cube rotations
const quaternion = new THREE.Quaternion(0, 0, 0, 0);
const quaternion2 = new THREE.Quaternion(0.5, 0.5, 0, 0.5);
const quaternion3 = new THREE.Quaternion(0.5, 0, 0, -0.5);

//applies quaternion to geometry
geometry.applyQuaternion( quaternion );

//materials
//no clue why. but material4 creates 2 colors for outlinematerial2 and 3.
var material = new THREE.MeshBasicMaterial( { color: 'orange' } );
var material2 = new THREE.MeshBasicMaterial( { color: 'orange' } );
var material4 = new THREE.MeshBasicMaterial( { side: THREE.BackSide } );
var outlineMaterial3 = new THREE.MeshBasicMaterial( { color: "purple", side: THREE.BackSide } );
var outlineMaterial4 = new THREE.MeshBasicMaterial( { color: "pink", side: THREE.BackSide } );
var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: "green", side: THREE.BackSide } );

//objects
var cube = new THREE.Mesh( geometry, material4 );
var cube2 = new THREE.Mesh( geometry, material );
var cube3 = new THREE.Mesh( geometry, material );
var outlineMesh = new THREE.Mesh( geometry, outlineMaterial3 );
var outlineMesh2 = new THREE.Mesh( geometry, outlineMaterial2 );
var outlineMesh3 = new THREE.Mesh( geometry, outlineMaterial4 );

//object attribute creation/alteration
cube.userData.URL = "https://lu-sife.github.io/Puzzle-Crawler/";
cube2.userData.URL = "https://github.com";
cube3.userData.URL = "https://google.com";
outlineMesh.scale.multiplyScalar(1.15);
outlineMesh2.scale.multiplyScalar(1.15);
outlineMesh3.scale.multiplyScalar(1.15);

//adds object to the scene
scene.add( cube );
scene.add( cube2 );
scene.add( cube3 );
scene.add( outlineMesh );
scene.add( outlineMesh2 );
scene.add( outlineMesh3 );

//sets object positions
outlineMesh2.position.x += 2;
cube2.position.x += 2;
outlineMesh3.position.x -= 2;
cube3.position.x -= 2;
camera.position.z = 5;

//color variables
var r = 255;
var g = 0;
var b = 255;
var color_cycle = "";
	
//Rainbow Cycling text
color_interval = setInterval(function() {
//color calculations
	if (r == 255) {
		if (b != 0) {b--;}
		else if (g != 255) { g++; }
	} if (g == 255) {
		if (r != 0) {r--;}
		 else if (b != 255) { b++; }
	} if (b == 255) {
		if (g != 0) {g--;}
		 else if (r != 255) { r++; }
	}
	
	color_cycle = "rgb(" + r + ", " + g + ", " + b + ")";
	
//place rainbow elements here!
//
},10);
	
//mouse and raycaster variables
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
mouse.x = -1;
mouse.y = -1;

//mouse movement calculation
function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

//mouse clicks
function onMouseClick() {
	if (intersection_counter == 1) {
		window.open(intersect_link, '_blank');
	}
}

//window resizing
function onWindowResize(){

	//gets camera aspect ratio and updates projection matrix to appropriate size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
	
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
	
//checks if there is an object in the raycaster's path
	if (intersects.length > 1) {
		
		
//clones the objects material to revert it later
		const newMaterial = intersects[0].object.material.clone();
//changes the objects material to the new color
		newMaterial.color.setHex(0xff8c00);
		intersects[0].object.material = newMaterial;
//extra needed variables
		last_intersect = intersects;
		intersection_counter = 1;
		intersect_link = intersects[0].object.userData.URL;
//checks which onject is being hovered
		if (intersects[0].object == cube) {
			currently_moving = 1;
			return;
		}
		if (intersects[0].object == cube2) {
			currently_moving = 2;
		}
		if (intersects[0].object == cube3) {
			currently_moving = 3;
		}
		return;
	}
//reverts rotation amd material
		currently_moving = 0;
		cube.material = material2;
		cube2.material = material2;
		cube3.material = material2;
		intersection_counter = 0;
}

function quaternion_rotate() {
//cube selection
	if (currently_moving == 1) {
		outlineMesh.quaternion.rotateTowards(quaternion3, 0.1);
		cube.quaternion.rotateTowards(quaternion3, 0.1);
		outlineMesh2.quaternion.rotateTowards(quaternion2, 0.1);
		cube2.quaternion.rotateTowards(quaternion2, 0.1);
		outlineMesh3.quaternion.rotateTowards(quaternion2, 0.1);
		cube3.quaternion.rotateTowards(quaternion2, 0.1);
		return;
//cube2
	} else if (currently_moving == 2) {
		outlineMesh2.quaternion.rotateTowards(quaternion3, 0.1);
		cube2.quaternion.rotateTowards(quaternion3, 0.1);
		outlineMesh.quaternion.rotateTowards(quaternion2, 0.1);
		cube.quaternion.rotateTowards(quaternion2, 0.1);
		outlineMesh3.quaternion.rotateTowards(quaternion2, 0.1);
		cube3.quaternion.rotateTowards(quaternion2, 0.1);
		return;
	} else if (currently_moving == 3) {
		outlineMesh2.quaternion.rotateTowards(quaternion2, 0.1);
		cube2.quaternion.rotateTowards(quaternion2, 0.1);
		outlineMesh.quaternion.rotateTowards(quaternion2, 0.1);
		cube.quaternion.rotateTowards(quaternion2, 0.1);
		outlineMesh3.quaternion.rotateTowards(quaternion3, 0.1);
		cube3.quaternion.rotateTowards(quaternion3, 0.1);
		return;
	}
//revert rotations
	outlineMesh2.quaternion.rotateTowards(quaternion2, 0.1);
	cube2.quaternion.rotateTowards(quaternion2, 0.1);
	outlineMesh.quaternion.rotateTowards(quaternion2, 0.1);
	cube.quaternion.rotateTowards(quaternion2, 0.1);
	outlineMesh3.quaternion.rotateTowards(quaternion2, 0.1);
	cube3.quaternion.rotateTowards(quaternion2, 0.1);
}

//cube1 hover effect
function cube_bob() {
	
	if (hover_offscreen == 1) {
		if (bobbing_counter == 0) {
			if (cube.position.y < 0.20) {
				
				outlineMesh.position.y += 0.005;
				cube.position.y += 0.005;
				return;
			}
			bobbing_counter = 1;
			return;
		}
		if (bobbing_counter == 1) {
			if (cube.position.y > -0.20) {
				
				outlineMesh.position.y -= 0.005;
				cube.position.y -= 0.005;
				return;
			}
		bobbing_counter = 0;
		}
	}
}

//cube2 hover effect
function cube2_bob() {
	
	if (hover_offscreen2 == 1) {
			if (bobbing_counter2 == 0 && cube2.position.y < 0.20) {
				outlineMesh2.position.y += 0.005;
				cube2.position.y += 0.005;
				return;
			}
			
		bobbing_counter2 = 1;
		
		if (bobbing_counter2 == 1 && cube2.position.y > -0.20) {
			
			outlineMesh2.position.y -= 0.005;
			cube2.position.y -= 0.005;
			return;
		}
		bobbing_counter2 = 0;
	}
}

function cube3_bob() {
	
	if (hover_offscreen3 == 1) {
			if (bobbing_counter3 == 0 && cube3.position.y < 0.20) {
				outlineMesh3.position.y += 0.005;
				cube3.position.y += 0.005;
				return;
			}
			
		bobbing_counter3 = 1;
		
		if (bobbing_counter3 == 1 && cube3.position.y > -0.20) {
			
			outlineMesh3.position.y -= 0.005;
			cube3.position.y -= 0.005;
			return;
		}
		bobbing_counter3 = 0;
	}
}

//main animation function
//DO NOT INCLUDE RETURN;
function animate() {
	window.requestAnimationFrame( animate );
	
	quaternion_rotate();
	cube_bob();
	cube2_bob();
	cube3_bob();
	hoverPieces();
	link_change();
	renderer.render( scene, camera );
}

//object position calculation on next button press
function next_selection() {
	position_array.push(position_array.shift());
	calc_position();
}

//object position calculation on previous button press
function prev_selection() {
	position_array.unshift(position_array.pop());
	calc_position();
}


function calc_position() {
	//cube3 in first position
	if (position_array[0] == 3) {
		cube3.position.x = -2;
		outlineMesh3.position.x = -2;
	}
	//cube3 in second/middle
	if (position_array[1] == 3) {
		cube3.position.x = 0;
		outlineMesh3.position.x = 0;
	}
	//cube3 in last position
	if (position_array[2] == 3) {
		cube3.position.x = 2;
		outlineMesh3.position.x = 2;
	}


	//cube2 in first position
	if (position_array[0] == 2) {
		cube2.position.x = -2;
		outlineMesh2.position.x = -2;
	}
	//cube2 in second/middle
	if (position_array[1] == 2) {
		cube2.position.x = 0;
		outlineMesh2.position.x = 0;
	}
	//cube2 in last position
	if (position_array[2] == 2) {
		cube2.position.x = 2;
		outlineMesh2.position.x = 2;
	}


	//cube1 in first position
	if (position_array[0] == 1) {
		cube.position.x = -2;
		outlineMesh.position.x = -2;
	}
	//cube1 in second/middle
	if (position_array[1] == 1) {
		cube.position.x = 0;
		outlineMesh.position.x = 0;
	}
	//cube1 in last position
	if (position_array[2] == 1) {
		cube.position.x = 2;
		outlineMesh.position.x = 2;
	}
}



function link_change() {
	if (cube.position.x == 0) {
		document.getElementById("puzzle_crawler").href = cube.userData.URL;
		document.getElementById("puzzle_crawler").innerHTML = "Puzzle Crawler";
		return;
	}
	if (cube2.position.x == 0) {
		document.getElementById("puzzle_crawler").href = cube2.userData.URL;
		document.getElementById("puzzle_crawler").innerHTML = "My Github";
		return;
	}
	if (cube3.position.x == 0) {
		document.getElementById("puzzle_crawler").href = cube3.userData.URL;
		document.getElementById("puzzle_crawler").innerHTML = "Test Page";
		return;
	}
}

animate();
//Instead of using complex y offsets, store the cycling values in an array, and use
//that to determine the position of quaternions.

//fix this from lines 318 - 432.