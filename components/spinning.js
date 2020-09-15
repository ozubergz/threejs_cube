import * as THREE from 'three';

let scene, camera, renderer;

function init() {
    // set up environment
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGL1Renderer();
    
}
