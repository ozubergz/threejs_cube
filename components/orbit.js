import * as THREE from 'three';

let scene, camera, renderer;

const createSphere = (size) => {
    const geometry = new THREE.SphereGeometry(size, 20, 20);
    const material = new THREE.MeshBasicMaterial({color: 0xeeeeee});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

const createEllipse = () => {
    let curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        2, 2,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    
    let points = curve.getPoints( 50 );
    let geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    
    // Create the final object to add to the scene
    let ellipse = new THREE.Line( geometry, material );
    ellipse.rotation.x = 5
    ellipse.rotation.y = .2
    
    scene.add(ellipse)
}

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x373a40 );
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z =5;

    createSphere(1);
    createEllipse();
    
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