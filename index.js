const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'render_canvas';
document.body.appendChild( renderer.domElement );
document.getElementById('render_canvas').style.position = 'absolute';
document.getElementById('render_canvas').style.top = '0';
document.getElementById('render_canvas').style.left = '0';
document.getElementById('render_canvas').style.zIndex = '-1';


const geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 'orange' } );
const cube = new THREE.Mesh( geometry, material );

scene.background = new THREE.Color( 0x1f1f1f );
scene.add( cube );

camera.position.z = 5;


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
	document.getElementById("rain_bow_1").style.color = color_cycle;
	document.getElementById("title_big_text").style.color = color_cycle;
	document.getElementById("s_tier").style.color = color_cycle;
	document.getElementById("door_open").style.color = color_cycle;
	},10);
	
	




function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.material.color.set(color_cycle);
	renderer.render( scene, camera );
}
animate();
