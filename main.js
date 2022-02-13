import './style.css'

/* document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>` */



import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
 



//LIGHT
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 5, 600);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(400, 100)
const lightHelper = new THREE.PointLightHelper(pointLight)
/* scene.add(lightHelper, gridHelper) */





//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);


//ADD STAR
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar) 

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;




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
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun);

sun.position.set(25, 5, 600);


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



// AVATAR
const jonathanTexture = new THREE.TextureLoader().load('IMG_6100.JPG');
const jonathan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3, 3),
  new THREE.MeshBasicMaterial( { map: jonathanTexture })
);
/* scene.add(jonathan) */



//EARTH
const earthTexture = new THREE.TextureLoader().load('earth.jpg')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(-10, 0, 30);
scene.add(earth);





//MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
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

    //MOONS ROTATION AROUND EARTH
    moon.position.x = 15*Math.cos(t) + earth.position.x;
    moon.position.z = 15*Math.sin(t) + earth.position.z; 

    renderer.render(scene, camera); 
} 
render();





function animate() {
  requestAnimationFrame(animate);
  

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  earth.rotation.y += 0.001;

  sun.rotation.y += 0.001;
  

  controls.update();

  renderer.render( scene, camera );
}

animate()











