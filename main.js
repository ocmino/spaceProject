import './style.css'

/* document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>` */


import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';







//CREATE SCENE
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);




 

//LIGHT AND GRID
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 5, 600);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(400, 100)
const lightHelper = new THREE.PointLightHelper(pointLight)
/* scene.add(lightHelper, gridHelper) */


//CONTROLS
const controls = new FlyControls(camera, renderer.domElement);

controls.movementSpeed = 2;
controls.rollSpeed = 0.1;
controls.autoForward = false;
controls.dragToLook = false;



//ADD STAR
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 2400 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(3000).fill().forEach(addStar) 

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


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


//SUN
const sunTexture = new THREE.TextureLoader().load('sun.jpg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(250, 32, 16),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun);

sun.position.set(25, 5, 1000);


// SPACESHIP
const spaceshipTexture = new THREE.TextureLoader().load('death star.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial( {
  map: spaceshipTexture, 
  normalMap: normalTexture
} );  
const torus = new THREE.Mesh( geometry, material );
scene.add( torus )









// JONATHAN BOX
const jonathanTexture = new THREE.TextureLoader().load('IMG_6100.JPG');
const jonathan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3, 3),
  new THREE.MeshBasicMaterial( { map: jonathanTexture })
);
/* scene.add(jonathan) */


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


//DEATH STAR
const deathstarTexture = new THREE.TextureLoader().load('deathstar2.png')
const deathstar = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 16),
  new THREE.MeshStandardMaterial({
    map: deathstarTexture,
  })
);
deathstar.position.set(0, 25, - 50);
/* scene.add(deathstar); */


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
const jupiterTexture = new THREE.TextureLoader().load('jupiter.jpg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 16),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(0, 0, -500);
scene.add(jupiter);


//SATURN
const saturnTexture = new THREE.TextureLoader().load('saturn.jpg')
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 16),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
);
saturn.position.set(0, 0, -800);
scene.add(saturn);


// RINGS
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


//ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;
  

  mercury.rotation.y += 0.001;


  venus.rotation.y += 0.001;


  earth.rotation.y += 0.001;

  deathstar.rotation.y += 0.002;


  mars.rotation.y += 0.001;


  sun.rotation.y += 0.001;


  jupiter.rotation.y += 0.001;


  saturn.rotation.y += 0.001;
  rings.rotation.z += 0.001;


  uranus.rotation.y += 0.001;
  

  controls.update(0.05);


  renderer.render( scene, camera );
}





animate()











