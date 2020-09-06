import * as THREE from 'three';

// SET THE SCENE
const scene = new THREE.Scene();
// END

// SET THE BACKGROUND COLOR
scene.background = new THREE.Color(0xAAAAAA);
// END

// SET THE CAMERA
const fov = 40;
const aspect = 2; //canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;
// END

const objects = [];
const spread = 15;

// ADD OBJECTS
function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
}
// END

// CREATES RANDOM COLOR MATERIAL
function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}
// END

function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
}







