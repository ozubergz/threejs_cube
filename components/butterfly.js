import * as THREE from 'three';

let scene, camera, renderer, triangle;

let customGeometry = function(z) {
    // create geometry
    let geometry = new THREE.Geometry();
    
    // create corners
    geometry.vertices.push(new THREE.Vector3(1.5, 0, 0)); //vertices[0]
    geometry.vertices.push(new THREE.Vector3(0, 1, 0)); //vertices[1]
    geometry.vertices.push(new THREE.Vector3(0, 0, z)); //vertices[2]

    geometry.faces.push(new THREE.Face3(0, 1, 2));

    let material = new THREE.MeshBasicMaterial({
        color: 0xa37eba,
        side: THREE.DoubleSide
    });

    triangle = new THREE.Mesh(geometry, material);
    
    
    triangle.rotation.x = 5

    scene.add(triangle);
    
}

let init = function() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    customGeometry(1);
    customGeometry(-1);

    // camera.rotation.x = 1;
    
    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

let animate = function() {
    // triangle.rotation.y += 0.01;
    // triangle.rotation.y += 0.01;

    // camera.rotation.x += 0.01

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
animate();

