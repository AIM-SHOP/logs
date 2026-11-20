import React from 'react'

export interface CharacterProps {
  position?: [number, number, number]
  bodyRotY?: number
  spineAngle?: number      // forward lean (radians, positive = forward)
  headRotY?: number        // head turn (radians)
  leftArmAngle?: number    // arm Z rotation (positive = raise up)
  rightArmAngle?: number   // arm Z rotation (negative = raise up)
  leftArmForward?: number  // arm X rotation forward
  rightArmForward?: number
  mode?: 'standing' | 'sitting' | 'lying-back' | 'lying-side'
  color?: string
  opacity?: number
}

const MAT = '#d8d8d8'

export const Character: React.FC<CharacterProps> = ({
  position = [0, 0, 0],
  bodyRotY = 0,
  spineAngle = 0,
  headRotY = 0,
  leftArmAngle = 0.15,
  rightArmAngle = -0.15,
  leftArmForward = 0,
  rightArmForward = 0,
  mode = 'standing',
  color = MAT,
  opacity = 1,
}) => {
  const transparent = opacity < 1

  const mat = (c = color) => (
    <meshStandardMaterial
      color={c}
      roughness={0.55}
      metalness={0.08}
      opacity={opacity}
      transparent={transparent}
    />
  )

  // Lying: rotate entire group
  const liingRotX = mode === 'lying-back' ? -Math.PI / 2 : mode === 'lying-side' ? -Math.PI / 2 : 0
  const lyingOffsetY = mode === 'lying-back' || mode === 'lying-side' ? 0.9 : 0
  const lyingOffsetZ = mode === 'lying-back' || mode === 'lying-side' ? -0.9 : 0

  return (
    <group position={[position[0], position[1], position[2]]} rotation={[0, bodyRotY, 0]}>
      <group rotation={[liingRotX, 0, 0]} position={[0, lyingOffsetY, lyingOffsetZ]}>

        {/* HEAD */}
        <group position={[0, 1.68, 0]} rotation={[0, headRotY, 0]}>
          <mesh>
            <sphereGeometry args={[0.165, 20, 14]} />
            {mat()}
          </mesh>
        </group>

        {/* NECK */}
        <mesh position={[0, 1.52, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.13, 10]} />
          {mat()}
        </mesh>

        {/* SPINE GROUP (lean) */}
        <group position={[0, 0.9, 0]} rotation={[spineAngle * 0.5, 0, 0]}>
          {/* TORSO */}
          <mesh position={[0, 0.27, 0]}>
            <boxGeometry args={[0.36, 0.52, 0.2]} />
            {mat()}
          </mesh>

          {/* SHOULDER BAR */}
          <mesh position={[0, 0.51, 0]}>
            <boxGeometry args={[0.5, 0.09, 0.19]} />
            {mat()}
          </mesh>

          {/* LEFT ARM */}
          <group
            position={[-0.3, 0.42, leftArmForward * 0.3]}
            rotation={[leftArmForward * 0.9, 0, leftArmAngle]}
          >
            <mesh position={[0, -0.18, 0]}>
              <cylinderGeometry args={[0.065, 0.058, 0.36, 10]} />
              {mat()}
            </mesh>
            <mesh position={[0, -0.37, 0]}>
              <sphereGeometry args={[0.055, 8, 8]} />
              {mat()}
            </mesh>
            <group position={[0, -0.37, 0]} rotation={[0.25, 0, 0]}>
              <mesh position={[0, -0.15, 0]}>
                <cylinderGeometry args={[0.052, 0.045, 0.3, 10]} />
                {mat()}
              </mesh>
            </group>
          </group>

          {/* RIGHT ARM */}
          <group
            position={[0.3, 0.42, rightArmForward * 0.3]}
            rotation={[rightArmForward * 0.9, 0, rightArmAngle]}
          >
            <mesh position={[0, -0.18, 0]}>
              <cylinderGeometry args={[0.065, 0.058, 0.36, 10]} />
              {mat()}
            </mesh>
            <mesh position={[0, -0.37, 0]}>
              <sphereGeometry args={[0.055, 8, 8]} />
              {mat()}
            </mesh>
            <group position={[0, -0.37, 0]} rotation={[0.25, 0, 0]}>
              <mesh position={[0, -0.15, 0]}>
                <cylinderGeometry args={[0.052, 0.045, 0.3, 10]} />
                {mat()}
              </mesh>
            </group>
          </group>
        </group>

        {/* PELVIS */}
        <mesh position={[0, 0.74, 0]}>
          <boxGeometry args={[0.35, 0.14, 0.2]} />
          {mat()}
        </mesh>

        {/* LEGS */}
        {(mode === 'standing' || mode === 'lying-back' || mode === 'lying-side') && (
          <>
            {/* Left leg */}
            <group position={[-0.1, 0.72, 0]}>
              <mesh position={[0, -0.26, 0]}>
                <cylinderGeometry args={[0.088, 0.078, 0.52, 10]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.53, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.7, 0]}>
                <cylinderGeometry args={[0.072, 0.065, 0.35, 10]} />
                {mat()}
              </mesh>
            </group>
            {/* Right leg */}
            <group position={[0.1, 0.72, 0]}>
              <mesh position={[0, -0.26, 0]}>
                <cylinderGeometry args={[0.088, 0.078, 0.52, 10]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.53, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.7, 0]}>
                <cylinderGeometry args={[0.072, 0.065, 0.35, 10]} />
                {mat()}
              </mesh>
            </group>
          </>
        )}

        {mode === 'sitting' && (
          <>
            {/* Left thigh horizontal + shin down */}
            <group position={[-0.11, 0.59, 0]}>
              <mesh rotation={[Math.PI / 2 - 0.08, 0, 0]} position={[0, 0, 0.27]}>
                <cylinderGeometry args={[0.088, 0.078, 0.54, 10]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.06, 0.54]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.26, 0.54]}>
                <cylinderGeometry args={[0.072, 0.065, 0.4, 10]} />
                {mat()}
              </mesh>
            </group>
            <group position={[0.11, 0.59, 0]}>
              <mesh rotation={[Math.PI / 2 - 0.08, 0, 0]} position={[0, 0, 0.27]}>
                <cylinderGeometry args={[0.088, 0.078, 0.54, 10]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.06, 0.54]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                {mat()}
              </mesh>
              <mesh position={[0, -0.26, 0.54]}>
                <cylinderGeometry args={[0.072, 0.065, 0.4, 10]} />
                {mat()}
              </mesh>
            </group>
          </>
        )}
      </group>
    </group>
  )
}
