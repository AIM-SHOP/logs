import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { IntroGaming } from "./IntroGaming";
import { ClipAnime } from "./ClipAnime";
import { ThomasSarah } from "./ts/ThomasSarah";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="IntroGaming"
        component={IntroGaming}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ClipAnime"
        component={ClipAnime}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ThomasSarah"
        component={ThomasSarah}
        durationInFrames={3150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
