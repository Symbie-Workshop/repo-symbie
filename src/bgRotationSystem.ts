import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'


import ChackraFont from '../public/Chakra Petch_Bold.json'

export function bgRotationSystem(scene: THREE.Scene, texture:THREE.Material): THREE.Mesh {

    // Geometry
    let cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Adjust the size as needed

    // Material
    const material = new THREE.MeshNormalMaterial( {
        normalScale: new THREE.Vector2( 0.15, 0.15 ),
        matcap: texture
    } );

    // Mesh
    const cube = new THREE.Mesh( cubeGeometry, material );
    // Add the mesh to the scene
    scene.add(cube);

    return { };
}