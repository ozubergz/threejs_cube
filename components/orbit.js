import * as THREE from 'three';

let scene, camera, renderer, sun, mercury, curve;

const createSun = () => {
    const geometry = new THREE.SphereGeometry(0.4, 30, 30);
    const material = new THREE.MeshBasicMaterial({color: 0xeeeeee});
    sun = new THREE.Mesh(geometry, material);

    scene.add(sun);
}

const createMercury = () => {
    const geometry = new THREE.SphereGeometry(0.2, 30, 30);
    const material = new THREE.MeshBasicMaterial({color: 0xeeeeee});
    mercury = new THREE.Mesh(geometry, material);

    scene.add(mercury);
}

const createEllipse = () => {
    // curve = new THREE.EllipseCurve(
    //     0, 0,            // ax, aY
    //     2, 2,            // xRadius, yRadius
    //     0, 2 * Math.PI,  // aStartAngle, aEndAngle
    //     false,           // aClockwise
    //     0                // aRotation
    // );

    curve = new THREE.CatmullRomCurve3( [
        // new THREE.Vector3(-10, 0, 10),
        new THREE.Vector3( -1, 0, 2),
        
        // new THREE.Vector3( -5, 5, 5 ),
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 1, -1, 2),
        // new THREE.Vector3( 10, 0, 10 )
    ]);

    curve.closed = true

    let points = curve.getPoints(50);
    let geometry = new THREE.Geometry().setFromPoints(points)
    let material = new THREE.LineBasicMaterial( { color : 0x7579e7 } );
    
    // Create the final object to add to the scene
    let ellipse = new THREE.Line( geometry, material );
    // ellipse.rotation.x = 5
    // ellipse.rotation.y = .2
    
    scene.add(ellipse);
}


const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x373a40 );
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // createSun();
    // createMercury();
    createEllipse();
    
    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)
}

let speed = 0;
let radius = 2.5;

const animate = () => {
    requestAnimationFrame(animate);

    speed += 0.01;
    // let pos = curve.getPoint(speed)
    
    // mercury.position.copy(pos)

    // mercury.position.set(pos.x, pos.y, pos.z);

    // mercury.position.x = Math.cos(speed) * radius;
    // mercury.position.z = Math.sin(speed) * radius; // These to strings make it work
    
    renderer.render(scene, camera);
}

init();
animate();