import * as THREE from 'three';

//SET RENDERER
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGL1Renderer({canvas});
// END

// SET THE CAMERA
const fov = 40;
const aspect = 2; //canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;
// END

// SET THE SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);
// END

const objects = [];
const spread = 15;

// ADD OBJECTS
function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
}
// END

// CREATES RANDOM COLOR MATERIAL
function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}
// END


// ADD SOLID GEOMETRY TO OBJECTS & SCENE
function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
}
// END

{
    const width = 8;
    const height = 8;
    const depth = 8;
    addSolidGeometry(-2, -2, new THREE.BoxBufferGeometry(width, height, depth));
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

function animate(time) {
    time *= 0.001;

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	
	objects.forEach((obj, ndx) => {
		const speed = 1 + ndx * .1;
		const rot = time * speed;
		obj.rotation.x = rot;
		obj.rotation.y = rot;
	  });

	renderer.render(scene, camera);
    
    requestAnimationFrame(animate);
}

animate();





