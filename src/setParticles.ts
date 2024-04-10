import * as THREE from 'three';

export const setParticles = (scene : any, textureLoader : any) => {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const positions = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleTexture = textureLoader.load('/textures/5.png')
  
  const particlesMaterial = new THREE.PointsMaterial({
      size: 0.4,
      sizeAttenuation: true,
      color: '#ffffff',
      transparent: true,
      alphaMap: particleTexture,
      alphaTest: 0.001,
      depthTest: false,
      vertexColors: false,
  })
  
  return new THREE.Points(particlesGeometry, particlesMaterial)
  
  }