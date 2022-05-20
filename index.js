const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'render_canvas';
document.body.appendChild( renderer.domElement );
document.getElementById('render_canvas').style.position = 'absolute';
document.getElementById('render_canvas').style.top = '0';
document.getElementById('render_canvas').style.left = '0';
document.getElementById('render_canvas').style.zIndex = '-1';


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 'orange' } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();
