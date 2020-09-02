import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

const renderer= new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();

function makeInstance(geometry, color, x) {
	const material = new THREE.MeshPhongMaterial({ color });
	const cube = new THREE.Mesh(geometry, material);

	scene.add(cube);
	
	cube.position.x = x;

	return cube;
}

// light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const cubes = [
	makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
]

function animate(time) {
	
	time *= 0.001;

	requestAnimationFrame(animate);
	
	cubes.forEach((cube, ndx) => {
		const speed = 1 + ndx * .1;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	  });

	renderer.render(scene, camera);
}

animate();