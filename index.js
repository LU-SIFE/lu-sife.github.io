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
}
if (!(window.innerWidth + 50 >= window.innerHeight)) {
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
var bobbing_counter = 0;
var bobbing_counter2 = 0;

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
var material = new THREE.MeshBasicMaterial( { color: 'orange' } );
var material2 = new THREE.MeshBasicMaterial( { color: 'orange' } );
var outlineMaterial3 = new THREE.MeshBasicMaterial( { color: "black", side: THREE.BackSide } );
var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );

//objects
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh( geometry, material );
var outlineMesh = new THREE.Mesh( geometry, outlineMaterial3 );
var outlineMesh2 = new THREE.Mesh( geometry, outlineMaterial2 );

//object attribute creation/alteration
cube.userData.URL = "https://lu-sife.github.io/Puzzle-Crawler/";
cube2.userData.URL = "https://github.com";
outlineMesh.scale.multiplyScalar(1.15);
outlineMesh2.scale.multiplyScalar(1.15);

//adds object to the scene
scene.add( cube );
scene.add( cube2 );
scene.add( outlineMesh );
scene.add( outlineMesh2 );

//sets object positions
outlineMesh2.position.x += 2;
cube2.position.x += 2;
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
		if (intersects[0].object == cube) {
			currently_moving = 1;
		} else if (intersects[0].object == cube2) {
			currently_moving = 2;
		}
//clones the objects material to revert it later
		const newMaterial = intersects[0].object.material.clone();
//changes the objects material to the new color
		newMaterial.color.setHex(0xff8c00);
		intersects[0].object.material = newMaterial;
//extra needed variables
		last_intersect = intersects;
		intersection_counter = 1;
		intersect_link = intersects[0].object.userData.URL;
		return;
	}
//reverts rotation amd material
		currently_moving = 0;
		cube.material = material2;
		cube2.material = material2;
		intersection_counter = 0;
}

//main animation function
//DO NOT INCLUDE RETURN;
function animate() {
	window.requestAnimationFrame( animate );
	
//cube selection
	if (currently_moving == 1) {
		
		outlineMesh.quaternion.rotateTowards(quaternion3, 0.1);
		cube.quaternion.rotateTowards(quaternion3, 0.1);
		outlineMesh2.quaternion.rotateTowards(quaternion2, 0.1);
		cube2.quaternion.rotateTowards(quaternion2, 0.1);
//cube2
	} else if (currently_moving == 2) {
		
		outlineMesh2.quaternion.rotateTowards(quaternion3, 0.1);
		cube2.quaternion.rotateTowards(quaternion3, 0.1);
		outlineMesh.quaternion.rotateTowards(quaternion2, 0.1);
		cube.quaternion.rotateTowards(quaternion2, 0.1);
//revert rotation
	} else {
		
		outlineMesh2.quaternion.rotateTowards(quaternion2, 0.1);
		cube2.quaternion.rotateTowards(quaternion2, 0.1);
		outlineMesh.quaternion.rotateTowards(quaternion2, 0.1);
		cube.quaternion.rotateTowards(quaternion2, 0.1);
	}
	
	if (hover_offscreen == 1) {
		if (bobbing_counter == 0) {
			if (cube.position.y < 0.20) {
				
				outlineMesh.position.y += 0.005;
				cube.position.y += 0.005;
			} else {
				bobbing_counter = 1;
			}
			
		} else  if (bobbing_counter == 1) {
			if (cube.position.y > -0.20) {
				
				outlineMesh.position.y -= 0.005;
				cube.position.y -= 0.005;
			} else {
				bobbing_counter = 0;
			}
		}
	}
	
	if (hover_offscreen2 == 1) {
		if (bobbing_counter2 == 0) {
			if (cube2.position.y < 0.20) {
				outlineMesh2.position.y += 0.005;
				cube2.position.y += 0.005;
			} else {
				bobbing_counter2 = 1;
			}
		} else if (bobbing_counter2 == 1) {
			if (cube2.position.y > -0.20) {
				
				outlineMesh2.position.y -= 0.005;
				cube2.position.y -= 0.005;
			} else {
				bobbing_counter2 = 0;
			}
		}
	}
	
	hoverPieces();
	renderer.render( scene, camera );
}

//object position calculation on next button press
function next_selection() {
	
	outlineMesh2.position.x -= 2;
	cube2.position.x -= 2;
	outlineMesh.position.x -= 2;
	cube.position.x -= 2;
	
	if (cube.position.x <= -4) {
		cube.position.y -= 2;
		outlineMesh.position.y -= 2;
		bobbing_counter = 2;
		hover_offscreen = 0;
	} else if (bobbing_counter == 3) {
		cube.position.y += 2;
		outlineMesh.position.y += 2;
		if (cube.position.x > -3) {
			bobbing_counter = 0;
			hover_offscreen = 1;
		}
	}
	
	if (cube2.position.x <= -4) {
		cube2.position.y -= 2;
		outlineMesh2.position.y -= 2;
		bobbing_counter2 = 2;
		hover_offscreen2 = 0;
	} else if (bobbing_counter2 == 3) {
		cube2.position.y += 2;
		outlineMesh2.position.y += 2;
		if (cube2.position.x > -3) {
			bobbing_counter2 = 0;
			hover_offscreen2 = 1;
		}
	}
}

//object position calculation on previous button press
function prev_selection() {
	
	outlineMesh.position.x += 2;
	cube.position.x += 2;
	outlineMesh2.position.x += 2;
	cube2.position.x += 2;
	
	if (cube.position.x >= 4) {
		cube.position.y -= 2;
		outlineMesh.position.y -= 2;
		bobbing_counter = 3;
		hover_offscreen = 0;
	} else if (bobbing_counter == 2) {
		
		cube.position.y += 2;
		outlineMesh.position.y += 2;
		if (cube.position.x < 3) {
			bobbing_counter = 0;
			hover_offscreen = 1;
		}
	}
	
	if (cube2.position.x >= 4) {
		cube2.position.y -= 2;
		outlineMesh2.position.y -= 2;
		bobbing_counter2 = 3;
		hover_offscreen2 = 0;
	} else if (bobbing_counter2 == 2) {
		
		cube2.position.y += 2;
		outlineMesh2.position.y += 2;
		if (cube2.position.x < 3) {
			bobbing_counter2 = 0;
			hover_offscreen2 = 1;
		}
	}
}

animate();