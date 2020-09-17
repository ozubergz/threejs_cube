import * as THREE from 'three';
import { Face3, AddEquation } from 'three';

let scene, camera, renderer, butterfly, ADD = 0.1;

let createButterfly = function() {
    // create geometry
    let geometry = new THREE.Geometry();

    let material = new THREE.MeshBasicMaterial({
        color: 0xa37eba,
        side: THREE.DoubleSide,
    });

    butterfly = new THREE.Mesh(geometry, material);
    
    // create corners
    geometry.vertices.push(new THREE.Vector3(0, 0, 0)); //vertices[0]
    geometry.vertices.push(new THREE.Vector3(2, 0, 0)); //vertices[1]
    geometry.vertices.push(new THREE.Vector3(.7, 1, .6)); //vertices[2]
    geometry.vertices.push(new THREE.Vector3(.7, 1, -.6)); //vertices[3]

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 1, 3));

    butterfly.rotation.z = 0.6;
    butterfly.rotation.y = 0.2;

    scene.add(butterfly);
}

let init = function() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    createButterfly();
    
    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

let animate = function() {

    butterfly.geometry.vertices[2].y += ADD;
    butterfly.geometry.vertices[3].y += ADD;
    butterfly.geometry.verticesNeedUpdate = true;

    if(butterfly.geometry.vertices[2].y < -1 || butterfly.geometry.vertices[2].y > 1) {
        ADD *= -1
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
animate();

