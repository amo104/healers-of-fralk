import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"

const backpackUrl = new URL('../assets/backpack.obj', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);


document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbac0c1 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();


const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
// const sphereMaterial = new THREE.MeshStandardMaterial({
//     color: 0x00FF00,
//     wireframe: false});
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(sphere);
// sphere.castShadow = true;

const assetLoader = new OBJLoader();
assetLoader.load(backpackUrl, function(obj){
    scene.add(obj);
}, undefined, function(error){
    console.error(error);
})

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.castShadow = true;

// const gui = new dat.GUI();

// const options = {
//     sphereColor: "#E7683E",
//     wireframe: false
// };

// gui.addColor(options, "sphereColor").onChange(function (e){
//     sphere.material.color.set(e);
// });

// gui.add(options, "wireframe").onChange(function(e){
//     sphere.material.wireframe = e;
// })

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);