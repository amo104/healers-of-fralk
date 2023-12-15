import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"

const staffURL = new URL("../assets/staff.obj", import.meta.url);

function init() {
    const canvas = document.getElementById("3d-container")
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.shadowMap.enabled = true;

    console.log("here")
    renderer.setSize(400, 300);


    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbac0c1);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(-20, 30, 30);
    camera.up.set(0, -1, 0);

    const assetLoader = new OBJLoader();
    assetLoader.load(staffURL, function (obj) {
        scene.add(obj);
    }, undefined, function (error) {
        console.error(error);
    })

    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
    scene.add(directionalLight);


    function animate() {
        requestAnimationFrame(animate);
        orbit.update();
        renderer.render(scene, camera);
    }

    animate();
}

// renderer.setAnimationLoop(animate);

window.onload = function () {
    init();
}