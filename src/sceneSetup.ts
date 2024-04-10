import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import ChackraFont from '../public/Chakra Petch_Bold.json';

import { SetAmbientLighting } from './LightHelper';
import { setSkySphere } from './skyhelper';
import { setupRenderer } from '../helpers/RendererHelper.js'


export interface SceneSetupResult {
    scene: THREE.Scene;
    sizes: { width: number; height: number };
    canvas: any;
    matcapTexture:any;
    textureLoader:any;
}

const imagePath = '/sky.hdr';

export function setupScene(): SceneSetupResult {
    // Ajoutez ici la configuration de la scène

    // Canvas
    const canvas = document.querySelector('canvas')

    // Window Size

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const sizes = {
        width: windowWidth,
        height: windowHeight
    }

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load('/textures/1.png')
    matcapTexture.colorSpace = THREE.SRGBColorSpace

    // Lights
	SetAmbientLighting(scene);

    // Sky Sphere
	setSkySphere(scene, imagePath);

    // Return the scene and sizes
    return { scene, sizes, canvas, matcapTexture, textureLoader };
}

export function createGLTFModel( url : string, position : any, rotation : any, scale : any) {
    // Instantiate a loader
    const gltfLoader = new GLTFLoader();
    // Use a promise to handle the asynchronous loading
    return new Promise((resolve, reject) => {
      gltfLoader.load(
        url,
        (gltf : any) => {
          gltf.scene.scale.set(...scale);
          gltf.scene.position.set(...position);
          gltf.scene.rotation.set(...rotation);
          resolve(gltf);
        },
        undefined,
        reject
      );
    });
  }