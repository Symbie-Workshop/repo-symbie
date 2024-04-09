import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'

import { setupScene, SceneSetupResult } from './sceneSetup';
import { materializeTexture } from './materializeTexture';
import { bgRotationSystem } from './bgRotationSystem';

// Initialisation de la scène - Window Size - canvas
const { scene, sizes, canvas, matcapTexture, textureLoader }: SceneSetupResult = setupScene();

const testTexture = textureLoader.load('/textures/test.jpg') //load custom texture out of sceneSetup

// Mouse
const mouse = new THREE.Vector2()

//////// FUTURE BOOK //////////
// Geometry
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Adjust the size as needed

    // Material
    const material = new THREE.MeshNormalMaterial( {
        normalScale: new THREE.Vector2( 0.15, 0.15 ),
        map: matcapTexture
    } );

const materialTest: THREE.MeshBasicMaterial = materializeTexture(testTexture);

console.log(materialTest)

// Mesh
const cube = new THREE.Mesh( cubeGeometry, material );
// Add the mesh to the scene
scene.add(cube);


bgRotationSystem(scene,materialTest);

// -------    Particles start   ----------
 
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const particleTexture = textureLoader.load('/textures/5.png')

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.4,
    sizeAttenuation: true,
    color: '#a67c00',
    transparent: true,
    alphaMap: particleTexture,
    alphaTest: 0.001,
    depthTest: false,
    vertexColors: false,
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// -------    Particles end   ----------


// Define the target mesh (assuming you have a cube mesh named 'cube')
const targetMesh = cube;

// -------    Camera & Controls start   ----------

// Define camera variables
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
camera.position.set(0, 0, 5); // Initial position relative to the target
scene.add(camera);

const controls = new OrbitControls( camera, canvas );
controls.enableZoom = false;
controls.rotateSpeed  = .3
controls.update();

// -------    Camera & Controls end   ----------

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})

// Update renderer size
renderer.setSize(sizes.width-1, sizes.height-1)
console.log(sizes.width+" : "+sizes.height)
    // Mettez à jour la taille du canvas en fonction de la nouvelle taille de la fenêtre
    canvas.style.width = document.documentElement.clientWidth-1 + 'px';
    canvas.style.height = document.documentElement.clientHeight-1 + 'px';
    // Mettez à jour la taille de rendu de Three.js
    renderer.setSize(document.documentElement.clientWidth-1, document.documentElement.clientHeight-1);
    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
    camera.updateProjectionMatrix();


// Écoutez l'événement de redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Mettez à jour la taille du canvas en fonction de la nouvelle taille de la fenêtre
    canvas.style.width = document.documentElement.clientWidth-1 + 'px';
    canvas.style.height = document.documentElement.clientHeight-1 + 'px';
    // Mettez à jour la taille de rendu de Three.js
    renderer.setSize(document.documentElement.clientWidth-1, document.documentElement.clientHeight-1);
    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
    camera.updateProjectionMatrix();
});


// Define mouse variables
let prevMouseX: number | null = null;
let prevMouseY: number | null = null;


// Set initial mouse position and mesh location when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Once the DOM is loaded
    // Set initial mouse and cube position to the center of the screen
    prevMouseX = 0;
    prevMouseY = 0; 
    // mouse.x = prevMouseX;
    // mouse.y = prevMouseY;
    cube.position.x = prevMouseX;
    cube.position.y = prevMouseY;
});

// Update mouse coordinates on mouse move
document.addEventListener('mousemove', (event) => {
    // Capture initial mouse position if it hasn't been captured yet
    if (!prevMouseX || !prevMouseY) {
        prevMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        prevMouseY = (event.clientY / window.innerHeight) * 2 + 1;

        return; // Exit the event listener to avoid further processing
    }
     
    // Normalize mouse coordinates to the range [-1, 1]
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (event.clientY / window.innerHeight) * 2 + 1;
    // Calculate the change in mouse position
    const deltaX = mouseX - prevMouseX;
    const deltaY = mouseY - prevMouseY;

    // Update previous mouse position
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    // Move camera around the target based on mouse movement
    moveCamera(deltaX, deltaY);

    // Rotate the cube based on mouse movement
    rotateCube(deltaX, deltaY);
});

function moveCamera(deltaX: number, deltaY: number) {
    // Define movement speed
    const movementSpeed = 0.05;

    // Calculate new position relative to the target
    const newPosition = camera.position.clone();

    // Rotate camera around the target (horizontal movement)
    newPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), - deltaX * movementSpeed);

    // Move camera up or down (vertical movement)
    newPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), - deltaY * movementSpeed);

    // Set the new camera position
    camera.position.copy(newPosition);

    // Make the camera always look at the target
    camera.lookAt(targetMesh.position);
}


function rotateCube(deltaX: number, deltaY: number) {
    // Define rotation speed for the cube
    const rotationSpeed =.2;

    // Rotate the cube based on mouse movement
    cube.rotation.y += deltaX * rotationSpeed;
    cube.rotation.x += deltaY * rotationSpeed;
}

// Rotate particles group
function rotateParticles() {
    particles.rotation.y += 0.001;
}

// Clock
// const clock = new THREE.Clock();

const tick = () => {
    rotateParticles();
    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
