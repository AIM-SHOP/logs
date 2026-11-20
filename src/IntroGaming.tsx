import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const IntroGaming: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Ligne rouge animée ---
  const lineWidth = interpolate(frame, [0, 20], [0, 1920], {
    extrapolateRight: "clamp",
  });

  // --- Titre principal ---
  const titleScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const titleOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Sous-titre ---
  const subtitleOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [30, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Flash blanc au frame 50 ---
  const flashOpacity = interpolate(frame, [50, 52, 55], [0, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Zoom global léger ---
  const globalScale = interpolate(frame, [0, 150], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  // --- Fade out final ---
  const globalOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Zoom global */}
      <AbsoluteFill
        style={{
          transform: `scale(${globalScale})`,
          opacity: globalOpacity,
        }}
      >
        {/* Grille de fond subtile */}
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(225,6,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(225,6,0,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Ligne rouge horizontale */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: lineWidth,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #E10600, #ff4444)",
            transform: "translateY(-60px)",
            boxShadow: "0 0 20px #E10600",
          }}
        />

        {/* Titre principal */}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 130,
              fontFamily: "Impact, Arial Black, sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "-4px",
              transform: `scale(${titleScale})`,
              opacity: titleOpacity,
              WebkitTextStroke: "2px #000000",
              textShadow:
                "0 0 40px rgba(225,6,0,0.6), 4px 4px 0px #E10600",
              lineHeight: 1,
            }}
          >
            GTA VI
          </div>

          {/* Sous-titre */}
          <div
            style={{
              fontSize: 36,
              fontFamily: "Impact, Arial Black, sans-serif",
              fontWeight: 400,
              color: "#E10600",
              textTransform: "uppercase",
              letterSpacing: "12px",
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              WebkitTextStroke: "1px #000000",
            }}
          >
            LEONIDA • 2025
          </div>

          {/* Tag créateur */}
          <div
            style={{
              fontSize: 22,
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "4px",
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              marginTop: 8,
            }}
          >
            @TON_COMPTE
          </div>
        </AbsoluteFill>

        {/* Éclats décoratifs (coins) */}
        {[
          { top: 60, left: 60 },
          { top: 60, right: 60 },
          { bottom: 60, left: 60 },
          { bottom: 60, right: 60 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 40,
              height: 40,
              borderTop: i < 2 ? "3px solid #E10600" : "none",
              borderBottom: i >= 2 ? "3px solid #E10600" : "none",
              borderLeft: i % 2 === 0 ? "3px solid #E10600" : "none",
              borderRight: i % 2 === 1 ? "3px solid #E10600" : "none",
              opacity: subtitleOpacity,
              ...pos,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Flash blanc */}
      <AbsoluteFill
        style={{
          background: "white",
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
