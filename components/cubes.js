import * as THREE from 'three';

// SET THE SCENE
const scene = new THREE.Scene();

// SET THE CAMERA
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 5;

// Note: If you don't pass a canvas into three.js it will 
// create one for you but then you have to add it to your document. 
const canvas = document.querySelector('#c');

// SET UP RENDERER
const renderer= new THREE.WebGL1Renderer({canvas});
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();

function makeInstance(geometry, color, x) {
	const material = new THREE.MeshPhongMaterial({ color });
	const cube = new THREE.Mesh(geometry, material);

	scene.add(cube);
	
	cube.position.x = x;

	return cube;
}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
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

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	
	cubes.forEach((cube, ndx) => {
		const speed = 1 + ndx * .1;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	  });

	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}

animate();