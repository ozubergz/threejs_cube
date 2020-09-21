import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Earth from '../public/Earth.glb';


let scene, 
    camera, 
    renderer,
    loader,
    model,
    ADD = 0.01;

function load3dModel() {
    loader = new GLTFLoader();
    loader.load(Earth, function(gltf) {
        model = gltf.scene;
        scene.add(model)
    });
}

function init() {
    // set up environment
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    load3dModel();

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    if(model) model.rotation.y += ADD;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
animate();