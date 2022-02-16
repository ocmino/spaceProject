import './style.css'

/* document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>` */


import * as THREE from 'three';
import { AmbientLight, Object3D, PointLightHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
	FileLoader,
	Loader,
	ShapePath
} from 'three';







//CREATE SCENE
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

//ADD STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 2600 ) );

  star.position.set(x, y, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar) 

const spaceTexture = new THREE.TextureLoader().load('black.jpg');
scene.background = spaceTexture;

//LIGHT, LIGHTHELPER AND GRIDHELPER
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(25, 5, 500);

//const ambientLight = new THREE.AmbientLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(2000, 100)

const lightHelper = new THREE.PointLightHelper(pointLight)
/* scene.add(lightHelper, gridHelper) */

//CONTROLS
const controls = new FlyControls(camera, renderer.domElement);

controls.movementSpeed = 1; // 2 matchar musiken bra
controls.rollSpeed = 0.1;
controls.autoForward = false;
controls.dragToLook = false;

//CAMERA
function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    earth.rotation.x += 0.05;
    earth.rotation.y += 0.075;
    earth.rotation.z += 0.05;

    jonathan.rotation.y += 0.01;
    jonathan.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;





//**********************************************************************************//

//SUN
const sunTexture = new THREE.TextureLoader().load('sun.jpg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(250, 32, 16),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun);

sun.position.set(25, 5, 2000);

// JONATHAN BOX
const jonathanTexture = new THREE.TextureLoader().load('IMG_6100.JPG');
const jonathan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3, 3),
  new THREE.MeshBasicMaterial( { map: jonathanTexture })
);
//scene.add(jonathan)

//MERCURY
const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg')
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 16),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);
mercury.position.set(0, 0, 350);
scene.add(mercury);

//VENUS
const venusTexture = new THREE.TextureLoader().load('venus.jpg')
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 16),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venus.position.set(0, 0, 200);
scene.add(venus);

// SPACESHIP
const spaceshipTexture = new THREE.TextureLoader().load('death star.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const geometry = new THREE.TorusGeometry( 5, 1.5, 8, 50)
const material = new THREE.MeshBasicMaterial( {
  map: spaceshipTexture, 
  normalMap: normalTexture
} );  
const torus = new THREE.Mesh( geometry, material );
scene.add( torus )

//EARTH
const earthTexture = new THREE.TextureLoader().load('earth.jpg')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 16),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(0, 0, 30);
scene.add(earth);

//MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);
scene.add(moon);

var t = 0;
function render() { 
    requestAnimationFrame(render); 
    t += 0.004;          

    moon.rotation.y += 0.001;

    //MOONS ORBIT AROUND EARTH
    moon.position.x = 15*Math.cos(t) + earth.position.x;
    moon.position.z = 15*Math.sin(t) + earth.position.z; 

    renderer.render(scene, camera); 
} 
render();





//FLYER
const loader = new GLTFLoader();
loader.load( 'spaceship/scene.gltf', function ( gltf ) {
  const flyer = gltf.scene
  flyer.scale.set(0.2, 0.2, 0.2);
  flyer.position.set (0, 0 , 0)
	scene.add( flyer );
}, undefined, function ( error ) {
	console.error( error );
} );








/* const flyerTexture = new THREE.TextureLoader().load('windows.jpg')
const flyer = new THREE.Mesh(
  new THREE.ConeGeometry(1,2, 32),
  new THREE.MeshStandardMaterial({
    map: flyerTexture,
  })
);

const flyerBody = new THREE.TextureLoader().load('windows.jpg')
const body = new THREE.Mesh(
  new THREE.CylinderGeometry( 1, 1, 4, 32 ),
  new THREE.MeshStandardMaterial({
    map: flyerBody,
  })
)
flyer.rotateX(90)
scene.add(flyer, body) */

//MARS
const marsTexture = new THREE.TextureLoader().load('mars.jpg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 32, 16),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
mars.position.set(0, 0, -70);
scene.add(mars);

//JUPITER
const jupiterTexture = new THREE.TextureLoader().load('jupiter.gif')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 16),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(0, 0, -500);
scene.add(jupiter);

//SATURN
const saturnTexture = new THREE.TextureLoader().load('saturn3.jpg')
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 16),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
);
saturn.position.set(0, 0, -800);
scene.add(saturn);

// SATURN RINGS
const ringsTexture = new THREE.TextureLoader().load('rings2.jpg');
const ringGeometry = new THREE.RingGeometry( 50, 80, 32 )
const ringMaterial = new THREE.MeshStandardMaterial( {
  side: THREE.DoubleSide,
  map: ringsTexture
} );  
const rings = new THREE.Mesh( ringGeometry, ringMaterial );

rings.position.set(0, 0, -800);
rings.rotation.x=90;
scene.add( rings )

//URANUS
const uranusTexture = new THREE.TextureLoader().load('uranus.jpg')
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 16),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);
uranus.position.set(0, 0, -1000);
scene.add(uranus);

//NEPTUNE
const neptuneTexture = new THREE.TextureLoader().load('neptune.png')
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 16),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.position.set(0, 0, -1200);
scene.add(neptune);

//PLUTO
const plutoTexture = new THREE.TextureLoader().load('pluto.jpg')
const pluto = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 16),
  new THREE.MeshStandardMaterial({
    map: plutoTexture,
  })
);
pluto.position.set(0, 0, -1500);
scene.add(pluto);















//**********************************************************************************//


//ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;
  

  mercury.rotation.y += 0.001;


  venus.rotation.y += 0.001;


  earth.rotation.y += 0.001;


  mars.rotation.y += 0.001;


  sun.rotation.y += 0.0008;


  jupiter.rotation.y += 0.001;


  saturn.rotation.y += 0.001;
  rings.rotation.z += 0.001;


  uranus.rotation.y += 0.001;


  neptune.rotation.y += 0.001;


  pluto.rotation.y += 0.001;
  

  controls.update(0.05);
  

  flyer.position.set(camera.position);
  flyer.position.copy( camera.position );
  flyer.rotation.copy( camera.position );
  flyer.updateMatrix();
  flyer.translateZ( - 10 );


  /* flyer.position.copy( camera.position );
  flyer.rotation.copy( camera.rotation );
  flyer.updateMatrix();
  flyer.translateZ( - 12 ); */


 /*  body.position.copy( camera.position );
  body.rotation.copy( camera.rotation );
  body.updateMatrix();
  body.translateY(-2.1);
  body.translateZ( - 8 ); */






  renderer.render( scene, camera );
}



animate()











