import * as THREE from 'three';

// SET THE SCENE
const scene = new THREE.Scene();
// END

// SET THE BACKGROUND COLOR
scene.background = new THREE.Color(0xAAAAAA);
// END

// SET THE CAMERA
const fov = 40;
const aspect = 2; //canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;
// END




