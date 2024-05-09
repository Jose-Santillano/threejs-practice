/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { pointsInner, pointsOuter } from "./components/utils";

const ThreeLanding = () => {
  return (
    <div className="relative">
      <Canvas camera={{ position: [10, -7.5, -5], }} className="bg-[#101010]" style={{ height: "100vh" }}>
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
      <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none text-center">
        This is a test of the Three.js landing page.
      </h1>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={ref}>
      {pointsInner.map(point => <Point key={point.idx} position={point.position} color={point.color} />)}
      {pointsOuter.map(point => <Point key={point.idx} position={point.position} color={point.color} />)}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
      />
    </Sphere>
  );
};

export default ThreeLanding;
