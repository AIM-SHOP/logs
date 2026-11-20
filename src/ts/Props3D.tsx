import React from 'react'

// ── BED ─────────────────────────────────────────────────────────────────────
export const Bed: React.FC<{ position?: [number,number,number] }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {/* Frame */}
    <mesh position={[0, 0.18, 0]}>
      <boxGeometry args={[1.8, 0.3, 2.4]} />
      <meshStandardMaterial color="#2a1a0e" roughness={0.8} />
    </mesh>
    {/* Mattress */}
    <mesh position={[0, 0.38, 0]}>
      <boxGeometry args={[1.65, 0.18, 2.1]} />
      <meshStandardMaterial color="#f0ede6" roughness={0.9} />
    </mesh>
    {/* Duvet */}
    <mesh position={[0, 0.5, 0.2]}>
      <boxGeometry args={[1.6, 0.14, 1.9]} />
      <meshStandardMaterial color="#c8d4e0" roughness={1} />
    </mesh>
    {/* Pillow L */}
    <mesh position={[-0.42, 0.5, -0.82]}>
      <boxGeometry args={[0.6, 0.12, 0.4]} />
      <meshStandardMaterial color="#e8e4f0" roughness={0.9} />
    </mesh>
    {/* Pillow R */}
    <mesh position={[0.42, 0.5, -0.82]}>
      <boxGeometry args={[0.6, 0.12, 0.4]} />
      <meshStandardMaterial color="#e8e4f0" roughness={0.9} />
    </mesh>
    {/* Headboard */}
    <mesh position={[0, 0.75, -1.25]}>
      <boxGeometry args={[1.8, 0.9, 0.08]} />
      <meshStandardMaterial color="#1a0f06" roughness={0.7} />
    </mesh>
  </group>
)

// ── COUCH ────────────────────────────────────────────────────────────────────
export const Couch: React.FC<{ position?: [number,number,number], rotY?: number }> = ({
  position = [0, 0, 0],
  rotY = 0,
}) => (
  <group position={position} rotation={[0, rotY, 0]}>
    {/* Seat */}
    <mesh position={[0, 0.32, 0]}>
      <boxGeometry args={[1.9, 0.22, 0.85]} />
      <meshStandardMaterial color="#4a3728" roughness={0.8} />
    </mesh>
    {/* Back */}
    <mesh position={[0, 0.65, -0.37]}>
      <boxGeometry args={[1.9, 0.5, 0.18]} />
      <meshStandardMaterial color="#4a3728" roughness={0.8} />
    </mesh>
    {/* Left arm */}
    <mesh position={[-0.88, 0.5, -0.05]}>
      <boxGeometry args={[0.16, 0.36, 0.85]} />
      <meshStandardMaterial color="#3a2a1e" roughness={0.8} />
    </mesh>
    {/* Right arm */}
    <mesh position={[0.88, 0.5, -0.05]}>
      <boxGeometry args={[0.16, 0.36, 0.85]} />
      <meshStandardMaterial color="#3a2a1e" roughness={0.8} />
    </mesh>
    {/* Legs */}
    {([-0.8, 0.8] as number[]).flatMap(x =>
      [-0.32, 0.32].map((z, i) => (
        <mesh key={`${x}-${z}`} position={[x, 0.1, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
          <meshStandardMaterial color="#1a0f06" />
        </mesh>
      ))
    )}
  </group>
)

// ── DESK ─────────────────────────────────────────────────────────────────────
export const Desk: React.FC<{ position?: [number,number,number], rotY?: number }> = ({
  position = [0, 0, 0],
  rotY = 0,
}) => (
  <group position={position} rotation={[0, rotY, 0]}>
    {/* Surface */}
    <mesh position={[0, 0.75, 0]}>
      <boxGeometry args={[1.6, 0.05, 0.75]} />
      <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
    </mesh>
    {/* Monitor main */}
    <mesh position={[0, 1.2, -0.25]}>
      <boxGeometry args={[0.65, 0.4, 0.04]} />
      <meshStandardMaterial color="#111" roughness={0.3} />
    </mesh>
    {/* Monitor screen glow */}
    <mesh position={[0, 1.2, -0.23]}>
      <boxGeometry args={[0.6, 0.35, 0.01]} />
      <meshStandardMaterial color="#2244aa" emissive="#1133aa" emissiveIntensity={0.8} />
    </mesh>
    {/* Monitor stand */}
    <mesh position={[0, 0.9, -0.25]}>
      <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {/* Keyboard */}
    <mesh position={[0, 0.78, 0.1]}>
      <boxGeometry args={[0.45, 0.025, 0.16]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
    </mesh>
    {/* Legs */}
    {([-0.75, 0.75] as number[]).flatMap(x =>
      [-0.32, 0.32].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.37, z]}>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))
    )}
  </group>
)

// ── CHAIR ────────────────────────────────────────────────────────────────────
export const Chair: React.FC<{ position?: [number,number,number], rotY?: number }> = ({
  position = [0, 0, 0],
  rotY = 0,
}) => (
  <group position={position} rotation={[0, rotY, 0]}>
    <mesh position={[0, 0.44, 0]}>
      <boxGeometry args={[0.46, 0.06, 0.46]} />
      <meshStandardMaterial color="#222" roughness={0.7} />
    </mesh>
    <mesh position={[0, 0.75, -0.2]}>
      <boxGeometry args={[0.46, 0.5, 0.06]} />
      <meshStandardMaterial color="#222" roughness={0.7} />
    </mesh>
    {([-0.18, 0.18] as number[]).flatMap(x =>
      [-0.18, 0.18].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.22, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 6]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))
    )}
  </group>
)

// ── FLOOR ────────────────────────────────────────────────────────────────────
export const Floor: React.FC<{ color?: string, size?: number }> = ({
  color = '#1a1a2e',
  size = 12,
}) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
    <planeGeometry args={[size, size]} />
    <meshStandardMaterial color={color} roughness={0.9} />
  </mesh>
)

// ── WALLS ────────────────────────────────────────────────────────────────────
export const Room: React.FC<{ color?: string, floorColor?: string }> = ({
  color = '#1a1f30',
  floorColor = '#111522',
}) => (
  <group>
    <Floor color={floorColor} />
    {/* Back wall */}
    <mesh position={[0, 2.5, -4]} rotation={[0, 0, 0]}>
      <planeGeometry args={[12, 7]} />
      <meshStandardMaterial color={color} roughness={0.95} side={2} />
    </mesh>
    {/* Left wall */}
    <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[12, 7]} />
      <meshStandardMaterial color={color} roughness={0.95} side={2} />
    </mesh>
  </group>
)

// ── TABLE ────────────────────────────────────────────────────────────────────
export const Table: React.FC<{ position?: [number,number,number] }> = ({ position = [0,0,0] }) => (
  <group position={position}>
    <mesh position={[0, 0.74, 0]}>
      <boxGeometry args={[1.4, 0.05, 0.8]} />
      <meshStandardMaterial color="#c4a882" roughness={0.7} />
    </mesh>
    {([-0.6, 0.6] as number[]).flatMap(x =>
      [-0.32, 0.32].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.37, z]}>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
          <meshStandardMaterial color="#8a6a42" />
        </mesh>
      ))
    )}
  </group>
)

// ── LAMP ─────────────────────────────────────────────────────────────────────
export const FloorLamp: React.FC<{ position?: [number,number,number] }> = ({ position = [0,0,0] }) => (
  <group position={position}>
    <mesh position={[0, 0.75, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 1.5, 6]} />
      <meshStandardMaterial color="#888" metalness={0.6} />
    </mesh>
    <mesh position={[0, 1.55, 0]}>
      <coneGeometry args={[0.2, 0.3, 12, 1, true]} />
      <meshStandardMaterial color="#f5e8c8" emissive="#f5e8c8" emissiveIntensity={0.3} side={2} />
    </mesh>
  </group>
)
