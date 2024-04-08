import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'


import ChackraFont from '../public/Chakra Petch_Bold.json'

export function bgRotationSystem(scene: THREE.Scene, texture:THREE.Material): THREE.Mesh {

    function getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    // Geometry
    let cubeGeometry = new THREE.BoxGeometry(8, 4.5, 0.01); // Adjust the size as needed

    // Material
    const material = new THREE.MeshNormalMaterial( {
        normalScale: new THREE.Vector2( 0.15, 0.15 ),
        matcap: texture
    } );

    // Définir le point central autour duquel placer les cubes
    const centerPoint = new THREE.Vector3(0, 0, 0); // Centre de la scène

    // Définir le rayon autour du point central
    const radius = 10;

    // Nombre de cubes à placer
    const numberOfCubes = 5;

    // Angle entre chaque cube
    const angleIncrement = (2 * Math.PI) / numberOfCubes;
    const cubeGroup = new THREE.Group();

    // Parcourir les cubes et les placer autour du point central
    for (let i = 0; i < numberOfCubes; i++) {
        // Calculer l'angle actuel
        const angle = i * angleIncrement;

        // Calculer les coordonnées x et z du cube en fonction de l'angle et du rayon
        const x = centerPoint.x + radius * Math.cos(angle);
        const z = centerPoint.z + radius * Math.sin(angle);

        // Créer le cube
        const cube = new THREE.Mesh(cubeGeometry, material);

        // Positionner le cube aux coordonnées calculées
        cube.position.set(x, centerPoint.y, z);

        // Ajouter le cube à la scène
        scene.add(cube);

        cubeGroup.add(cube);
    }


    //GROUPS + ROTATIONS

    // Ajouter le groupe à la scène
    scene.add(cubeGroup);

    // Fonction d'animation pour faire tourner le groupe de cubes autour du point central
    function animate() {
        requestAnimationFrame(animate);

            // Faire tourner le groupe de cubes autour du point central
            cubeGroup.rotation.y += 0.005; // Vitesse de rotation

            cubeGroup.children.forEach((cube: THREE.Mesh) => {

                const cubeAmp = getRandomNumber(0.001,0.01);



                cube.rotation.x += cubeAmp ; // Applique la rotation en radians
                cube.rotation.y += cubeAmp ;
                cube.rotation.z += cubeAmp;
            });
        
    }
    animate();










    return { };
}