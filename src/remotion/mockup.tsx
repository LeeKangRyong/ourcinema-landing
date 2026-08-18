import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { appear, pop, useAnim } from "./ui";
import g1 from "../assets/mockup/g1.jpg";
import g2 from "../assets/mockup/g2.jpg";
import g3 from "../assets/mockup/g3.jpg";
import g4 from "../assets/mockup/g4.jpg";
import g5 from "../assets/mockup/g5.jpg";
import g6 from "../assets/mockup/g6.jpg";
import mascot from "../assets/mascot.png";
import babyBear from "../assets/photos/baby3.jpg";
import babySleep from "../assets/photos/baby5.jpg";
import babyFeet from "../assets/photos/baby2.jpg";
import storeAlbum from "../assets/mockup/store-album.png";
import storeGift from "../assets/mockup/store-gift.jpg";
import commFood from "../assets/mockup/comm-food.jpg";
import commPlay from "../assets/mockup/comm-play.jpg";
import commAvatar from "../assets/mockup/comm-avatar.jpg";

/* ---------------------------------------------------------------- */
/* 레퍼런스 목업(2026-08-18 목업.html)의 실제 제품 UI를 1:1로 재현.
 * 컴포지션 폭 390px = 목업 디바이스 폭이라 목업의 px 값을 그대로 쓴다.
 * 유일한 의도적 차이: 폰 프레임 노치를 피하기 위한 상단 여백. */

export const M = {
  paper: "#FFF8F5",
  cream: "#FAF6F0",
  ink: "#3B332C",
  sub: "#8A7A6B",
  line: "#EFE3D6",
  card: "#FFFCFA",
  terra: "#B0552F",
  fab: "#BD6B50",
  coral: "#E8907C",
  coralDeep: "#DD7257",
  coralLine: "#E2836B",
  pink: "#FBE3DB",
  dark: "#3B332C",
  sageBg: "#EAF2EF",
  sage: "#2D6A5F",
  sageDeeper: "#1F473E",
  teal: "#3F7063",
  jub: "#F0B78B",
} as const;

const SERIF =
  '"Nanum Myeongjo", "Apple Myungjo", "AppleMyungjo", "Noto Serif KR", Georgia, serif';
const SANS =
  '"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';

const PINK_GRADIENT =
  "linear-gradient(180deg, #F5BDB8 0%, #FBE7E0 14%, #FAF6F0 34%)";

/** 노치를 피하는 상단 여백 (목업엔 없는 프레임 보정) */
const SAFE_TOP = 34;

const PHOTOS = [g1, g2, g3, g4, g5, g6];
const PHOTO_LABELS = [
  "6월 12일",
  "6월 28일",
  "7월 5일",
  "7월 19일",
  "8월 2일",
  "8월 14일",
];

/* ---------------------------------------------------------------- */
/* 공통 뼈대 */

function Device({
  children,
  bg = M.paper,
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: bg,
        color: M.ink,
        fontFamily: SANS,
        display: "flex",
        flexDirection: "column",
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  );
}

function AppBar() {
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${SAFE_TOP + 16}px 18px 8px`,
        minHeight: 48,
        position: "relative",
      }}
    >
      <span style={{ fontSize: 17 }}>☰</span>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_TOP + 10,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 19,
          letterSpacing: "0.01em",
          color: M.terra,
        }}
      >
        Our Cinema
      </span>
      <span style={{ fontSize: 17 }}>🔔</span>
    </div>
  );
}

const NAV5 = [
  { key: "diary", icon: "📖", label: "일기" },
  { key: "album", icon: "🖼", label: "앨범" },
  { key: "chat", icon: "", label: "챗봇" },
  { key: "cal", icon: "📅", label: "캘린더" },
  { key: "report", icon: "📄", label: "리포트" },
];

function Nav5({
  active,
  items = NAV5,
}: {
  active: string;
  items?: typeof NAV5;
}) {
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        borderTop: "1px solid #F0E4D8",
        background: M.paper,
        padding: "5px 6px 12px",
      }}
    >
      {items.map((item) => {
        const on = item.key === active;
        return (
          <div
            key={item.key}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 10.5,
              padding: "5px 0 3px",
              borderRadius: 12,
              color: on ? M.terra : "#A08A76",
              fontWeight: on ? 700 : 500,
              background: on ? M.pink : "transparent",
            }}
          >
            {item.key === "chat" ? (
              <JubFace size={19} style={{ margin: "1px auto 1px" }} />
            ) : (
              <div style={{ fontSize: 17, lineHeight: 1.25 }}>{item.icon}</div>
            )}
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

/** 주부리 얼굴 — 마스코트 아바타 */
function JubFace({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#FFE9D6",
        overflow: "hidden",
        flex: "none",
        ...style,
      }}
    >
      <img
        src={mascot}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function Photo({
  src,
  height,
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

/** 장면 전환용 페이드 */
function Fade({
  children,
  duration,
}: {
  children: ReactNode;
  duration: number;
}) {
  const f = useCurrentFrame();
  const opacity = interpolate(
    f,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>
  );
}

/* ---------------------------------------------------------------- */
/* 메인 — 일기/앨범/달력 세그먼트 */

function Seg({ active }: { active: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        background: "#F3E9E1",
        borderRadius: 13,
        padding: 4,
        marginBottom: 16,
      }}
    >
      {["일기", "앨범", "달력"].map((t) => (
        <div
          key={t}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "8px 0",
            borderRadius: 10,
            fontSize: 13,
            color: t === active ? M.ink : M.sub,
            fontWeight: t === active ? 700 : 500,
            background: t === active ? M.card : "transparent",
            boxShadow: t === active ? "0 1px 3px rgba(74,52,30,0.1)" : "none",
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

function FeedEntry({
  pill,
  hot,
  meta,
  src,
  title,
  snippet,
  hearts,
  delay,
  heartPopAt,
}: {
  pill: string;
  hot?: boolean;
  meta: string;
  src: string;
  title: string;
  snippet: string;
  hearts: string;
  delay: number;
  heartPopAt?: number;
}) {
  const { frame, fps } = useAnim();
  return (
    <div
      style={{
        position: "relative",
        marginBottom: 24,
        ...appear(frame, fps, delay),
      }}
    >
      {/* 타임라인 점 */}
      <div
        style={{
          position: "absolute",
          left: -16,
          top: 5,
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: M.coral,
          border: `2px solid ${M.paper}`,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: M.sub,
          marginBottom: 9,
        }}
      >
        <span
          style={{
            background: hot ? "#FCC396" : "#F3E9DC",
            color: hot ? "#7A3E1D" : M.sub,
            fontWeight: 700,
            borderRadius: 10,
            padding: "2px 10px",
            fontSize: 11,
          }}
        >
          {pill}
        </span>
        <span>{meta}</span>
      </div>
      <Photo src={src} height={200} />
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 16.5,
          fontWeight: 700,
          marginTop: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12.5, color: M.sub, marginTop: 4 }}>
        {snippet}
      </div>
      <div
        style={{
          fontSize: 11.5,
          color: "#C57A5A",
          fontWeight: 600,
          marginTop: 6,
          display: "inline-block",
          ...(heartPopAt !== undefined ? pop(frame, fps, heartPopAt) : {}),
        }}
      >
        ♥ {hearts}
      </div>
    </div>
  );
}

/** 일기 피드 — 타임라인에 하루하루가 쌓이고, 가족 반응이 톡 도착한다 */
export function DiaryFeedScreen() {
  const { frame } = useAnim();
  const bob = Math.sin(frame / 14) * 3;
  return (
    <AbsoluteFill>
      <Device>
        <AppBar />
        <div style={{ flex: 1, overflow: "hidden", padding: "4px 18px 0" }}>
          <Seg active="일기" />
          {/* 타임라인 세로줄 */}
          <div style={{ position: "relative", paddingLeft: 16 }}>
            <div
              style={{
                position: "absolute",
                left: 3.5,
                top: 16,
                bottom: 0,
                width: 1,
                background: "#EFDFD2",
              }}
            />
            <FeedEntry
              pill="오늘"
              hot
              meta="14개월 서준이"
              src={g1}
              title="우리 강아지 많이 컸네"
              snippet="오늘 아침에는 혼자서 블록을 두 개나 쌓았다. 집중하는 입술이 너무 귀여워서 사진을 안 찍을 수가 없었다."
              hearts="할머니 외 3명"
              delay={6}
              heartPopAt={95}
            />
            <FeedEntry
              pill="지난주"
              meta="첫 미끄럼틀"
              src={g2}
              title="처음 타본 미끄럼틀"
              snippet="처음엔 무서워하더니 아빠가 잡아주니까 까르르 웃으며 몇 번이고 다시 탔다. 용기 내어 도전한 우리 아들."
              hearts="할아버지 외 5명"
              delay={38}
            />
            <FeedEntry
              pill="2주 전"
              meta="이유식 시간"
              src={g5}
              title="고구마 미음 도전"
              snippet="단맛이 나는지 입을 쩍쩍 벌리며 잘 받아먹는다. 온 얼굴에 묻히고 먹는 모습도 사랑스럽다."
              hearts="이모 외 1명"
              delay={70}
            />
          </div>
        </div>
        {/* 주부리 FAB */}
        <div
          style={{
            position: "absolute",
            right: 18,
            bottom: 86,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#FFE9D6",
            border: `2.5px solid ${M.fab}`,
            overflow: "hidden",
            boxShadow: "0 6px 16px rgba(120,62,37,0.35)",
            transform: `translateY(${bob}px)`,
          }}
        >
          <img
            src={mascot}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <Nav5 active="diary" />
      </Device>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/* 메인 — 앨범 → 달력 탭 순회 */

const ALBUM_CELLS = [g1, g2, g3, g4, g5, g6, babyBear, babySleep, babyFeet];

function AlbumSeg() {
  const { frame, fps } = useAnim();
  return (
    <>
      <Seg active="앨범" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 5,
        }}
      >
        {ALBUM_CELLS.map((src, i) => (
          <div key={i} style={pop(frame, fps, 6 + i * 5)}>
            <Photo src={src} radius={10} style={{ aspectRatio: "1" }} />
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 12,
          color: M.sub,
          textAlign: "center",
          padding: "18px 8px 6px",
          ...appear(frame, fps, 56),
        }}
      >
        올린 사진과 영상이 자동으로 정리돼요.
      </div>
    </>
  );
}

function CalSeg() {
  const { frame, fps } = useAnim();
  const HAS = [3, 5, 8, 11, 14, 16, 17];
  const days = Array.from({ length: 18 }, (_, i) => i + 1);
  return (
    <>
      <Seg active="달력" />
      <div
        style={{
          background: M.card,
          border: `1px solid ${M.line}`,
          borderRadius: 16,
          padding: 16,
          ...appear(frame, fps, 4),
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
          2026년 8월
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            fontSize: 11,
            textAlign: "center",
            color: M.sub,
          }}
        >
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d}>{d}</div>
          ))}
          {days.map((d) => {
            const hasIdx = HAS.indexOf(d);
            const has = hasIdx >= 0;
            return (
              <div
                key={d}
                style={{
                  padding: "7px 0",
                  borderRadius: 8,
                  background: has ? M.pink : "transparent",
                  color: has ? M.terra : M.sub,
                  fontWeight: has ? 600 : 400,
                  ...(has ? pop(frame, fps, 18 + hasIdx * 6) : {}),
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          fontSize: 12,
          color: M.sub,
          textAlign: "center",
          padding: "18px 8px 6px",
          ...appear(frame, fps, 66),
        }}
      >
        기록이 있는 날짜에 표시가 남아요.
      </div>
    </>
  );
}

function AlbumScreenOnly() {
  return (
    <Device>
      <AppBar />
      <div style={{ flex: 1, overflow: "hidden", padding: "4px 18px 0" }}>
        <AlbumSeg />
      </div>
      <Nav5 active="album" />
    </Device>
  );
}

function CalScreenOnly() {
  return (
    <Device>
      <AppBar />
      <div style={{ flex: 1, overflow: "hidden", padding: "4px 18px 0" }}>
        <CalSeg />
      </div>
      <Nav5 active="cal" />
    </Device>
  );
}

/** 앨범 자동 정리 → 달력 표시가 차례로 보이는 순회 화면 */
export function AlbumCalScreen() {
  const HALF = 120;
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={HALF}>
        <Fade duration={HALF}>
          <AlbumScreenOnly />
        </Fade>
      </Sequence>
      <Sequence from={HALF} durationInFrames={HALF}>
        <Fade duration={HALF}>
          <CalScreenOnly />
        </Fade>
      </Sequence>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/* 걱정 살펴보기 — 챗 접수 → 동의 → 스텝 → 리포트 → 완료 */

function ChatBar() {
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${SAFE_TOP + 16}px 18px 8px`,
        position: "relative",
      }}
    >
      <span style={{ fontSize: 17 }}>←</span>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_TOP + 12,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 17,
          color: M.terra,
        }}
      >
        주부리
      </span>
      <span style={{ color: M.sub, fontSize: 15 }}>ⓘ</span>
    </div>
  );
}

function BotMsg({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{ display: "flex", gap: 8, alignItems: "flex-start", ...style }}
    >
      <JubFace size={30} />
      <div
        style={{
          maxWidth: "86%",
          background: M.card,
          border: "1px solid #F2DFD3",
          borderRadius: "16px 16px 16px 4px",
          padding: "11px 14px",
          fontSize: 13.5,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MeMsg({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", ...style }}>
      <div
        style={{
          maxWidth: "80%",
          background: M.fab,
          color: "#fff",
          borderRadius: "16px 16px 4px 16px",
          padding: "10px 14px",
          fontSize: 13.5,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  const { frame } = useAnim();
  return (
    <div
      style={{
        alignSelf: "flex-start",
        marginLeft: 38,
        background: M.card,
        border: "1px solid #F2DFD3",
        borderRadius: "16px 16px 16px 4px",
        padding: "12px 16px",
        display: "flex",
        gap: 4,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#D9B8A5",
            opacity: Math.floor(frame / 8) % 3 === i ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

function Chip({
  children,
  worry,
  pressed,
  style,
}: {
  children: ReactNode;
  worry?: boolean;
  pressed?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        marginLeft: 38,
        border: worry ? `1.5px solid ${M.coralLine}` : "1px solid #E9D8CB",
        background: pressed ? "#FEF4EF" : M.card,
        color: worry ? M.terra : "#5C4E41",
        fontWeight: worry ? 700 : 500,
        borderRadius: 20,
        padding: "9px 16px",
        fontSize: 13,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function InputBar() {
  return (
    <div
      style={{
        flex: "none",
        borderTop: "1px solid #F5E6DB",
        padding: "10px 16px 10px",
      }}
    >
      <div
        style={{
          background: "#FFF1E9",
          borderRadius: 24,
          padding: "6px 8px 6px 16px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 13.5,
          color: "#A08A76",
        }}
      >
        <span style={{ flex: 1, padding: "6px 0" }}>직접 입력할래요</span>
        <span style={{ fontSize: 17, color: "#C0674C", padding: "0 5px" }}>
          🎤
        </span>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#C96F3D",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            flex: "none",
          }}
        >
          ↑
        </span>
      </div>
    </div>
  );
}

/** 장면 1 — 주부리 챗: 걱정 한마디가 접수되는 순간 */
function SceneChat({ frozen }: { frozen?: boolean }) {
  const { frame, fps } = useAnim();
  const f = frozen ? 9999 : frame;
  const typing = !frozen && frame >= 85 && frame < 115;
  const homeChips = !frozen && frame >= 35 && frame < 70;
  const still = (delay: number): CSSProperties =>
    frozen ? {} : appear(frame, fps, delay);
  return (
    <Device>
      <ChatBar />
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "8px 16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {(frozen || f >= 10) && (
          <BotMsg style={still(10)}>
            안녕하세요, 주부리예요. 서준이에 대해 궁금한 걸 물어보세요 — 쌓인
            기록을 바탕으로 함께 살펴봐요.
          </BotMsg>
        )}
        {homeChips && (
          <>
            <Chip style={still(35)}>📖 지난달 서준이 순간 모아줘</Chip>
            <Chip style={still(41)}>📅 검진·접종 일정 알려줘</Chip>
            <Chip worry style={still(47)}>
              🔒 아이가 걱정돼요
            </Chip>
          </>
        )}
        {(frozen || f >= 70) && (
          <MeMsg style={still(70)}>
            아이가 말이 좀 늦는 것 같아서 걱정돼요
          </MeMsg>
        )}
        {typing && <TypingDots />}
        {(frozen || f >= 115) && (
          <BotMsg style={still(115)}>
            적어주신 마음, 기록에 담아뒀어요. 그 걱정, 쌓인 기록과 함께 차근히
            살펴볼까요?
          </BotMsg>
        )}
        {(frozen || f >= 140) && (
          <Chip
            worry
            pressed={!frozen && frame >= 165}
            style={{
              ...still(140),
              ...(!frozen && frame >= 165 ? { transform: "scale(0.97)" } : {}),
            }}
          >
            🔒 걱정 살펴보기 시작
          </Chip>
        )}
        {(frozen || f >= 148) && <Chip style={still(148)}>다음에 할게요</Chip>}
      </div>
      <InputBar />
      <Nav5 active="chat" />
    </Device>
  );
}

/** 장면 2 — 동의 시트: 여기서부터는 부모님만 봐요 */
function SceneConsent() {
  const { frame, fps } = useAnim();
  const dim = interpolate(frame, [0, 14], [0, 0.45], {
    extrapolateRight: "clamp",
  });
  return (
    <Device>
      <SceneChat frozen />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(42,30,20,${dim})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: M.card,
          borderRadius: "22px 22px 0 0",
          padding: "22px 20px 24px",
          ...appear(frame, fps, 8),
        }}
      >
        <div
          style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em" }}
        >
          여기서부터는 부모님만 봐요
        </div>
        <div style={{ fontSize: 13.5, color: M.sub, marginTop: 6 }}>
          이 대화는 가족에게 보이지 않아요. 정답을 드리는 곳이 아니라, 기록을
          정리하는 걸 도와드리는 공간이에요.
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            marginTop: 14,
            fontSize: 12,
            color: M.sub,
          }}
        >
          <span
            style={{
              width: 15,
              height: 15,
              borderRadius: 4,
              background: M.fab,
              color: "#fff",
              fontSize: 10,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
              marginTop: 2,
              ...pop(frame, fps, 34),
            }}
          >
            ✓
          </span>
          남긴 기록이 정리에 사용되는 것에 동의해요
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "14px 0",
            borderRadius: 18,
            background: M.dark,
            color: "#FFF8F5",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 700,
            transform: frame >= 68 ? "scale(0.97)" : undefined,
            ...appear(frame, fps, 20),
          }}
        >
          계속하기
        </div>
        <div
          style={{
            marginTop: 8,
            padding: "14px 0",
            borderRadius: 18,
            background: M.card,
            border: `1px solid ${M.line}`,
            color: "#5C4E41",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
            ...appear(frame, fps, 26),
          }}
        >
          다음에 할게요
        </div>
      </div>
    </Device>
  );
}

/* ---- 스텝 공통 크롬 ---- */

function StepChrome({
  bg,
  sage,
  stepNo,
  pctFrom,
  pctTo,
  tray,
  children,
}: {
  bg: string;
  sage?: boolean;
  stepNo: string;
  pctFrom: number;
  pctTo: number;
  tray?: string;
  children: ReactNode;
}) {
  const { frame, fps } = useAnim();
  const pct = interpolate(frame, [6, 26], [pctFrom, pctTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Device bg={bg}>
      <div
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${SAFE_TOP + 14}px 18px 6px`,
        }}
      >
        <span
          style={{
            background: sage ? M.sage : M.card,
            border: sage ? `1px solid ${M.sage}` : "1px solid #F0BCAE",
            color: sage ? "#EAF2EF" : "#C0674C",
            fontSize: 11.5,
            fontWeight: 700,
            borderRadius: 16,
            padding: "4px 12px",
          }}
        >
          🔒 부모님만 봐요
        </span>
        <span
          style={{
            fontSize: 13,
            color: sage ? "#35544B" : M.sub,
            fontWeight: sage ? 700 : 500,
          }}
        >
          닫기 ✕
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "4px 18px 0",
          fontSize: 12.5,
          fontWeight: 700,
          color: sage ? M.sageDeeper : "#5C4E41",
        }}
      >
        <span>걱정 살펴보기</span>
        <span>{stepNo}</span>
      </div>
      <div
        style={{
          height: 5,
          background: sage ? "#CDDFD9" : M.line,
          borderRadius: 3,
          overflow: "hidden",
          margin: "7px 18px 0",
          flex: "none",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: sage ? M.sage : M.coral,
            borderRadius: 3,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "14px 18px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {children}
      </div>
      {tray && (
        <div
          style={{
            flex: "none",
            margin: "0 14px 12px",
            background: "#2E6B60",
            color: "#EAF3F0",
            borderRadius: 18,
            padding: "11px 15px",
            fontSize: 12.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...appear(frame, fps, 18),
          }}
        >
          <span>📄 리포트에 정리 중</span>
          <span style={{ fontWeight: 700 }}>{tray}</span>
        </div>
      )}
    </Device>
  );
}

function StepQ({ children, sage }: { children: ReactNode; sage?: boolean }) {
  const { frame, fps } = useAnim();
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        ...appear(frame, fps, 8),
      }}
    >
      <JubFace size={34} />
      <div
        style={{
          fontSize: 17.5,
          fontWeight: 800,
          lineHeight: 1.45,
          letterSpacing: "-0.01em",
          color: sage ? M.sageDeeper : M.ink,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function OptBtn({
  label,
  sel,
  sage,
  minor,
  delay,
  selAt,
}: {
  label: string;
  sel?: boolean;
  sage?: boolean;
  minor?: boolean;
  delay: number;
  selAt?: number;
}) {
  const { frame, fps } = useAnim();
  const selected = sel && selAt !== undefined && frame >= selAt;
  const selBorder = sage ? M.sage : M.coralLine;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: selected ? (sage ? "#D8E6E1" : "#FEF4EF") : M.card,
        border: minor
          ? `1px dashed #D9C9BA`
          : selected
            ? `1.5px solid ${selBorder}`
            : sage
              ? `1.5px solid ${M.card}`
              : `1px solid ${M.line}`,
        borderRadius: 16,
        padding: minor ? "11px 16px" : "14px 16px",
        fontSize: minor ? 13 : 14.5,
        color: selected
          ? sage
            ? M.sageDeeper
            : M.ink
          : minor
            ? M.sub
            : sage
              ? "#35544B"
              : "#5C4E41",
        fontWeight: selected ? 700 : 500,
        boxShadow: sage && !minor ? "0 1px 3px rgba(45,90,78,0.09)" : undefined,
        ...appear(frame, fps, delay),
      }}
    >
      {!sage && !minor && (
        <span
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            border: `1.5px solid ${selected ? M.coralDeep : "#D9C9BA"}`,
            background: selected ? M.coralDeep : M.card,
            boxShadow: selected ? "inset 0 0 0 3px #FEF4EF" : undefined,
            flex: "none",
          }}
        />
      )}
      {label}
      {selected && (
        <span
          style={{
            marginLeft: "auto",
            color: sage ? M.sage : M.coralDeep,
            fontWeight: 800,
            ...pop(frame, fps, selAt!),
          }}
        >
          ✓
        </span>
      )}
    </div>
  );
}

/** 장면 3 — 스텝 1/4: 이맘때 살펴보기 (핑크 테마) */
function SceneStep1() {
  const { frame, fps } = useAnim();
  return (
    <StepChrome
      bg={PINK_GRADIENT}
      stepNo="약 2분 · 1/4"
      pctFrom={10}
      pctTo={25}
    >
      <div style={appear(frame, fps, 6)}>
        <Photo src={g1} height={150} />
      </div>
      <StepQ>
        이맘때(14개월) 살펴보기 —<br />
        서준이는 &ldquo;엄마&rdquo; 같은 말을 얼마나 하나요?
      </StepQ>
      <OptBtn label="자주 해요" delay={26} />
      <OptBtn label="가끔 해요" delay={34} />
      <OptBtn label="거의 없어요" delay={42} sel selAt={80} />
      <div
        style={{
          fontSize: 11,
          color: "#A08A76",
          textAlign: "center",
          ...appear(frame, fps, 52),
        }}
      >
        ⓘ 질문은 K-DST 월령 문항을 참고했어요. 판단이 아니라 기록을 위한
        질문이에요.
      </div>
    </StepChrome>
  );
}

/** 장면 4 — 스텝 2/4: 마음에 걸리는 점 (세이지 테마) */
function SceneStep2() {
  const { frame, fps } = useAnim();
  return (
    <StepChrome
      bg={M.sageBg}
      sage
      stepNo="2/4"
      pctFrom={25}
      pctTo={45}
      tray="관찰 2"
    >
      <StepQ sage>
        어떤 점이 가장
        <br />
        마음에 걸리세요?
      </StepQ>
      <OptBtn
        sage
        label="말이 또래보다 늦는 것 같아요"
        delay={22}
        sel
        selAt={70}
      />
      <OptBtn sage label="불러도 반응이 적어요" delay={30} />
      <OptBtn sage minor label="잘 모르겠어요 · 직접 쓸래요" delay={38} />
      <div style={appear(frame, fps, 46)}>
        <Photo src={g1} height={120} />
      </div>
    </StepChrome>
  );
}

const PICKED = [0, 2, 4];

/** 장면 5 — 스텝 3/4: 그 무렵의 기록에서 장면 고르기 */
function SceneStep3() {
  const { frame, fps } = useAnim();
  const pickedCount = PICKED.filter(
    (_, order) => frame >= 46 + order * 18
  ).length;
  return (
    <StepChrome
      bg={M.cream}
      stepNo="3/4"
      pctFrom={45}
      pctTo={80}
      tray={`관찰 3 · 사진 ${pickedCount}`}
    >
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 19,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
          ...appear(frame, fps, 4),
        }}
      >
        그 무렵의 기록이에요
        <br />
        <span style={{ color: M.coralDeep }}>함께 담을 장면</span>을 골라주세요
      </div>
      <div
        style={{
          fontSize: 12,
          color: M.sub,
          textAlign: "center",
          ...appear(frame, fps, 10),
        }}
      >
        당시의 행동이 잘 보이는 사진을 고르면 더 정확한 정리에 도움이 돼요.
        무엇을 담을지는 부모님이 정해요.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {PHOTOS.map((src, i) => {
          const order = PICKED.indexOf(i);
          const isSel = order >= 0 && frame >= 46 + order * 18;
          return (
            <div key={i} style={appear(frame, fps, 14 + i * 4)}>
              <Photo
                src={src}
                radius={12}
                style={{
                  aspectRatio: "4 / 3.1",
                  border: isSel
                    ? `2.5px solid ${M.coralLine}`
                    : "2.5px solid transparent",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 9,
                    bottom: 6,
                    fontSize: 10.5,
                    color: "rgba(255,255,255,0.95)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.45)",
                  }}
                >
                  {PHOTO_LABELS[i]}
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: isSel
                      ? M.coralDeep
                      : "rgba(255,252,250,0.82)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...(isSel ? pop(frame, fps, 46 + order * 18) : {}),
                  }}
                >
                  {isSel ? "✓" : ""}
                </span>
              </Photo>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 7, ...appear(frame, fps, 100) }}>
        <div
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 18,
            background: M.card,
            border: `1px solid ${M.line}`,
            color: "#5C4E41",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          기록 없이 계속
        </div>
        <div
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 18,
            background: "#EA9892",
            color: "#3B211A",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 800,
          }}
        >
          다음 →
        </div>
      </div>
    </StepChrome>
  );
}

/** 장면 6 — 스텝 4/4: 또래 비교 + 지금까지 정리 */
function SceneStep4() {
  const { frame, fps } = useAnim();
  const rows = [
    { lab: "0~3 단어", pct: 15, hl: true },
    { lab: "4~10 단어", pct: 65, hl: false },
    { lab: "10단어 이상", pct: 20, hl: false },
  ];
  const grow = interpolate(frame, [24, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <StepChrome bg={M.cream} stepNo="4/4" pctFrom={80} pctTo={100}>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 19,
          fontWeight: 700,
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
          ...appear(frame, fps, 4),
        }}
      >
        이제 리포트를
        <br />
        만들어볼까요?
      </div>
      <div style={{ fontSize: 12, color: M.sub, ...appear(frame, fps, 8) }}>
        우리아이 성장 관찰 질문 4/4
      </div>
      <div
        style={{
          background: M.card,
          borderRadius: 16,
          padding: "15px 16px",
          boxShadow: "0 1px 4px rgba(74,52,30,0.08)",
          position: "relative",
          ...appear(frame, fps, 14),
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700 }}>비슷한 시기 또래는</div>
        {rows.map((r) => (
          <div
            key={r.lab}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              marginTop: 9,
              color: r.hl ? "#C0674C" : M.sub,
              fontWeight: r.hl ? 800 : 500,
            }}
          >
            <span style={{ width: 70, flex: "none" }}>{r.lab}</span>
            <span
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                background: "#F1E7DB",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  borderRadius: 4,
                  width: `${r.pct * grow}%`,
                  background: r.hl ? M.coral : "#E0D2C0",
                }}
              />
            </span>
            <span style={{ width: 34, textAlign: "right", flex: "none" }}>
              {r.pct}%
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            width: 38,
            height: 38,
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${M.card}`,
            boxShadow: "0 1px 5px rgba(74,52,30,0.22)",
          }}
        >
          <img
            src={g2}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        style={{
          background: M.card,
          borderRadius: 16,
          padding: "13px 16px",
          fontSize: 13,
          boxShadow: "0 1px 4px rgba(74,52,30,0.08)",
          ...appear(frame, fps, 36),
        }}
      >
        <b style={{ fontSize: 13.5 }}>지금까지 정리</b>
        <div style={{ display: "flex", gap: 6, marginTop: 9 }}>
          {[
            ["👁 관찰", "3"],
            ["📷 사진", "3"],
            ["📅 기간", "2개월"],
          ].map(([k, v], i) => (
            <div
              key={k}
              style={{
                flex: 1,
                background: "#FBEDE6",
                borderRadius: 12,
                padding: "8px 0 7px",
                textAlign: "center",
                fontSize: 10.5,
                color: M.sub,
                ...pop(frame, fps, 46 + i * 8),
              }}
            >
              {k}
              <div
                style={{
                  fontSize: 15,
                  color: M.ink,
                  fontWeight: 700,
                  marginTop: 1,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "#F6F1EA",
          borderRadius: 12,
          padding: "11px 14px",
          fontSize: 12,
          color: M.sub,
          ...appear(frame, fps, 62),
        }}
      >
        ⓘ 이 정리로 아이의 상태를 의학적으로 판단할 수는 없어요. 참고용으로만
        활용해주세요.
      </div>
      <div
        style={{
          padding: "14px 0",
          borderRadius: 18,
          background: M.dark,
          color: "#FFF8F5",
          textAlign: "center",
          fontSize: 15,
          fontWeight: 700,
          transform: frame >= 115 ? "scale(0.97)" : undefined,
          ...appear(frame, fps, 78),
        }}
      >
        리포트 만들기 →
      </div>
    </StepChrome>
  );
}

function RepSec({
  title,
  children,
  delay,
}: {
  title: string;
  children: ReactNode;
  delay: number;
}) {
  const { frame, fps } = useAnim();
  return (
    <div
      style={{
        background: "#F6F1EA",
        borderRadius: 12,
        padding: "13px 15px",
        ...appear(frame, fps, delay),
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.06em",
          color: M.sub,
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/** 장면 7 — 리포트: 병원 가기 전 선생님이 먼저 읽는 정리본 */
function SceneReport() {
  const { frame, fps } = useAnim();
  return (
    <Device bg={M.cream}>
      <div style={{ flex: "none", padding: `${SAFE_TOP + 16}px 18px 0` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            서준이의 기록
          </span>
          <span style={{ color: "#A08A76", fontSize: 16 }}>⇄</span>
        </div>
        <div style={{ fontSize: 12, color: M.sub, marginTop: 2 }}>
          2026년 6월 ~ 8월 · 자료 정리본
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {["발달", "성장", "아플 때"].map((t, i) => (
            <div
              key={t}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "9px 0",
                borderRadius: 12,
                fontSize: 13,
                border: i === 0 ? "1px solid #362F2A" : `1px solid ${M.line}`,
                background: i === 0 ? "#362F2A" : M.card,
                color: i === 0 ? "#FFF8F5" : "#A08A76",
                fontWeight: i === 0 ? 700 : 500,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "14px 18px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            border: `1.5px dashed ${M.teal}`,
            background: "#F2F7F5",
            borderRadius: 12,
            padding: "12px 15px",
            fontSize: 13.5,
            fontWeight: 700,
            color: "#2D5A4F",
            textAlign: "center",
            ...appear(frame, fps, 8),
          }}
        >
          병원에 가기 전, 선생님이 먼저 읽어요
          <div style={{ fontWeight: 400, fontSize: 12, marginTop: 3 }}>
            진료·상담 전에 미리 전달할 수 있는 정리본이에요.
          </div>
        </div>
        <RepSec title="요약" delay={20}>
          <div style={{ fontSize: 13 }}>
            보호자는 한두 달 전부터 &ldquo;말이 또래보다 늦는 것 같아요&rdquo;를
            관찰해 왔고, 그 기간의 기록을 정리했어요.
          </div>
        </RepSec>
        <RepSec title="아이 정보" delay={30}>
          <div style={{ fontSize: 13 }}>서준 · 14개월 · 남아</div>
        </RepSec>
        <RepSec title="관찰 기록 (날짜별)" delay={40}>
          {[
            ["7월 3일", "이름을 불렀을 때 두 번 중 한 번쯤 돌아봄"],
            ["7월 21일", "“엄마” 외 표현 단어는 관찰되지 않음"],
            ["8월 17일", "이맘때 살펴보기 응답 — 거의 없어요"],
          ].map(([d, t], i) => (
            <div
              key={d}
              style={{
                fontSize: 13,
                padding: "4px 0",
                borderBottom: i < 2 ? "1px dashed #E5D8C8" : "none",
                ...appear(frame, fps, 48 + i * 10),
              }}
            >
              <span
                style={{
                  color: M.sub,
                  marginRight: 6,
                  fontSize: 11.5,
                }}
              >
                {d}
              </span>
              {t}
            </div>
          ))}
        </RepSec>
        <RepSec title="사진 증거 (3장)" delay={80}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 5,
              marginTop: 4,
            }}
          >
            {PICKED.map((i, order) => (
              <div key={i} style={pop(frame, fps, 88 + order * 8)}>
                <Photo src={PHOTOS[i]} radius={8} style={{ aspectRatio: "1" }} />
              </div>
            ))}
          </div>
        </RepSec>
        <div
          style={{
            padding: "14px 0",
            borderRadius: 14,
            background: M.teal,
            color: "#F2F7F5",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 700,
            transform: frame >= 135 ? "scale(0.97)" : undefined,
            ...appear(frame, fps, 108),
          }}
        >
          저장하고 보내기
        </div>
      </div>
    </Device>
  );
}

/** 장면 8 — 완료: 흩어져 있던 기억이 정리된 기록이 됐어요 */
function SceneDone() {
  const { frame, fps } = useAnim();
  return (
    <Device bg={M.cream}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 24,
          gap: 10,
        }}
      >
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: "50%",
            background: "#F8DCD7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 8,
            ...pop(frame, fps, 8),
          }}
        >
          {/* 서류 아이콘 */}
          <div
            style={{
              width: 40,
              height: 50,
              background: "#E07D75",
              borderRadius: 6,
              position: "relative",
            }}
          >
            {[11, 20, 29].map((top) => (
              <span
                key={top}
                style={{
                  position: "absolute",
                  left: 9,
                  right: 9,
                  top,
                  height: 4,
                  background: "#F8DCD7",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          <span
            style={{
              position: "absolute",
              right: -22,
              top: 6,
              color: "#D9A05B",
              fontSize: 17,
              ...pop(frame, fps, 26),
            }}
          >
            ✦
          </span>
          <span
            style={{
              position: "absolute",
              right: -32,
              top: 32,
              color: "#D9A05B",
              fontSize: 11,
              ...pop(frame, fps, 34),
            }}
          >
            ✦
          </span>
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 21,
            fontWeight: 700,
            ...appear(frame, fps, 18),
          }}
        >
          리포트가 준비됐어요
        </div>
        <div style={{ fontSize: 13.5, color: M.sub, ...appear(frame, fps, 28) }}>
          흩어져 있던 기억이
          <br />
          정리된 기록이 됐어요.
        </div>
        <div
          style={{
            marginTop: 22,
            padding: "14px 48px",
            borderRadius: 18,
            background: M.card,
            border: `1px solid ${M.line}`,
            color: "#5C4E41",
            fontSize: 15,
            fontWeight: 600,
            ...appear(frame, fps, 40),
          }}
        >
          일기로 돌아가기
        </div>
      </div>
    </Device>
  );
}

/* ---- 걱정 흐름 시퀀스 ---- */

const WORRY_SCENES: Array<{
  Comp: ComponentType;
  duration: number;
  /** 랜딩 4단계(물어보기·살펴보기·기록 고르기·리포트) 중 어디에 해당하는지 */
  step: number;
}> = [
  { Comp: () => <SceneChat />, duration: 185, step: 1 },
  { Comp: SceneConsent, duration: 90, step: 1 },
  { Comp: SceneStep1, duration: 130, step: 2 },
  { Comp: SceneStep2, duration: 120, step: 2 },
  { Comp: SceneStep3, duration: 140, step: 3 },
  { Comp: SceneStep4, duration: 130, step: 4 },
  { Comp: SceneReport, duration: 160, step: 4 },
  { Comp: SceneDone, duration: 100, step: 4 },
];

export const WORRY_FLOW_DURATION = WORRY_SCENES.reduce(
  (sum, s) => sum + s.duration,
  0
);

/** 재생 프레임 → 현재 진행 중인 랜딩 단계 번호(1~4) */
export function worryStepAt(frame: number): number {
  let acc = 0;
  for (const s of WORRY_SCENES) {
    acc += s.duration;
    if (frame < acc) return s.step;
  }
  return 4;
}

/** 걱정 살펴보기 전 과정 — 목업의 실제 흐름을 그대로 재생한다 */
export function WorryFlowScreen() {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: M.cream }}>
      {WORRY_SCENES.map(({ Comp, duration }, i) => {
        const start = from;
        from += duration;
        return (
          <Sequence key={i} from={start} durationInFrames={duration}>
            <Fade duration={duration}>
              <Comp />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/* 서비스 투어 — 히어로용: 이 폰 하나만 보면 서비스 전체가 이해되는 5장면 순회 */

export const MOCKUP_TOUR_CAPTIONS = [
  "① 평소엔 가족이 함께 쓰는 성장 일기",
  "② 사진과 영상은 앨범에 자동 정리",
  "③ 걱정되면, 주부리에게 물어보기",
  "④ 기록으로 걱정 살펴보기",
  "⑤ 전문가에게 가져갈 리포트",
];

const TOUR_SCENES: Array<{ Comp: ComponentType; duration: number }> = [
  { Comp: DiaryFeedScreen, duration: 150 },
  { Comp: AlbumScreenOnly, duration: 110 },
  { Comp: () => <SceneChat />, duration: 185 },
  { Comp: SceneStep1, duration: 130 },
  { Comp: SceneReport, duration: 160 },
];

export const MOCKUP_TOUR_DURATION = TOUR_SCENES.reduce(
  (sum, s) => sum + s.duration,
  0
);

/** 재생 프레임 → 현재 투어 장면 인덱스(0~4) */
export function tourSceneAt(frame: number): number {
  let acc = 0;
  for (let i = 0; i < TOUR_SCENES.length; i++) {
    acc += TOUR_SCENES[i].duration;
    if (frame < acc) return i;
  }
  return TOUR_SCENES.length - 1;
}

/* ---------------------------------------------------------------- */
/* 커뮤니티·선물숍 — 피그마 레퍼런스(27:6, 27:140)를 목업 스타일로 변환.
 * 랜딩에서 단독 노출되는 소개 화면이라 흐름 없이 등장 모션만 살짝 준다. */

/** 카테고리 필터 알약 줄 */
function PillRow({ pills, style }: { pills: string[]; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", gap: 7, ...style }}>
      {pills.map((label, i) => (
        <div
          key={label}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12.5,
            whiteSpace: "nowrap",
            background: i === 0 ? M.coral : M.card,
            border: i === 0 ? `1px solid ${M.coral}` : "1px solid #E9D8CB",
            color: i === 0 ? "#4A2314" : "#5C4E41",
            fontWeight: i === 0 ? 700 : 500,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function CommPost({
  tag,
  hot,
  meta,
  avatar,
  title,
  snippet,
  likes,
  comments,
  liked,
  thumb,
  delay,
}: {
  tag: string;
  hot?: boolean;
  meta: string;
  avatar?: string;
  title: string;
  snippet: string;
  likes: number;
  comments: number;
  liked?: boolean;
  thumb?: string;
  delay: number;
}) {
  const { frame, fps } = useAnim();
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        background: M.card,
        border: `1px solid ${M.line}`,
        borderRadius: 18,
        padding: 14,
        ...appear(frame, fps, delay),
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 11,
            color: M.sub,
            marginBottom: 7,
          }}
        >
          <span
            style={{
              background: hot ? "rgba(232,144,124,0.14)" : "#F3E9DC",
              color: hot ? "#C0674C" : M.sub,
              fontWeight: 700,
              borderRadius: 6,
              padding: "2px 8px",
            }}
          >
            {tag}
          </span>
          {avatar && (
            <img
              src={avatar}
              alt=""
              style={{
                width: 17,
                height: 17,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          <span>{meta}</span>
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: M.sub,
            lineHeight: 1.55,
            marginBottom: 9,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {snippet}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 11.5 }}>
          <span
            style={{
              color: liked ? "#C57A5A" : M.sub,
              fontWeight: liked ? 700 : 500,
            }}
          >
            {liked ? "♥" : "♡"} {likes}
          </span>
          <span style={{ color: M.sub }}>💬 {comments}</span>
        </div>
      </div>
      {thumb && (
        <Photo
          src={thumb}
          radius={12}
          style={{ width: 68, height: 68, flex: "none" }}
        />
      )}
    </div>
  );
}

const NAV_COMM = [
  { key: "home", icon: "🏠", label: "홈" },
  { key: "comm", icon: "👥", label: "커뮤니티" },
  { key: "album", icon: "🖼", label: "앨범" },
  { key: "set", icon: "⚙️", label: "설정" },
];

/** 커뮤니티 — 동기 부모 게시판 (랜딩 소개용, 준비 중 기능) */
export function CommunityScreen() {
  const { frame, fps } = useAnim();
  const bob = Math.sin(frame / 14) * 2.5;
  return (
    <AbsoluteFill>
      <Device bg={M.cream}>
        <AppBar />
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: "6px 16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* 환영 배너 */}
          <div
            style={{
              background: "linear-gradient(135deg, #E9DECB 0%, #E8907C 100%)",
              borderRadius: 20,
              padding: "20px 20px 18px",
              color: "#FFF7F0",
              ...appear(frame, fps, 4),
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
              }}
            >
              혼자가 아니에요,
              <br />
              함께 키워요
            </div>
            <div style={{ fontSize: 12.5, opacity: 0.92, marginTop: 6 }}>
              월령이 비슷한 동기 부모들과 소통해요
            </div>
          </div>

          <PillRow
            pills={["전체", "동기 게시판", "꿀팁 나눔"]}
            style={appear(frame, fps, 14)}
          />

          <CommPost
            tag="유아식"
            hot
            meta="맘마미아 · 2시간 전 · 조회 128"
            title="14개월 아기 유아식 공유해요"
            snippet="오늘 아침에 해준 단호박 퓨레 레시피입니다. 아이가 너무 잘 먹어서 뿌듯하네요."
            likes={32}
            comments={12}
            thumb={commFood}
            delay={24}
          />
          <CommPost
            tag="육아질문"
            hot
            meta="도담아빠 · 5시간 전 · 조회 256"
            title="걸음마 연습 꿀팁 있나요?"
            snippet="이제 막 잡고 서기 시작했는데, 신발은 언제부터 신기는 게 좋을까요? 선배 맘들의 조언 부탁드려요."
            likes={15}
            comments={8}
            thumb={commPlay}
            delay={36}
          />
          <CommPost
            tag="일상"
            meta="초보맘 · 6시간 전 · 조회 342"
            avatar={commAvatar}
            title="오늘도 육아 화이팅입니다!"
            snippet="다들 밤잠 설치셨죠? 따뜻한 커피 한 잔 드시고 오늘 하루도 힘내봐요. 💪"
            likes={45}
            comments={21}
            liked
            delay={48}
          />
        </div>

        {/* 글쓰기 FAB */}
        <div
          style={{
            position: "absolute",
            right: 18,
            bottom: 86,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: M.coral,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
            boxShadow: "0 6px 16px rgba(120,62,37,0.3)",
            transform: `translateY(${bob}px)`,
          }}
        >
          ✏️
        </div>
        <Nav5 active="comm" items={NAV_COMM} />
      </Device>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */

const NAV_GIFT = [
  { key: "diary", icon: "📖", label: "일기" },
  { key: "album", icon: "🖼", label: "앨범" },
  { key: "gift", icon: "🎁", label: "선물" },
  { key: "cal", icon: "📅", label: "캘린더" },
  { key: "report", icon: "📄", label: "리포트" },
];

function GiftProduct({
  src,
  title,
  sub,
  price,
  delay,
}: {
  src: string;
  title: string;
  sub: string;
  price: string;
  delay: number;
}) {
  const { frame, fps } = useAnim();
  return (
    <div
      style={{
        background: M.card,
        border: `1px solid ${M.line}`,
        borderRadius: 20,
        padding: 12,
        ...appear(frame, fps, delay),
      }}
    >
      <Photo src={src} height={108} radius={14} />
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          margin: "9px 4px 0",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 11.5, color: M.sub, margin: "2px 4px 0" }}>
        {sub}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: "#5C4E41",
          margin: "6px 4px 1px",
        }}
      >
        {price}
      </div>
    </div>
  );
}

/** 선물숍 — 내 기록에서 출발하는 커머스 (랜딩 소개용, 준비 중 기능) */
export function GiftShopScreen() {
  const { frame, fps } = useAnim();
  return (
    <AbsoluteFill>
      <Device bg={M.cream}>
        {/* 헤더 */}
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${SAFE_TOP + 16}px 18px 8px`,
            position: "relative",
          }}
        >
          <span style={{ fontSize: 17 }}>←</span>
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: SAFE_TOP + 12,
              textAlign: "center",
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 18,
              color: M.terra,
            }}
          >
            선물숍
          </span>
          <span style={{ fontSize: 16 }}>🛒</span>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: "4px 16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* 히어로 배너 */}
          <div style={appear(frame, fps, 4)}>
            <Photo src={storeAlbum} height={138} radius={20}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(89,58,40,0.25), rgba(139,74,48,0.55))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 18.5,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    color: "#FFF6EE",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  }}
                >
                  우리 아이의 기록,
                  <br />
                  세상에 하나뿐인 선물로
                </div>
              </div>
            </Photo>
          </div>

          <PillRow
            pills={["전체", "포토북/앨범", "액자/캔버스"]}
            style={appear(frame, fps, 14)}
          />

          <GiftProduct
            src={storeAlbum}
            title="프리미엄 성장 앨범 (14개월)"
            sub="최고급 인화지로 담아내는 기록"
            price="89,000원"
            delay={24}
          />
          <GiftProduct
            src={storeGift}
            title="조부모님 감사 선물 세트"
            sub="감동을 전하는 특별 패키지"
            price="55,000원"
            delay={38}
          />
        </div>
        <Nav5 active="gift" items={NAV_GIFT} />
      </Device>
    </AbsoluteFill>
  );
}

export function MockupTourScreen() {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: M.paper }}>
      {TOUR_SCENES.map(({ Comp, duration }, i) => {
        const start = from;
        from += duration;
        return (
          <Sequence key={i} from={start} durationInFrames={duration}>
            <Fade duration={duration}>
              <Comp />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
