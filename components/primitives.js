import * as THREE from 'three';

//SET RENDERER
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGL1Renderer({canvas});
// END

// SET THE CAMERA
const fov = 40;
const aspect = 2; //canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;
// END

// SET THE SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);
// END

// SET LIGHTS
{
    const color = 0xFFFFFF;
    const intesity = 1;
    const light = new THREE.DirectionalLight(color, intesity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

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


// ADD SOLID GEOMETRY TO OBJECTS & SCENE
function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
}
// END

// NOTE: BufferGeometry can not have new vertices easily added.
// Whereas Geometry can add vertices as you go

{
    const width = 8;
    const height = 8;
    const depth = 8;
    addSolidGeometry(-2, -2, new THREE.BoxBufferGeometry(width, height, depth));
}

{
    const radius = 7;
    const segments = 24;
    addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(radius, segments));
}

{
    const radius = 6;
    const height = 8;
    const segments = 16;
    addSolidGeometry(0, 2, new THREE.ConeBufferGeometry(radius, height, segments));
}

{
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 12;
    addSolidGeometry(1, 2, new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments));
}

{
    const radius = 7;
    addSolidGeometry(2, 2, new THREE.DodecahedronBufferGeometry(radius));
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2,
    };

    addSolidGeometry(-2, 1, new THREE.ExtrudeBufferGeometry(shape, extrudeSettings));
  }
  {
    const radius = 7;
    addSolidGeometry(-1, 1, new THREE.IcosahedronBufferGeometry(radius));
  }
  {
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
    }
    addSolidGeometry(0, 1, new THREE.LatheBufferGeometry(points));
  }
  {
    const radius = 7;
    addSolidGeometry(1, 1, new THREE.OctahedronBufferGeometry(radius));
  }

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

function animate(time) {
    time *= 0.001;

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	
	objects.forEach((obj, ndx) => {
		const speed = 1 + ndx * .1;
		const rot = time * speed;
		obj.rotation.x = rot;
		obj.rotation.y = rot;
	  });

	renderer.render(scene, camera);
    
    requestAnimationFrame(animate);
}

animate();





