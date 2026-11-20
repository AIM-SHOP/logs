import React, { useMemo } from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion'
import { Canvas } from '@react-three/fiber'
import { Character } from './Character'
import { Bed, Couch, Desk, Chair, Room, Floor, Table, FloorLamp } from './Props3D'

// ── Camera rig driven by Remotion frame ─────────────────────────────────────
const Cam: React.FC<{
  pos: [number, number, number]
  look: [number, number, number]
  fov?: number
}> = ({ pos, look, fov = 50 }) => {
  const { camera } = (require('@react-three/fiber') as any).useThree()
  camera.position.set(...pos)
  camera.lookAt(...look)
  if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix() }
  return null
}

// ── Scene wrapper ────────────────────────────────────────────────────────────
const S: React.FC<{
  bg?: string
  children: React.ReactNode
  cam: { pos: [number,number,number]; look: [number,number,number]; fov?: number }
  ambientColor?: string
  ambientIntensity?: number
  sunPos?: [number,number,number]
  sunColor?: string
  sunIntensity?: number
  sunPos2?: [number,number,number]
  sunColor2?: string
  sunIntensity2?: number
}> = ({
  bg = '#0a0a1a',
  children,
  cam,
  ambientColor = '#334',
  ambientIntensity = 0.5,
  sunPos = [5, 8, 5],
  sunColor = '#fff',
  sunIntensity = 1.2,
  sunPos2,
  sunColor2,
  sunIntensity2,
}) => (
  <AbsoluteFill style={{ background: bg }}>
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      camera={{ fov: cam.fov ?? 50, near: 0.05, far: 100 }}
    >
      <Cam pos={cam.pos} look={cam.look} fov={cam.fov ?? 50} />
      <ambientLight color={ambientColor} intensity={ambientIntensity} />
      <directionalLight
        position={sunPos}
        color={sunColor}
        intensity={sunIntensity}
        castShadow
      />
      {sunPos2 && (
        <directionalLight position={sunPos2} color={sunColor2 ?? '#fff'} intensity={sunIntensity2 ?? 0.5} />
      )}
      {children}
    </Canvas>
  </AbsoluteFill>
)

// ── fade helper ───────────────────────────────────────────────────────────────
const FadeOverlay: React.FC<{ opacity: number }> = ({ opacity }) =>
  opacity > 0 ? (
    <AbsoluteFill style={{ background: '#000', opacity, pointerEvents: 'none' }} />
  ) : null

function useFade(frame: number, duration: number, fadeLen = 12) {
  const fadeIn = interpolate(frame, [0, fadeLen], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const fadeOut = interpolate(frame, [duration - fadeLen, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  return Math.max(fadeIn, fadeOut)
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCÈNES
// ═══════════════════════════════════════════════════════════════════════════════

// SCÈNE 1 — Dos à dos dans le lit (0–5s, 150f)
const Scene01: React.FC<{ frame: number }> = ({ frame }) => {
  const camZ = interpolate(frame, [0, 150], [2.4, 1.6], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 150)
  return (
    <>
      <S
        bg="#05080f"
        cam={{ pos: [0, 2.5, camZ], look: [0, 0.5, 0], fov: 55 }}
        ambientColor="#1a2a4a"
        ambientIntensity={0.4}
        sunPos={[-3, 5, 2]}
        sunColor="#3355aa"
        sunIntensity={0.6}
      >
        <Room color="#0d1020" floorColor="#08080f" />
        <Bed position={[0, 0, 0]} />
        {/* Thomas — lying, facing left */}
        <group position={[-0.42, 0.52, 0.2]} rotation={[0, Math.PI, 0]}>
          <Character mode="lying-side" color="#d0d0d0" leftArmAngle={0.2} rightArmAngle={-0.2} />
        </group>
        {/* Sarah — lying, facing right */}
        <group position={[0.42, 0.52, 0.2]}>
          <Character mode="lying-side" color="#d8d8d8" leftArmAngle={0.2} rightArmAngle={-0.2} />
        </group>
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 2 — Canapé, proches (5–12s, 210f)
const Scene02: React.FC<{ frame: number }> = ({ frame }) => {
  const camX = interpolate(frame, [0, 210], [1.2, 0.5], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 210)
  return (
    <>
      <S
        bg="#12080a"
        cam={{ pos: [camX, 1.4, 2.0], look: [0, 0.9, 0], fov: 48 }}
        ambientColor="#ff9944"
        ambientIntensity={0.35}
        sunPos={[2, 4, 3]}
        sunColor="#ffcc66"
        sunIntensity={1.0}
        sunPos2={[-3, 2, 2]}
        sunColor2="#ff8844"
        sunIntensity2={0.4}
      >
        <Room color="#1a0d08" floorColor="#0f0808" />
        <Couch position={[0, 0, -1.0]} />
        <FloorLamp position={[-2, 0, -1.5]} />
        {/* Thomas — sitting, arm around Sarah */}
        <Character
          position={[-0.42, 0.42, -0.9]}
          mode="sitting"
          bodyRotY={0.15}
          rightArmAngle={-0.5}
          rightArmForward={0.3}
          headRotY={0.3}
        />
        {/* Sarah — leaning on Thomas */}
        <Character
          position={[0.3, 0.42, -0.9]}
          mode="sitting"
          bodyRotY={-0.3}
          spineAngle={-0.1}
          headRotY={-0.4}
          leftArmAngle={-0.1}
          leftArmForward={0.4}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 3 — Complicité, embrassade (12–18s, 180f)
const Scene03: React.FC<{ frame: number }> = ({ frame }) => {
  const camZ = interpolate(frame, [0, 180], [2.2, 1.6], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 180)
  return (
    <>
      <S
        bg="#100806"
        cam={{ pos: [0.3, 1.5, camZ], look: [0, 1.1, 0], fov: 46 }}
        ambientColor="#ff8833"
        ambientIntensity={0.4}
        sunPos={[3, 5, 3]}
        sunColor="#ffdd88"
        sunIntensity={1.1}
      >
        <Floor color="#100808" />
        {/* Thomas hugging Sarah */}
        <Character
          position={[-0.22, 0, 0]}
          bodyRotY={0.2}
          leftArmAngle={0.6}
          rightArmAngle={0.5}
          leftArmForward={0.8}
          rightArmForward={0.7}
          headRotY={0.3}
        />
        {/* Sarah leaning in */}
        <Character
          position={[0.22, 0, 0]}
          bodyRotY={-0.2}
          leftArmAngle={0.5}
          rightArmAngle={0.6}
          leftArmForward={0.6}
          rightArmForward={0.8}
          headRotY={-0.2}
          spineAngle={0.15}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 4 — Sarah rentre seule (18–23s, 150f)
const Scene04: React.FC<{ frame: number }> = ({ frame }) => {
  const sarahX = interpolate(frame, [0, 100], [-1.5, -0.1], { extrapolateRight: 'clamp' })
  const shoulderDrop = interpolate(frame, [80, 150], [0, 0.4], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 150)
  return (
    <>
      <S
        bg="#0a0a0c"
        cam={{ pos: [0.8, 1.6, 2.5], look: [0, 1.0, 0], fov: 50 }}
        ambientColor="#223"
        ambientIntensity={0.3}
        sunPos={[1, 6, 1]}
        sunColor="#aabbcc"
        sunIntensity={0.7}
      >
        <Room color="#141420" floorColor="#0a0a12" />
        {/* Door frame */}
        <mesh position={[-2.5, 1.2, -1]}>
          <boxGeometry args={[0.08, 2.4, 0.5]} />
          <meshStandardMaterial color="#2a2010" />
        </mesh>
        <mesh position={[-2.1, 1.2, -1]}>
          <boxGeometry args={[0.08, 2.4, 0.5]} />
          <meshStandardMaterial color="#2a2010" />
        </mesh>
        {/* Chair with bag */}
        <Chair position={[1.0, 0, -1.5]} rotY={0.3} />
        <Character
          position={[sarahX, 0, -0.5]}
          bodyRotY={0.1}
          spineAngle={shoulderDrop}
          leftArmAngle={0.1}
          rightArmAngle={-0.1}
          headRotY={-0.1}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 5 — Sarah épuisée au bureau (23–29s, 180f)
const Scene05: React.FC<{ frame: number }> = ({ frame }) => {
  const headDrop = interpolate(frame, [30, 120], [0, 0.5], { extrapolateRight: 'clamp' })
  const camZ = interpolate(frame, [0, 180], [2.0, 1.4], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 180)
  return (
    <>
      <S
        bg="#06080e"
        cam={{ pos: [-0.8, 1.4, camZ], look: [0, 0.9, 0], fov: 50 }}
        ambientColor="#112244"
        ambientIntensity={0.25}
        sunPos={[0, 3, 2]}
        sunColor="#2244aa"
        sunIntensity={0.5}
      >
        <Room color="#0d1020" floorColor="#080810" />
        <Desk position={[0, 0, -1.2]} />
        <Chair position={[0, 0, -0.4]} rotY={Math.PI} />
        {/* Monitor screen light point */}
        <pointLight position={[0, 1.2, -0.8]} color="#2244cc" intensity={1.5} distance={3} />
        <Character
          position={[0, 0.44, -0.4]}
          mode="sitting"
          spineAngle={headDrop}
          leftArmForward={0.6}
          rightArmForward={0.6}
          leftArmAngle={-0.1}
          rightArmAngle={0.1}
          headRotY={0}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 6 — Thomas sur son PC, Sarah en fond (29–35s, 180f)
const Scene06: React.FC<{ frame: number }> = ({ frame }) => {
  const sarahX = interpolate(frame, [60, 130], [-2.0, 2.0], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 180)
  return (
    <>
      <S
        bg="#04060c"
        cam={{ pos: [0.9, 1.5, 1.8], look: [0, 1.0, -0.5], fov: 55 }}
        ambientColor="#0a1030"
        ambientIntensity={0.2}
        sunPos={[-2, 3, 1]}
        sunColor="#3355bb"
        sunIntensity={0.4}
      >
        <Room color="#0a0d18" floorColor="#060810" />
        <Desk position={[0, 0, -1.5]} />
        <Chair position={[0, 0, -0.6]} rotY={Math.PI} />
        <pointLight position={[0, 1.2, -1.0]} color="#2233bb" intensity={2.0} distance={4} />
        {/* Thomas focused on screen */}
        <Character
          position={[0, 0.44, -0.6]}
          mode="sitting"
          headRotY={0}
          leftArmForward={0.5}
          rightArmForward={0.5}
        />
        {/* Sarah passing in background (blurred via opacity) */}
        <Character
          position={[sarahX, 0, -2.5]}
          bodyRotY={-Math.PI / 2}
          opacity={0.6}
          color="#c0c0c0"
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 7 — Distance dans le lit (35–42s, 210f)
const Scene07: React.FC<{ frame: number }> = ({ frame }) => {
  const camY = interpolate(frame, [0, 210], [3.5, 2.5], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 210)
  return (
    <>
      <S
        bg="#04060e"
        cam={{ pos: [0, camY, 2.0], look: [0, 0.5, 0], fov: 60 }}
        ambientColor="#0a1535"
        ambientIntensity={0.35}
        sunPos={[-4, 6, 2]}
        sunColor="#2244aa"
        sunIntensity={0.6}
      >
        <Room color="#0d1020" floorColor="#080810" />
        <Bed position={[0, 0, 0]} />
        {/* Thomas left side */}
        <group position={[-0.5, 0.52, 0.1]} rotation={[0, Math.PI, 0]}>
          <Character mode="lying-back" color="#d0d0d0" leftArmAngle={0.1} />
        </group>
        {/* Sarah right side, turned away */}
        <group position={[0.5, 0.52, 0.1]} rotation={[0, 0.3, 0]}>
          <Character mode="lying-side" color="#d8d8d8" />
        </group>
        {/* Empty gap visualized — subtle light strip */}
        <mesh position={[0, 0.51, 0.1]}>
          <boxGeometry args={[0.3, 0.02, 1.4]} />
          <meshStandardMaterial color="#1a2a4a" emissive="#112" emissiveIntensity={0.3} />
        </mesh>
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 8 — Thomas au bord du lit (42–49s, 210f)
const Scene08: React.FC<{ frame: number }> = ({ frame }) => {
  const camZ = interpolate(frame, [0, 210], [2.0, 1.3], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 210)
  return (
    <>
      <S
        bg="#06060e"
        cam={{ pos: [0.5, 1.5, camZ], look: [0, 0.9, 0], fov: 46 }}
        ambientColor="#1a1a2a"
        ambientIntensity={0.3}
        sunPos={[3, 4, 3]}
        sunColor="#8899cc"
        sunIntensity={0.6}
      >
        <Room color="#0f1020" floorColor="#080810" />
        <Bed position={[0, 0, -0.8]} />
        {/* Thomas sitting on edge, hunched */}
        <Character
          position={[0, 0.44, 0.2]}
          mode="sitting"
          spineAngle={0.5}
          headRotY={0}
          leftArmForward={0.6}
          rightArmForward={0.6}
        />
        {/* Sarah blurred in background */}
        <group position={[0, 0.52, -0.6]} rotation={[0, Math.PI, 0]}>
          <Character mode="lying-side" color="#c0c0c0" opacity={0.45} />
        </group>
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 9 — Thomas observe Sarah (49–54s, 150f)
const Scene09: React.FC<{ frame: number }> = ({ frame }) => {
  const camZ = interpolate(frame, [0, 150], [2.5, 1.5], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 150)
  return (
    <>
      <S
        bg="#08080e"
        cam={{ pos: [0, 1.6, camZ], look: [0, 1.1, 0], fov: 50 }}
        ambientColor="#223"
        ambientIntensity={0.35}
        sunPos={[4, 5, 2]}
        sunColor="#aab"
        sunIntensity={0.7}
      >
        <Room color="#12121e" floorColor="#0a0a12" />
        <Couch position={[2.0, 0, -1.5]} rotY={-Math.PI / 4} />
        {/* Thomas watching from afar */}
        <Character
          position={[-0.9, 0, -0.5]}
          bodyRotY={0.5}
          headRotY={0.3}
        />
        {/* Sarah on couch with phone */}
        <Character
          position={[1.6, 0.42, -1.4]}
          mode="sitting"
          bodyRotY={-0.4}
          headRotY={0.2}
          spineAngle={0.1}
          rightArmForward={0.3}
          rightArmAngle={-0.4}
          opacity={0.75}
          color="#c8c8c8"
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 10 — Les deux absorbés (54–61s, 210f)
const Scene10: React.FC<{ frame: number }> = ({ frame }) => {
  const fade = useFade(frame, 210)
  return (
    <>
      <S
        bg="#08080c"
        cam={{ pos: [0, 1.8, 2.8], look: [0, 0.9, 0], fov: 55 }}
        ambientColor="#1a1a24"
        ambientIntensity={0.4}
        sunPos={[3, 5, 3]}
        sunColor="#bbbbcc"
        sunIntensity={0.8}
      >
        <Room color="#101018" floorColor="#08080f" />
        <Table position={[0, 0, -1.0]} />
        {/* Thomas with phone/screen (right) */}
        <Character
          position={[0.6, 0.78, -0.9]}
          mode="sitting"
          bodyRotY={-0.1}
          headRotY={0.1}
          rightArmForward={0.4}
          leftArmForward={0.3}
        />
        {/* Sarah with laptop (left) */}
        <Character
          position={[-0.6, 0.78, -0.9]}
          mode="sitting"
          bodyRotY={0.1}
          headRotY={-0.1}
          leftArmForward={0.5}
          rightArmForward={0.4}
          spineAngle={0.15}
        />
        {/* Laptop glow */}
        <pointLight position={[-0.6, 1.1, -0.7]} color="#3355bb" intensity={0.8} distance={1.5} />
        <pointLight position={[0.6, 1.1, -0.7]} color="#2244aa" intensity={0.5} distance={1.5} />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 11 — Cerveau 3D + neural (61–70s, 270f)
const BrainScene: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const camZ = interpolate(frame, [0, duration], [2.2, 1.6], { extrapolateRight: 'clamp' })
  const rot = frame * 0.01
  const particles = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < 60; i++) {
      const θ = Math.random() * Math.PI * 2
      const φ = Math.random() * Math.PI
      const r = 0.6 + Math.random() * 0.4
      pts.push([r * Math.sin(φ) * Math.cos(θ), r * Math.cos(φ), r * Math.sin(φ) * Math.sin(θ)])
    }
    return pts
  }, [])
  return (
    <>
      <Cam pos={[0, 0, camZ]} look={[0, 0, 0]} fov={45} />
      <ambientLight color="#112244" intensity={0.3} />
      <pointLight position={[2, 2, 2]} color="#4488ff" intensity={2} distance={8} />
      <pointLight position={[-2, -1, 1]} color="#8844ff" intensity={1.5} distance={6} />
      {/* Brain sphere */}
      <mesh rotation={[0, rot, 0]}>
        <sphereGeometry args={[0.55, 32, 24]} />
        <meshStandardMaterial
          color="#aabbff"
          roughness={0.3}
          metalness={0.2}
          emissive="#2233aa"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Neural particles */}
      {particles.map((p, i) => {
        const pulse = Math.sin(frame * 0.08 + i * 0.4) * 0.5 + 0.5
        return (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshStandardMaterial
              color="#88ccff"
              emissive="#4488ff"
              emissiveIntensity={pulse * 1.5}
            />
          </mesh>
        )
      })}
      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2 + rot * 0.3, rot, 0]}>
        <torusGeometry args={[0.75, 0.015, 8, 60]} />
        <meshStandardMaterial color="#6699ff" emissive="#3366ff" emissiveIntensity={0.8} />
      </mesh>
    </>
  )
}

const Scene11: React.FC<{ frame: number }> = ({ frame }) => {
  const fade = useFade(frame, 270)
  return (
    <>
      <AbsoluteFill style={{ background: '#03040a' }}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ fov: 45, near: 0.05, far: 100 }}
        >
          <BrainScene frame={frame} duration={270} />
        </Canvas>
      </AbsoluteFill>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 12 — Cuisine, factures (70–78s, 240f)
const Scene12: React.FC<{ frame: number }> = ({ frame }) => {
  const fade = useFade(frame, 240)
  return (
    <>
      <S
        bg="#0a0a08"
        cam={{ pos: [0, 1.9, 2.5], look: [0, 0.9, 0], fov: 52 }}
        ambientColor="#332a1a"
        ambientIntensity={0.5}
        sunPos={[0, 5, 0]}
        sunColor="#ffe8bb"
        sunIntensity={1.0}
      >
        <Room color="#1a1510" floorColor="#100e0a" />
        <Table position={[0, 0, -0.9]} />
        {/* Paper stack */}
        {[0, 1, 2].map(i => (
          <mesh key={i} position={[-0.3 + i * 0.08, 0.78 + i * 0.01, -0.75 + i * 0.03]} rotation={[0, i * 0.1, 0]}>
            <boxGeometry args={[0.28, 0.005, 0.2]} />
            <meshStandardMaterial color="#f0ece0" />
          </mesh>
        ))}
        {/* Sarah with papers */}
        <Character
          position={[-0.5, 0.78, -0.8]}
          mode="sitting"
          spineAngle={0.3}
          leftArmForward={0.5}
          rightArmForward={0.3}
          headRotY={0.1}
        />
        {/* Thomas with phone */}
        <Character
          position={[0.6, 0.78, -0.8]}
          mode="sitting"
          headRotY={-0.2}
          rightArmForward={0.4}
          rightArmAngle={-0.3}
          spineAngle={0.1}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 13 — Thomas seul puis Sarah seule (78–84s, 180f)
const Scene13: React.FC<{ frame: number }> = ({ frame }) => {
  const showSarah = frame > 90
  const transition = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const fade = useFade(frame, 180)
  return (
    <>
      <S
        bg="#08080c"
        cam={{ pos: [0, 1.5, 2.2], look: [0, 1.0, 0], fov: 50 }}
        ambientColor="#1a1a24"
        ambientIntensity={0.35}
        sunPos={[2, 5, 2]}
        sunColor="#99aacc"
        sunIntensity={0.6}
      >
        <Floor color="#0a0a12" />
        {/* Thomas alone */}
        <Character
          position={[0, 0.44, -0.3]}
          mode="sitting"
          spineAngle={0.4}
          headRotY={0}
          leftArmForward={0.5}
          rightArmForward={0.5}
          opacity={showSarah ? 1 - transition : 1}
          color="#d0d0d0"
        />
        {/* Sarah alone (fades in) */}
        <Character
          position={[0, 0.44, -0.3]}
          mode="sitting"
          spineAngle={0.4}
          headRotY={0}
          leftArmForward={0.5}
          rightArmForward={0.5}
          opacity={transition}
          color="#d8d8d8"
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 14 — La discussion (84–94s, 300f)
const Scene14: React.FC<{ frame: number }> = ({ frame }) => {
  const thomasX = interpolate(frame, [30, 120], [-1.2, -0.42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const thomasRot = interpolate(frame, [30, 120], [0.1, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const camZ = interpolate(frame, [150, 300], [2.0, 1.5], { extrapolateRight: 'clamp' })
  const warmth = interpolate(frame, [100, 300], [0, 0.5], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 300)
  return (
    <>
      <S
        bg="#100808"
        cam={{ pos: [0, 1.5, camZ], look: [0, 1.0, 0], fov: 50 }}
        ambientColor={`hsl(${20 + warmth * 20}, ${40 + warmth * 20}%, 15%)`}
        ambientIntensity={0.4}
        sunPos={[2, 4, 3]}
        sunColor="#ffcc88"
        sunIntensity={0.7 + warmth * 0.3}
      >
        <Room color="#1a0d08" floorColor="#0f0808" />
        <Couch position={[0, 0, -1.0]} />
        <FloorLamp position={[-2, 0, -1.5]} />
        {/* Thomas approaching */}
        <Character
          position={[thomasX, 0.42, -0.9]}
          mode="sitting"
          bodyRotY={thomasRot}
          rightArmForward={interpolate(frame, [100, 180], [0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          headRotY={thomasRot * 0.5}
        />
        {/* Sarah turns toward Thomas */}
        <Character
          position={[0.4, 0.42, -0.9]}
          mode="sitting"
          bodyRotY={-thomasRot * 0.6}
          headRotY={-thomasRot * 0.4}
          spineAngle={-0.05}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// SCÈNE 15 — Réunion émotionnelle (94–105s, 330f)
const Scene15: React.FC<{ frame: number }> = ({ frame }) => {
  const camZ = interpolate(frame, [0, 330], [1.8, 3.2], { extrapolateRight: 'clamp' })
  const camY = interpolate(frame, [0, 330], [1.5, 1.8], { extrapolateRight: 'clamp' })
  const fade = useFade(frame, 330)
  return (
    <>
      <S
        bg="#120808"
        cam={{ pos: [0, camY, camZ], look: [0, 1.0, 0], fov: 52 }}
        ambientColor="#ff9944"
        ambientIntensity={0.45}
        sunPos={[2, 4, 3]}
        sunColor="#ffcc66"
        sunIntensity={1.1}
        sunPos2={[-3, 2, 2]}
        sunColor2="#ff8844"
        sunIntensity2={0.5}
      >
        <Room color="#1a0d08" floorColor="#0f0808" />
        <Couch position={[0, 0, -1.0]} />
        <FloorLamp position={[-2, 0, -1.5]} />
        <FloorLamp position={[2, 0, -2.0]} />
        {/* Thomas */}
        <Character
          position={[-0.42, 0.42, -0.9]}
          mode="sitting"
          bodyRotY={0.2}
          rightArmAngle={-0.4}
          rightArmForward={0.4}
          headRotY={0.3}
        />
        {/* Sarah leaning on Thomas */}
        <Character
          position={[0.3, 0.42, -0.9]}
          mode="sitting"
          bodyRotY={-0.3}
          spineAngle={-0.1}
          headRotY={-0.4}
          leftArmAngle={-0.1}
          leftArmForward={0.4}
        />
      </S>
      <FadeOverlay opacity={fade} />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSITION PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════

// Frame offsets for each scene
const SCENES = [
  { comp: Scene01, start: 0,    dur: 150  },
  { comp: Scene02, start: 150,  dur: 210  },
  { comp: Scene03, start: 360,  dur: 180  },
  { comp: Scene04, start: 540,  dur: 150  },
  { comp: Scene05, start: 690,  dur: 180  },
  { comp: Scene06, start: 870,  dur: 180  },
  { comp: Scene07, start: 1050, dur: 210  },
  { comp: Scene08, start: 1260, dur: 210  },
  { comp: Scene09, start: 1470, dur: 150  },
  { comp: Scene10, start: 1620, dur: 210  },
  { comp: Scene11, start: 1830, dur: 270  },
  { comp: Scene12, start: 2100, dur: 240  },
  { comp: Scene13, start: 2340, dur: 180  },
  { comp: Scene14, start: 2520, dur: 300  },
  { comp: Scene15, start: 2820, dur: 330  },
]

export const ThomasSarah: React.FC = () => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {SCENES.map(({ comp: Comp, start, dur }) => {
        const localFrame = frame - start
        if (localFrame < 0 || localFrame >= dur) return null
        return <Comp key={start} frame={localFrame} />
      })}
    </AbsoluteFill>
  )
}
