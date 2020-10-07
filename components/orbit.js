import * as THREE from 'three';

let scene, camera, renderer;

const createSphere = () => {
    const geometry = new THREE.SphereGeometry(.5, 20, 20);
    const material = new THREE.MeshBasicMaterial({color: 0xeeeeee});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere)
}

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x373a40 );
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z =5;

    createSphere();
    
    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)
}

const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

init();
animate();