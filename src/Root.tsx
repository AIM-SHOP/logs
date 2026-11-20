import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { IntroGaming } from "./IntroGaming";

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
    </>
  );
};
