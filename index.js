import * as THREE from "js/three.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var mouse, raycaster;
var last_intersect;
var intersection_counter = 0;
var currently_moving = 0;
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'render_canvas';
document.body.appendChild( renderer.domElement );
document.getElementById('render_canvas').style.position = 'absolute';
document.getElementById('render_canvas').style.top = '0';
document.getElementById('render_canvas').style.left = '0';
document.getElementById('render_canvas').style.zIndex = '-1';

const quaternion = new THREE.Quaternion(0, 0, 0, 0);
const quaternion2 = new THREE.Quaternion(0.5, 0.5, 0, 0.5);
const quaternion3 = new THREE.Quaternion(0.5, 0, 0, -0.5);
const geometry = new THREE.BoxGeometry();
geometry.applyQuaternion( quaternion );
var material = new THREE.MeshBasicMaterial( { color: 'orange' } );
var material2 = new THREE.MeshBasicMaterial( { color: 'orange' } );
var cube = new THREE.Mesh( geometry, material );
scene.background = new THREE.Color( 0x1f1f1f );
cube.userData.URL = "https://lu-sife.github.io/Puzzle-Crawler/";

scene.add( cube );


var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
	var outlineMesh = new THREE.Mesh( geometry, outlineMaterial2 );
	outlineMesh.scale.multiplyScalar(1.15);
	scene.add( outlineMesh );


camera.position.z = 5;

var bobbing_counter = 0;
var r = 255;
var g = 0;
var b = 255;
var color_cycle = "";
	
//Rainbow Cycling text
	color_interval = setInterval(function() {
//red calc
	if (r == 255) {
//subtract blue if not empty yet
		if (b != 0) {b--;}
//if it is empty (red only) add green
		else if (g != 255) { g++;}
//green calc
	} if (g == 255) {
//subtract red if not empty yet
		if (r != 0) {r--;}
//if it is empty (green only) increase blue
		 else if (b != 255) {b++;}
//blue calc
	} if (b == 255) {
//subtract green if its not empty yet
		if (g != 0) {g--;}
//if it is empty (blue only) increase red
		 else if (r != 255) {r++;}
	}
	color_cycle = "rgb(" + r + ", " + g + ", " + b + ")";
	
	//place rainbow elements here!
	},10);
function hoverPieces() {
	
	raycaster.setFromCamera(mouse, camera);
	const intersects = 	raycaster.intersectObjects(scene.children);
	if (intersects.length > 1) {
		
		currently_moving = 1;
    const newMaterial = intersects[0].object.material.clone();
    newMaterial.color.setHex(0xff8c00);
    intersects[0].object.material = newMaterial;
	last_intersect = intersects;
	intersection_counter = 1;
	} else {
		currently_moving = 0;
		cube.material = material2;
		intersection_counter = 0;
	}
	
}

function animate() {
	window.requestAnimationFrame( animate );
	if (currently_moving != 1) {
		
		outlineMesh.quaternion.rotateTowards(quaternion2, 0.1);
		cube.quaternion.rotateTowards(quaternion2, 0.1);
	} else {
		
		outlineMesh.quaternion.rotateTowards(quaternion3, 0.1);
		cube.quaternion.rotateTowards(quaternion3, 0.1);
		
	}
	
	if (bobbing_counter == 0) {
		if (cube.position.y < 0.20) {
			
			outlineMesh.position.y += 0.005;
			cube.position.y += 0.005;
		} else {
			bobbing_counter = 1;
		}
		
	} else {
		if (cube.position.y > -0.20) {
			outlineMesh.position.y -= 0.005;
			cube.position.y -= 0.005;
		} else {
			bobbing_counter = 0;
		}
	}
	
	hoverPieces();
	renderer.render( scene, camera );
}

window.addEventListener('click', onMouseClick, false);
window.addEventListener( 'mousemove', onMouseMove, false);
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
mouse.x = -1;
mouse.y = -1;
function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function onMouseClick() {
	if (intersection_counter == 1) {
		window.open(cube.userData.URL, '_blank');
	}
	
}
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();