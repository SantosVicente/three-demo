import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Pagani = ({ isMobile }) => {
  const pagani = useGLTF("./pagani_huayra/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={4.75} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight intensity={6000} />
      <ambientLight intensity={0} />
      <primitive
        object={pagani.scene}
        scale={isMobile ? 25 : 50}
        position={isMobile ? [0, -40, -2.2] : [0, -40.5, 0]}
      />
    </mesh>
  );
};

const PaganiCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1100px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [250, 3, 250], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Pagani isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PaganiCanvas;
