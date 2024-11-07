import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';

const main_canvas = document.getElementById("main-canvas");

const n = 1;
let cwidth = 640 / n;
let cheight = 640 / n;
main_canvas.setAttribute("width", cwidth + "px");
main_canvas.setAttribute("height", cheight + "px");

const scene = new THREE.Scene({alpha: true});
const camera = new THREE.PerspectiveCamera(75, main_canvas.clientWidth / main_canvas.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: main_canvas,
});

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const material = new THREE.MeshStandardMaterial({ color: "red", emissive: 'red', emissiveIntensity: 0});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.set(0,1.64,0.3); // adventurer
camera.position.set(0,2.1,1);
// camera.position.z = 5;
var light = new THREE.DirectionalLight( 'white', 2.5 );
light.castShadow = true;
light.position.set( 1, 0.5, 2 );
scene.add( light );

const loader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader(dLoader);

loader.load('./assets/dimoni_animated.glb', function(glb) {
    const model = glb.scene;
    scene.add(model);
});

// load_character();
//   function load_character() {

//     const loader = new GLTFLoader();
    
//     loader.load( './assets/Adventurer.glb', ( glb ) => {
      
//       glb.scene.position.set(0, 0, 0);
//       glb.scene.traverse(o => {
//         if (o.isMesh) {
//           o.castShadow = true;
//           o.receiveShadow = true;
//         }
//       });    
//       scene.add( glb.scene );
//     }); 
//   }

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.y += 0.001;
  // cube.rotation.x += 0.002;
  renderer.render(scene, camera);
}

animate();

let mobile = false;

if(window.matchMedia("(any-hover: none)").matches) {
  // do something
  mobile = true;
  console.log('triggeredddd');
}

let lastKnownScrollPosition = 0;
let ticking = false;

function onMouseMove(event) {
  // console.log(event.clientX, event.clientY);
  // console.log(light.position);
  // mobile = false;
  light.position.set(
      (event.clientX / window.innerWidth) * 5 - 2,
      -(event.clientY / window.innerHeight) * 5 + 2,
      2
  );
}




if (!mobile){
  window.addEventListener('mousemove', onMouseMove);
}
 else {
  document.addEventListener("scroll", (event) => {
    lastKnownScrollPosition = window.scrollY;
  
    if (!ticking) {
      window.requestAnimationFrame(() => {
        doSomething(lastKnownScrollPosition);
        ticking = false;
      });
  
      ticking = true;
    }
  });
 }


function doSomething(scrollPos) {
  // Do something with the scroll position
  light.position.set(
    (Math.sin(scrollPos/100) * 1000 / window.innerWidth),
    -(Math.cos(scrollPos/100) * 1000 / window.innerWidth),
    2
  );
}

