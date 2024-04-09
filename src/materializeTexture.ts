import * as THREE from 'three'


export function materializeTexture(texture:THREE.Texture): THREE.MeshBasicMaterial {

    // Material
    const material = new THREE.MeshBasicMaterial( {
        //normalScale: new THREE.Vector2( 0.15, 0.15 ),
        map: texture
    } );
    console.log(material);

    return material;

}