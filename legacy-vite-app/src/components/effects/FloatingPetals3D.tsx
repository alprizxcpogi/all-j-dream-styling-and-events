import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Petal({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y -= speed * delta;
    ref.current.rotation.z += delta * 0.5;
    ref.current.rotation.x += delta * 0.2;
    if (ref.current.position.y < -8) {
      ref.current.position.y = 8;
      ref.current.position.x = (Math.random() - 0.5) * 12;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.4, 0.5]} />
      <meshStandardMaterial
        color="#d8b4a0"
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
        roughness={0.8}
      />
    </mesh>
  );
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        position: [
          (Math.random() - 0.5) * 12,
          Math.random() * 16 - 4,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 0.8,
      })),
    [],
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      {petals.map((p, i) => (
        <Petal key={i} {...p} />
      ))}
    </>
  );
}

export function FloatingPetals3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-40">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Petals />
      </Canvas>
    </div>
  );
}
