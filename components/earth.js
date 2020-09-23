import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Earth from '../public/Earth.glb';

let scene, 
    camera, 
    renderer,
    loader,
    model,
    composer,
    ADD = 0.01;

function load3dModel() {
    loader = new GLTFLoader();
    loader.load(Earth, function(gltf) {
        model = gltf.scene;

        // adds emission which makes the model to glow brighter
        model.traverse((node) => {
            if (node.isMesh) {
                console.log(node.material)
                node.material.depthWrite = false;
                node.material.transparent = true;
                node.material.opacity = .5;
                node.material.emissiveIntensity = 3;
            }
        });

        scene.add(model)
    });
}

function init() {
    // set up environment
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    load3dModel();

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    postProcessing();
}

function postProcessing() {
    // add bloom effect
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), .6, 0, 0.1);
    composer.addPass(bloomPass);
}

function animate() {
    if(model) {
        model.rotation.y += ADD;
    }
    
    requestAnimationFrame(animate);

    // renderer.render(scene, camera);
    composer.render();
}

init();
animate();