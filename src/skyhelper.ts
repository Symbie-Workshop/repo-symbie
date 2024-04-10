import * as THREE from 'three';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';
import { RGBMLoader } from 'three/addons/loaders/RGBMLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
export const setSkySphere = ( scene : any , imagePath : string) => {

    let hdrCubeMap : any, renderer : any;
    let hdrCubeRenderTarget : any;

    renderer = new THREE.WebGLRenderer();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileCubemapShader();
    THREE.DefaultLoadingManager.onLoad = function ( ) {
        pmremGenerator.dispose()
    };

   let hdrTexture = new RGBELoader().load(imagePath)
   
   let skySphereGeometry = new THREE.SphereGeometry(300, 60, 60);
   let skySphereMaterial = new THREE.MeshPhongMaterial({
     map: hdrTexture
   });
   
   console.log("Sky sphere material: ", skySphereMaterial)
   skySphereMaterial.side = THREE.BackSide;
   let skySphereMesh = new THREE.Mesh(skySphereGeometry, skySphereMaterial);
   console.log("Sky sphere: ", skySphereMesh)
   scene.add(skySphereMesh);
 }