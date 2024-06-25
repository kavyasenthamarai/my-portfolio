import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

// Styled component for the home container
const HomeContainer = styled.section`
  padding: 2rem;
  text-align: center;
  background-color: #fef0eb;
  color: #333;
  height: 100vh;
  overflow-y: auto;
`;

// Styled component for the 3D model container
const ModelContainer = styled.div`
  width: 100%;
  height: 500px; // Increased height for the 3D model container
  margin: 2rem auto; // Center the container with a little margin from top and bottom
  overflow: hidden;
`;

// 3D Model component
const Model = () => {
  const gltf = useGLTF('/models/anime_girl/scene.gltf');
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.PI / 8; // Initial rotation for a better view
    }
  }, []);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1; // Rotate the model continuously
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} position={[0, -2, 0]} />; // Adjusted position
};

// Home component
const Home = () => {
  return (
    <HomeContainer id="home">
      <h1>Welcome to Kavya K's Personal Blog</h1>
      <p>This is a place where I share my journey, experiences, and projects. Explore and enjoy!</p>
      <ModelContainer>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          <Model />
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 3} 
          />
        </Canvas>
      </ModelContainer>
    </HomeContainer>
  );
};

export default Home;
