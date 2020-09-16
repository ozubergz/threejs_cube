import * as THREE from 'three';
import { WireframeGeometry } from 'three';

let scene, camera, renderer, sphere, torus, ADD = 0.01;

function createSphere() {
    let geometry = new THREE.SphereGeometry(1, 30, 30);
    let material = new THREE.MeshBasicMaterial({
        color: 0x006a71,
        wireframe: true
    });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function createTorus() {
    let geometry = new THREE.TorusGeometry(1.5, .3, 2, 40);
    let material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    });
    torus = new THREE.Mesh(geometry, material);
    
    // torus.rotation.x = 1.7;
    // torus. = 0.5;
    torus.rotation.y = -1.5;

    scene.add(torus);
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    createSphere();
    createTorus();

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
