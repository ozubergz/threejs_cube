import * as THREE from 'three';

let scene, camera, renderer, sphere;

let createSphere = () => {
    let geometry = new THREE.SphereGeometry(5, 30, 30);
    let material = new THREE.MeshBasicMaterial({color: 0xffff00});
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 5;

    createSphere();

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {

    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

init();
animate();
