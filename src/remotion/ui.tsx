import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { CSSProperties, ReactNode } from "react";

/** 랜딩 팔레트를 따르는 실제 앱 디자인 토큰 — 기록=코랄, 케어=틸 */
export const C = {
  bg: "#FFF9F6",
  card: "#FFFFFF",
  ink: "#443C37",
  sub: "#A39A91",
  line: "#F4EDE7",
  coral: "#FF6B4A",
  coralDeep: "#F2543A",
  coralSoft: "#FFEDE6",
  teal: "#2BA08A",
  tealSoft: "#E4F5F0",
  tealDeep: "#1E6E5F",
  gold: "#FFB020",
} as const;

export const SHADOW = "0 8px 24px rgba(68,60,55,0.08)";
export const FONT =
  '"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif';

/** 순수 등장 스타일 — 컴포넌트에서 frame/fps를 한 번 구해 넘긴다 */
export function appear(
  frame: number,
  fps: number,
  delay: number
): CSSProperties {
  const v = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  return { opacity: v, transform: `translateY(${(1 - v) * 26}px)` };
}

/** delay 프레임에 톡 튀는 팝(좋아요·체크 등) */
export function pop(frame: number, fps: number, delay: number): CSSProperties {
  const v = spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, mass: 0.5 },
  });
  return { opacity: Math.min(1, v * 2), transform: `scale(${0.4 + v * 0.6})` };
}

export function useAnim() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps };
}

/** 상단 상태바 (연출용) */
export function StatusBar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 24,
        right: 24,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        fontWeight: 700,
        color: C.ink,
      }}
    >
      <span>9:41</span>
      <span style={{ letterSpacing: 2 }}>📶 🔋</span>
    </div>
  );
}

/** 아이 태그 칩 */
export function ChildChip({
  name,
  active = true,
}: {
  name: string;
  active?: boolean;
}) {
  return (
    <span
      style={{
        background: active ? C.coral : C.coralSoft,
        color: active ? "#fff" : C.coral,
        borderRadius: 999,
        padding: "5px 13px",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {name}
    </span>
  );
}

/** 홈 상단바: 가족 공간 + 피드/달력 토글 + 알림 */
export function TopBar({ toggle = "피드" }: { toggle?: "피드" | "달력" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            background: C.coralSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
          }}
        >
          👶
        </div>
        <span style={{ fontSize: 20, fontWeight: 800 }}>서준이네 ▾</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            display: "flex",
            background: "#F4EDE7",
            borderRadius: 999,
            padding: 3,
            fontSize: 13,
          }}
        >
          {(["피드", "달력"] as const).map((t) => (
            <span
              key={t}
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                background: t === toggle ? "#fff" : "transparent",
                color: t === toggle ? C.ink : C.sub,
                fontWeight: 700,
                boxShadow: t === toggle ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 19, position: "relative" }}>
          🔔
          <span
            style={{
              position: "absolute",
              top: -1,
              right: -3,
              width: 8,
              height: 8,
              borderRadius: 4,
              background: C.coral,
            }}
          />
        </span>
      </div>
    </div>
  );
}

/** 하단 탭: 홈 · 회고 · + · 리포트 · 전체 */
export function BottomNav({ active = "홈" }: { active?: string }) {
  const items = [
    { icon: "🏠", label: "홈" },
    { icon: "🎞️", label: "회고" },
    { icon: "+", label: "" },
    { icon: "📊", label: "리포트" },
    { icon: "☰", label: "전체" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#fff",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -6px 20px rgba(68,60,55,0.07)",
        padding: "10px 8px 16px",
      }}
    >
      {items.map((item) =>
        item.icon === "+" ? (
          <div
            key="plus"
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              background: `linear-gradient(135deg, ${C.coral}, ${C.coralDeep})`,
              color: "#fff",
              fontSize: 28,
              fontWeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: -28,
              boxShadow: "0 8px 18px rgba(255,107,74,0.45)",
            }}
          >
            +
          </div>
        ) : (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              fontSize: 12,
              fontWeight: item.label === active ? 800 : 500,
              color: item.label === active ? C.coral : C.sub,
            }}
          >
            <span style={{ fontSize: 19 }}>{item.icon}</span>
            {item.label}
          </div>
        )
      )}
    </div>
  );
}

/** 사진 카드 (실사 이미지) */
export function Photo({
  src,
  height = 180,
  radius = 16,
  style,
  children,
}: {
  src: string;
  height?: number;
  radius?: number;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        height,
        borderRadius: radius,
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {children}
    </div>
  );
}

/** 앱 화면 공통 셸 */
export function Shell({
  children,
  nav,
  pad = 18,
}: {
  children: ReactNode;
  nav?: ReactNode;
  pad?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        color: C.ink,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StatusBar />
      <div style={{ flex: 1, overflow: "hidden", padding: pad, paddingTop: 46 }}>
        {children}
      </div>
      {nav}
    </div>
  );
}
