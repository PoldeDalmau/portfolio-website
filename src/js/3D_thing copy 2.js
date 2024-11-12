import * as THREE from 'three';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const clock = new THREE.Clock();


const main_canvas = document.getElementById("third-canvas");

const n = 1;
let cwidth = 640 / n;
let cheight = 640 / n;
main_canvas.setAttribute("width", cwidth + "px");
main_canvas.setAttribute("height", cheight + "px");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, main_canvas.clientWidth / main_canvas.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: main_canvas,
  alpha: true
});

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const material = new THREE.MeshStandardMaterial({ color: "red", emissive: 'red', emissiveIntensity: 0});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.set(0,4,5);
camera.rotateX(-0.2);
var light = new THREE.DirectionalLight( 'white', 0.5 );
light.position.set( 1, 1, 1 );
scene.add( light );

var ambient = new THREE.AmbientLight('white', 0.5);
scene.add(ambient);

// scene.background = new THREE.Color(0x72809e); // dark
// scene.background = new THREE.Color(0xF5F5DC); // beige

// const loader = new GLTFLoader();
// const dLoader = new DRACOLoader();
// dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
// dLoader.setDecoderConfig({type: 'js'});
// loader.setDRACOLoader(dLoader);

// loader.load('./assets/low_poly_man.glb', function(glb) {
//     const model = glb.scene;
//     scene.add(model);
// });

let mixer;
const model = new Promise((res, rej) => {
  const loader = new FBXLoader();
  loader.load('./assets/low_poly_man.fbx', (fbx) => {
    fbx.scale.setScalar(0.01);
    fbx.traverse(c => {
      c.castShadow = true;
    });
    res(fbx);
  });
})

const animation = new Promise((res, rej) => {
  const loader = new FBXLoader();
  loader.load('./assets/Offensive Idle.fbx', (fbx) => {
    res(fbx);
  });
    
})
const combo = Promise.all([model, animation]);


combo.then(object=>{
  scene.add(object[0]);
  mixer = new THREE.AnimationMixer( object[0] );
  object[0].animations = object[1].animation;
  const action = mixer.clipAction(object[1].animations[0]);
  action.play();
})

//   const anim = new FBXLoader();
//   anim.load('Offensive Idle.fbx', (anim) => {
//     const m = new THREE.AnimationMixer(fbx);
//     // mixers.push(m);
//     const idle = m.clipAction(anim.animations[0]);
//     idle.play();
//   });
//   scene.add(fbx);

function animate() {
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  requestAnimationFrame(animate);
  // cube.rotation.y += 0.001;
  // cube.rotation.x += 0.002;
  renderer.render(scene, camera);
  // camera.rotateX(0.1);
}

animate();
