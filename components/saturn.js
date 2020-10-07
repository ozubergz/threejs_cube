import * as THREE from 'three';

let scene, 
    camera, 
    renderer, 
    ADD = 0.01;
    

function createSphere() {
    let geometry = new THREE.SphereGeometry(1, 30, 30);
    let material = new THREE.MeshBasicMaterial({color: 0xaa4a30});
    let sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

// {
//     const color = 0xFFFFFF;
//     const intensity = 1;
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.position.set(-1, 2, 4);
//     scene.add(light);
//   }


function createRing(radius, tube, color) {
    let geometry = new THREE.TorusGeometry(radius, tube, 2, 50);
    let material = new THREE.MeshBasicMaterial({color});
    let ring = new THREE.Mesh(geometry, material);
    
    ring.rotation.x = 1.7;
    ring.rotation.y = 0.3;

    scene.add(ring);
}

function createSaturn() {
    createSphere();
    createRing(1.4, .2, 0xf0a500);
    createRing(1.9, .2, 0xffcb8e);
    createRing(2.4, .2, 0xe89f71);
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    createSaturn();

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {

    camera.position.y += ADD;
    if(camera.position.y >= 1 || camera.position.y <= -1) {
        ADD *= -1;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

init();
animate();
