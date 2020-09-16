import * as THREE from 'three';

let scene, camera, renderer, cube;

function createCube() {
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({color: 0x00a1cb});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function init() {
    // set up environment
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    createCube();

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
animate();

