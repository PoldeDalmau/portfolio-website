import * as THREE from 'three';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const clock = new THREE.Clock();


const main_canvas = document.getElementById("second-canvas");

const n = 1;
let cwidth = 640 / n;
let cheight = 640 / n;
main_canvas.setAttribute("width", cwidth + "px");
main_canvas.setAttribute("height", cheight + "px");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, main_canvas.clientWidth / main_canvas.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: main_canvas
  // alpha: true
});

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const material = new THREE.MeshStandardMaterial({ color: "red", emissive: 'red', emissiveIntensity: 0});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.set(0,5.5,2.5);
camera.rotateY(0.2);
var light = new THREE.DirectionalLight( 'white', 0.5 );
light.position.set( 1, 1, 1 );
scene.add( light );

var ambient = new THREE.AmbientLight('white', 0.5);
scene.add(ambient);

scene.background = new THREE.Color(0x72809e); // dark
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
let head;
const model = new Promise((res, rej) => {
  const loader = new FBXLoader();
  loader.load('./assets/low_poly_man.fbx', (fbx) => {
    fbx.scale.setScalar(0.01);
    fbx.traverse(c => {
      c.castShadow = true;
    });
    head = fbx.getObjectByName('mixamorigHead');
    res(fbx);
  });
})


const animation1 = new Promise((res, rej) => {
  const loader = new FBXLoader();
  loader.load('./assets/Waving.fbx', (fbx) => {
    res(fbx);
  });
})
const animation2 = new Promise((res, rej) => {
  const loader = new FBXLoader();
  loader.load('./assets/Arm Stretching.fbx', (fbx) => {
    res(fbx);
  });
})

const combo = Promise.all([model, animation1, animation2]);


combo.then(object=>{
  scene.add(object[0]);
  mixer = new THREE.AnimationMixer( object[0] );
  object[0].animations = object[1].animation;
  const action1 = mixer.clipAction(object[1].animations[0]);
  action1._clip.name = 'waving';
  const action2 = mixer.clipAction(object[2].animations[0]);
  action2._clip.name = 'armstretching';
  action1.play();
  // action1.loop = THREE.LoopOnce;
  action2.loop = THREE.LoopOnce;
  let wave_counter = 0;
  mixer.addEventListener('finished', function(e) {
    if(e.action._clip.name == 'waving' && wave_counter < 5){
      wave_counter++;
      action1.reset();
      action1.play();
      if (wave_counter == 4){
        wave_counter = 0;
        action1.stop();
        action2.play();
      }  
    } else if(e.action._clip.name == 'armstretching'){
      action2.stop();
      action1.play();
    }
  });

})

const target = new THREE.Object3D();
const mousePosition = new THREE.Vector2();
target.position.set(0.2, 5.2, 2); // good initial target position

window.addEventListener('mousemove', (e) => {
  mousePosition.x = 2 * ((e.clientX/window.innerWidth) * 2 - 1) ;
  mousePosition.y = -2 * (e.clientY/window.innerHeight) * 2 + 7 ;
  target.position.set(mousePosition.x, mousePosition.y, 2);
});

function animate() {
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);
  if (head) {
    head.lookAt(target.position);
  }

  requestAnimationFrame(animate);
  // cube.rotation.y += 0.001;
  // cube.rotation.x += 0.002;
  renderer.render(scene, camera);
  // camera.rotateX(0.1);
}

animate();
