import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Video,
  staticFile,
} from "remotion";

export const ClipAnime: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // 30fps

  // --- Fade in ---
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // --- Zoom dynamique lent ---
  const globalScale = interpolate(frame, [0, 300], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  // --- Camera shake au frame 60 (seconde 2) ---
  const shakeProgress = interpolate(frame, [60, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = shakeProgress > 0 && shakeProgress < 1
    ? Math.sin(frame * 7.3) * 7 * (1 - shakeProgress)
    : 0;
  const shakeY = shakeProgress > 0 && shakeProgress < 1
    ? Math.cos(frame * 5.1) * 5 * (1 - shakeProgress)
    : 0;

  // --- Flash blanc au frame 60 ---
  const flash = interpolate(frame, [60, 62, 68], [0, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Accroche en haut ---
  const hookScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 200 },
  });
  const hookOpacity = interpolate(frame, [5, 18, 110, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Sous-titre rouge ennemi après le flash ---
  const subScale = spring({
    frame: frame - 58,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const subOpacity = interpolate(frame, [58, 70, 270, 295], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Fade out final ---
  const fadeOut = interpolate(frame, [280, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalOpacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: globalOpacity,
          transform: `scale(${globalScale}) translate(${shakeX}px, ${shakeY}px)`,
          transformOrigin: "center center",
        }}
      >
        {/* Vidéo source */}
        <Video
          src={staticFile("clip-source.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Vignette sombre sur les bords */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Accroche en haut */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: hookOpacity,
            transform: `scale(${hookScale})`,
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontFamily: "Impact, Arial Black, sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              WebkitTextStroke: "2px #000000",
              textShadow: "3px 3px 0 #000, -1px -1px 0 #000",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            REGARDE CE QUI ARRIVE 👀
          </div>
        </div>

        {/* Sous-titre rouge ennemi */}
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: subOpacity,
            transform: `scale(${subScale})`,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily: "Impact, Arial Black, sans-serif",
              fontWeight: 900,
              color: "#E10600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              WebkitTextStroke: "3px #000000",
              textShadow:
                "4px 4px 0 #000, -2px -2px 0 #000, 0 0 20px rgba(225,6,0,0.8)",
              textAlign: "center",
              padding: "0 24px",
              lineHeight: 1.1,
            }}
          >
            NO WAY 😭
          </div>
        </div>
      </AbsoluteFill>

      {/* Flash blanc */}
      <AbsoluteFill
        style={{
          background: "white",
          opacity: flash,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
