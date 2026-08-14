import { Player } from "@remotion/player";
import type { ComponentType, CSSProperties } from "react";

type Props = {
  /** 폰 화면 안에서 재생될 Remotion 컴포지션 */
  screen: ComponentType;
  width?: number;
  height?: number;
  durationInFrames?: number;
  /** 시작 프레임 (여러 폰의 동시 재생 타이밍을 어긋나게 할 때) */
  initialFrame?: number;
  style?: CSSProperties;
  className?: string;
};

const FPS = 30;
const COMPOSITION_WIDTH = 390;

/**
 * 목업 폰 프레임. 내부는 Remotion Player가 채우며,
 * 각 화면은 추후 실제 데모 영상 컴포지션으로 교체된다.
 */
export function PhoneFrame({
  screen,
  width = 240,
  height = 520,
  durationInFrames = 240,
  initialFrame = 0,
  style,
  className,
}: Props) {
  const innerW = width - 20;
  const innerH = height - 20;
  const compositionHeight = Math.round((COMPOSITION_WIDTH * innerH) / innerW);

  return (
    <div
      className={`phone ${className ?? ""}`}
      style={{ width, height, ...style }}
    >
      <div className="phone__screen">
        <Player
          component={screen}
          durationInFrames={durationInFrames}
          fps={FPS}
          compositionWidth={COMPOSITION_WIDTH}
          compositionHeight={compositionHeight}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
          initialFrame={initialFrame}
          acknowledgeRemotionLicense
        />
      </div>
      <div className="phone__notch" />
    </div>
  );
}
