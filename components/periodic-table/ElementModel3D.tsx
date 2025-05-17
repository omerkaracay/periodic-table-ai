"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

interface ElementModel3DProps {
  modelUrl: string;
}

export function ElementModel3D({ modelUrl }: ElementModel3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Canvas>
        <Stage environment="city" intensity={0.6}>
          <Model url={modelUrl} />
        </Stage>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}
