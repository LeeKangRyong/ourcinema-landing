import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import {
  appear,
  BottomNav,
  C,
  ChildChip,
  Photo,
  pop,
  SHADOW,
  Shell,
  TopBar,
  useAnim,
} from "./ui";
import babyBear from "../assets/photos/baby3.jpg";
import babySleep from "../assets/photos/baby5.jpg";
import babyTube from "../assets/photos/baby1.jpg";
import babyFeet from "../assets/photos/baby2.jpg";
import babyBlock from "../assets/photos/baby4.jpg";

const cardStyle = {
  background: C.card,
  borderRadius: 20,
  boxShadow: SHADOW,
} as const;

/* ---------------------------------------------------------------- */
/** B1 · 홈 피드 — 케어 카드 줄 + 오늘의 제안 + 게시물 (기록:케어 ≈ 60:40) */
export function HomeFeedScreen() {
  const { frame, fps } = useAnim();
  const liked = frame >= 100;
  return (
    <AbsoluteFill>
      <Shell nav={<BottomNav active="홈" />}>
        <TopBar />

        {/* 케어: 아이 카드 줄 */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 12,
            ...appear(frame, fps, 8),
          }}
        >
          {[
            { chip: "서준", text: "8월 리포트 도착" },
            { chip: "서아", text: "리포트 5일 뒤" },
          ].map((card) => (
            <div
              key={card.chip}
              style={{
                flex: 1,
                background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})`,
                color: "#fff",
                borderRadius: 18,
                padding: "12px 13px",
                fontSize: 14,
                boxShadow: "0 8px 18px rgba(43,160,138,0.25)",
              }}
            >
              <div style={{ marginBottom: 8, fontWeight: 700 }}>
                {card.chip} · {card.text}
              </div>
              <span
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  padding: "4px 11px",
                  fontSize: 12.5,
                }}
              >
                💬 물어보기
              </span>
            </div>
          ))}
        </div>

        {/* 케어: 오늘의 제안 */}
        <div
          style={{
            ...cardStyle,
            padding: "13px 15px",
            marginBottom: 12,
            fontSize: 14.5,
            borderLeft: `4px solid ${C.teal}`,
            ...appear(frame, fps, 20),
          }}
        >
          <div
            style={{
              color: C.teal,
              fontSize: 12.5,
              fontWeight: 800,
              marginBottom: 5,
            }}
          >
            ✦ 오늘의 제안 · 하루 1장
          </div>
          <div style={{ lineHeight: 1.5, marginBottom: 9 }}>
            옹알이가 늘었어요 — 말하는 모습 10초를 남겨볼까요?
          </div>
          <span
            style={{
              background: C.teal,
              color: "#fff",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            🎬 지금 남기기
          </span>
        </div>

        {/* 기록: 게시물 카드 */}
        <div
          style={{ ...cardStyle, padding: 13, ...appear(frame, fps, 34) }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
              fontSize: 14,
            }}
          >
            <ChildChip name="서준" />
            <span style={{ color: C.sub }}>엄마 · 2시간 전</span>
          </div>
          <Photo src={babyBear} height={195} />
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 10,
              fontSize: 15,
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: liked ? C.coral : C.ink,
                fontWeight: 700,
                ...pop(frame, fps, 100),
              }}
            >
              {liked ? "❤️ 3" : "♡ 2"}
            </span>
            <span style={{ color: C.sub }}>💬 벌써 걷네 ㅋㅋ</span>
          </div>
        </div>

        {/* 회고 소식 배너 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.coral}, ${C.coralDeep})`,
            color: "#fff",
            borderRadius: 16,
            padding: "12px 15px",
            marginTop: 12,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 8px 18px rgba(255,107,74,0.3)",
            ...appear(frame, fps, 56),
          }}
        >
          ✨ 서준이의 7월 회고가 만들어졌어요 →
        </div>
      </Shell>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/** B7 · 회고 탭 — 월별 자동 회고 보관함 */
export function AlbumScreen() {
  const { frame, fps } = useAnim();
  const pulse = 1 + 0.05 * Math.sin(frame / 9);
  return (
    <AbsoluteFill>
      <Shell nav={<BottomNav active="회고" />}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 800 }}>🎞️ 회고</div>
          <div style={{ display: "flex", gap: 6 }}>
            <ChildChip name="서준" />
            <ChildChip name="서아" active={false} />
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            padding: 12,
            marginBottom: 12,
            ...appear(frame, fps, 8),
          }}
        >
          <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 9 }}>
            7월의 서준
          </div>
          <Photo src={babySleep} height={165}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: "rgba(255,255,255,0.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: C.coral,
                  transform: `scale(${pulse})`,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                ▶
              </div>
            </div>
            <span
              style={{
                position: "absolute",
                left: 10,
                bottom: 10,
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              자동 회고 영상 · 0:42
            </span>
          </Photo>
          <div style={{ marginTop: 9, fontSize: 13.5, color: C.sub }}>
            사진 42장 · 영상 3개 · 가족 반응 12
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            padding: 12,
            marginBottom: 12,
            ...appear(frame, fps, 26),
          }}
        >
          <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 9 }}>
            6월의 서준
          </div>
          <Photo src={babyTube} height={105} />
        </div>

        <div
          style={{
            background: C.coralSoft,
            color: C.coral,
            borderRadius: 16,
            padding: "12px 15px",
            fontSize: 14,
            fontWeight: 700,
            textAlign: "center",
            ...appear(frame, fps, 44),
          }}
        >
          📖 이 회고를 실물 책으로 만들기
        </div>
      </Shell>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/** 챗봇 대화 말풍선 (공용) */
function Bubble({
  who,
  children,
  style,
}: {
  who: "user" | "bot";
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  if (who === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", ...style }}>
        <div
          style={{
            maxWidth: "80%",
            background: `linear-gradient(135deg, ${C.coral}, ${C.coralDeep})`,
            color: "#fff",
            borderRadius: "18px 18px 4px 18px",
            padding: "11px 14px",
            fontSize: 14,
            lineHeight: 1.5,
            boxShadow: "0 6px 14px rgba(255,107,74,0.25)",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 8, ...style }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          background: C.tealSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        🎬
      </div>
      <div
        style={{
          maxWidth: "82%",
          background: "#fff",
          borderRadius: "4px 18px 18px 18px",
          padding: "11px 14px",
          fontSize: 14,
          lineHeight: 1.55,
          boxShadow: SHADOW,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** C1 · 챗봇 주부리 — 판정하지 않는 접수창구, 걱정은 🔒 갈래로 */
export function CarebotScreen() {
  const { frame, fps } = useAnim();
  const typingVisible = frame >= 30 && frame < 70;
  const dots = ".".repeat((Math.floor(frame / 8) % 3) + 1);
  return (
    <AbsoluteFill>
      <Shell>
        <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 4 }}>
          💬 주부리에게 물어보기
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: C.sub,
            background: "#fff",
            borderRadius: 999,
            padding: "4px 12px",
            width: "fit-content",
            margin: "0 auto 14px",
            boxShadow: SHADOW,
          }}
        >
          서준이네 · 👶 서준 (14개월)
        </div>

        <Bubble who="user" style={appear(frame, fps, 10)}>
          아이가 말이 좀 늦는 것 같아서 걱정돼요
        </Bubble>

        {typingVisible && (
          <Bubble who="bot" style={{ marginTop: 12 }}>
            {dots}
          </Bubble>
        )}
        {frame >= 70 && (
          <Bubble who="bot" style={{ marginTop: 12, ...appear(frame, fps, 70) }}>
            적어주신 마음, 기록에 담아뒀어요. 그 걱정, 쌓인 기록과 함께 차근히
            살펴볼까요?
          </Bubble>
        )}

        {[
          { icon: "🔒", label: "걱정 살펴보기 시작", tone: C.coral, bg: C.coralSoft },
          { icon: "📖", label: "지난달 서준이 순간 모아줘", tone: C.teal, bg: C.tealSoft },
          { icon: "📅", label: "검진·접종 일정 알려줘", tone: C.teal, bg: C.tealSoft },
        ].map((btn, i) => (
          <div
            key={btn.label}
            style={{
              marginTop: i === 0 ? 16 : 8,
              marginLeft: 40,
              background: btn.bg,
              color: btn.tone,
              borderRadius: 999,
              padding: "9px 15px",
              fontSize: 13.5,
              fontWeight: 700,
              width: "fit-content",
              ...appear(frame, fps, 110 + i * 10),
            }}
          >
            {btn.icon} {btn.label}
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 18,
            right: 18,
            textAlign: "center",
            fontSize: 11.5,
            color: C.sub,
            lineHeight: 1.5,
          }}
        >
          이 대화는 가족에게 보이지 않아요 — 결론은 전문가와 함께예요
        </div>
      </Shell>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/** 리포트 플로우 — 확정된 걱정 대응 4단계: 물어보기 → 살펴보기 → 기록 고르기 → 리포트 */

export const REPORT_FLOW_DURATION = 480;
const SCENE = 120;

function SceneFade({
  children,
  duration = SCENE,
}: {
  children: React.ReactNode;
  duration?: number;
}) {
  const f = useCurrentFrame(); // Sequence 내 상대 프레임
  const opacity = interpolate(
    f,
    [0, 12, duration - 12, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>;
}

function StepHeader({ active }: { active: number }) {
  const steps = ["물어보기", "살펴보기", "기록", "리포트"];
  return (
    <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
      {steps.map((label, i) => (
        <div
          key={label}
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 11.5,
            fontWeight: 700,
            color: i === active ? "#fff" : C.sub,
            background: i === active ? C.teal : "#F4EDE7",
            borderRadius: 999,
            padding: "5px 0",
          }}
        >
          {i + 1} {label}
        </div>
      ))}
    </div>
  );
}

function SceneChat() {
  const { frame, fps } = useAnim();
  return (
    <Shell>
      <StepHeader active={0} />
      <Bubble who="user" style={appear(frame, fps, 8)}>
        아이가 말이 좀 늦는 것 같아서 걱정돼요
      </Bubble>
      <Bubble who="bot" style={{ marginTop: 12, ...appear(frame, fps, 34) }}>
        그 걱정, 쌓인 기록과 함께 차근히 살펴볼까요? 여기서부터는 부모님만
        봐요 — 가족에게 보이지 않아요.
      </Bubble>
      <div
        style={{
          marginTop: 16,
          marginLeft: 40,
          background: C.tealSoft,
          color: C.teal,
          borderRadius: 999,
          padding: "10px 16px",
          fontSize: 13.5,
          fontWeight: 800,
          width: "fit-content",
          ...appear(frame, fps, 66),
        }}
      >
        🔒 걱정 살펴보기 시작 →
      </div>
    </Shell>
  );
}

/** 살펴보기 — K-DST 월령 문항을 참고한 한 화면 한 질문 */
function SceneCheck() {
  const { frame, fps } = useAnim();
  const options = ["자주 해요", "가끔 해요", "거의 없어요"];
  const picked = 2;
  return (
    <Shell>
      <StepHeader active={1} />
      <div
        style={{
          fontSize: 12.5,
          color: C.teal,
          fontWeight: 800,
          marginBottom: 4,
          ...appear(frame, fps, 6),
        }}
      >
        🔒 부모님만 봐요 · 이맘때(14개월) 살펴보기
      </div>
      <div
        style={{
          fontSize: 17,
          fontWeight: 800,
          lineHeight: 1.4,
          marginBottom: 14,
          ...appear(frame, fps, 6),
        }}
      >
        서준이는 “엄마” 같은 말을
        <br />
        얼마나 하나요?
      </div>
      {options.map((label, i) => {
        const isPicked = i === picked;
        return (
          <div
            key={label}
            style={{
              ...cardStyle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "13px 15px",
              marginBottom: 9,
              fontSize: 14.5,
              fontWeight: 700,
              border: isPicked ? `2px solid ${C.teal}` : "2px solid transparent",
              color: isPicked ? C.teal : C.ink,
              ...appear(frame, fps, 16 + i * 10),
            }}
          >
            {label}
            {isPicked && (
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  background: C.teal,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  ...pop(frame, fps, 60),
                }}
              >
                ✓
              </span>
            )}
          </div>
        );
      })}
      <div
        style={{
          fontSize: 11.5,
          color: C.sub,
          lineHeight: 1.5,
          marginBottom: 12,
          ...appear(frame, fps, 50),
        }}
      >
        ⓘ 아이의 실제 행동을 짚어보는 질문이에요 — 판단이 아니라 기록을 위한 질문이에요
      </div>
      <div
        style={{
          background: C.teal,
          color: "#fff",
          borderRadius: 16,
          padding: "12px 0",
          textAlign: "center",
          fontSize: 14.5,
          fontWeight: 800,
          boxShadow: "0 8px 18px rgba(43,160,138,0.3)",
          ...appear(frame, fps, 80),
        }}
      >
        다음 →
      </div>
    </Shell>
  );
}

function ScenePhotoPick() {
  const { frame, fps } = useAnim();
  const photos = [babyBear, babyFeet, babyTube, babyBlock];
  const picked = [0, 2, 3];
  return (
    <Shell>
      <StepHeader active={2} />
      <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4, ...appear(frame, fps, 6) }}>
        그 무렵의 기록이에요 — 함께 담을 장면을 골라주세요
      </div>
      <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 12, ...appear(frame, fps, 6) }}>
        6월 12일~8월 14일 · 무엇을 담을지는 부모님이 정해요
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 9,
          ...appear(frame, fps, 14),
        }}
      >
        {photos.map((src, i) => {
          const pickIdx = picked.indexOf(i);
          return (
            <Photo key={i} src={src} height={105} radius={14}>
              {pickIdx >= 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 7,
                    right: 7,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: C.teal,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    ...pop(frame, fps, 30 + pickIdx * 14),
                  }}
                >
                  ✓
                </div>
              )}
            </Photo>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 14,
          background: C.teal,
          color: "#fff",
          borderRadius: 16,
          padding: "12px 0",
          textAlign: "center",
          fontSize: 14.5,
          fontWeight: 800,
          boxShadow: "0 8px 18px rgba(43,160,138,0.3)",
          ...appear(frame, fps, 80),
        }}
      >
        3장 골랐어요 · 다음 →
      </div>
    </Shell>
  );
}

function SceneReport() {
  const { frame, fps } = useAnim();
  const progress = interpolate(frame, [5, 55], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const done = frame >= 55;
  return (
    <Shell>
      <StepHeader active={3} />
      <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 12, ...appear(frame, fps, 4) }}>
        {done ? "리포트가 준비됐어요" : "리포트를 만들고 있어요…"}
      </div>
      <div style={{ ...cardStyle, padding: 15, ...appear(frame, fps, 8) }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800 }}>
            📄 서준이의 기록 · 발달 정리본
          </span>
          {done && (
            <span
              style={{
                background: C.tealSoft,
                color: C.teal,
                borderRadius: 999,
                padding: "3px 10px",
                fontSize: 12,
                fontWeight: 800,
                ...pop(frame, fps, 58),
              }}
            >
              ✓ 완성
            </span>
          )}
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: "#F4EDE7",
            overflow: "hidden",
            marginBottom: 13,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 4,
              background: `linear-gradient(90deg, ${C.teal}, ${C.tealDeep})`,
            }}
          />
        </div>
        {[
          ["요약", "말 표현이 늦는 것 같아요 · 두 달 전부터"],
          ["기록", "사진 3장 + 관찰 응답 3건"],
          ["또래", "비슷한 시기 4~10단어 65% · 구간 표시"],
        ].map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: "flex",
              gap: 10,
              fontSize: 13,
              lineHeight: 1.5,
              marginBottom: 7,
              ...appear(frame, fps, 20 + i * 10),
            }}
          >
            <span style={{ color: C.teal, fontWeight: 800, minWidth: 34 }}>{k}</span>
            <span style={{ color: C.ink }}>{v}</span>
          </div>
        ))}
        <div style={{ fontSize: 11.5, color: C.sub, marginTop: 6 }}>
          아이의 상태를 판단하지 않아요 — 결론은 전문가의 영역이에요
        </div>
      </div>
      {done && (
        <div
          style={{
            marginTop: 13,
            background: C.teal,
            color: "#fff",
            borderRadius: 16,
            padding: "12px 0",
            textAlign: "center",
            fontSize: 14.5,
            fontWeight: 800,
            boxShadow: "0 8px 18px rgba(43,160,138,0.3)",
            ...appear(frame, fps, 66),
          }}
        >
          🏥 병원 가기 전, 선생님께 미리 보내기 →
        </div>
      )}
    </Shell>
  );
}

/** 물어보기 → 살펴보기 → 기록 고르기 → 리포트 순서로 재생 */
export function ReportFlowScreen() {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Sequence from={0} durationInFrames={SCENE}>
        <SceneFade>
          <SceneChat />
        </SceneFade>
      </Sequence>
      <Sequence from={SCENE} durationInFrames={SCENE}>
        <SceneFade>
          <SceneCheck />
        </SceneFade>
      </Sequence>
      <Sequence from={SCENE * 2} durationInFrames={SCENE}>
        <SceneFade>
          <ScenePhotoPick />
        </SceneFade>
      </Sequence>
      <Sequence from={SCENE * 3} durationInFrames={SCENE}>
        <SceneFade>
          <SceneReport />
        </SceneFade>
      </Sequence>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/** 서비스 투어 — 히어로용: 이 폰 하나만 보면 서비스 전체가 이해되는 5장면 순회
 *  ① 홈 피드 → ② 회고 → ③ 주부리 → ④ 걱정 살펴보기 → ⑤ 리포트 */

export const TOUR_SCENE = 150;
export const TOUR_CAPTIONS = [
  "① 평소엔 — 가족이 함께 쓰는 성장 일기",
  "② 매달 자동으로 완성되는 회고",
  "③ 걱정되면, 주부리에게 물어보기",
  "④ 기록으로 걱정 살펴보기",
  "⑤ 전문가에게 가져갈 리포트",
];
export const TOUR_DURATION = TOUR_SCENE * TOUR_CAPTIONS.length;

export function ServiceTourScreen() {
  const scenes = [
    HomeFeedScreen,
    AlbumScreen,
    CarebotScreen,
    SceneCheck,
    SceneReport,
  ];
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {scenes.map((TourScene, i) => (
        <Sequence key={i} from={i * TOUR_SCENE} durationInFrames={TOUR_SCENE}>
          <SceneFade duration={TOUR_SCENE}>
            <TourScene />
          </SceneFade>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/** 커뮤니티 — 동기방 꿀팁 피드 (MVP 밖, 랜딩 소개용) */
export function CommunityScreen() {
  const { frame, fps } = useAnim();
  const posts = [
    {
      title: "이유식 거부기, 이렇게 넘겼어요",
      by: "선배맘 · 18개월",
      likes: frame >= 90 ? 25 : 24,
      popIt: true,
      thumb: babyBlock,
    },
    {
      title: "밤잠 통잠 후기 (드디어) 💤",
      by: "12개월 동기맘",
      likes: 18,
      thumb: babySleep,
    },
    {
      title: "여름 물놀이 준비물 총정리",
      by: "6개월차 대디",
      likes: 11,
      thumb: babyTube,
    },
  ];
  return (
    <AbsoluteFill>
      <Shell>
        <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 3 }}>
          커뮤니티
        </div>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 13 }}>
          2025년 8월생 · 동기방 👶
        </div>

        {posts.map((post, i) => (
          <div
            key={post.title}
            style={{
              ...cardStyle,
              display: "flex",
              gap: 11,
              padding: 11,
              marginBottom: 10,
              alignItems: "center",
              ...appear(frame, fps, 10 + i * 14),
            }}
          >
            <Photo src={post.thumb} height={58} radius={12} style={{ width: 58, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 5,
                  lineHeight: 1.35,
                }}
              >
                {post.title}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  color: C.sub,
                }}
              >
                <span>{post.by}</span>
                <span
                  style={
                    post.popIt
                      ? { color: C.coral, fontWeight: 800, ...pop(frame, fps, 90) }
                      : undefined
                  }
                >
                  ♥ {post.likes}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            background: C.coralSoft,
            color: C.coral,
            borderRadius: 16,
            padding: "11px 15px",
            fontSize: 13.5,
            fontWeight: 700,
            textAlign: "center",
            ...appear(frame, fps, 60),
          }}
        >
          ✏️ 우리끼리 꿀팁 나누기 — 곧 열려요
        </div>
      </Shell>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- */
/** D1 · 선물숍 — "내 기록에서 출발"하는 커머스 */
export function StoreScreen() {
  const { frame, fps } = useAnim();
  const items = [
    { icon: "📖", title: "성장 앨범·포토북", sub: "회고에서 바로 제작", bg: C.coralSoft },
    { icon: "🖼️", title: "액자·달력", sub: "이달의 한 장", bg: C.tealSoft },
    { icon: "🧸", title: "선물하기", sub: "돌·생일 — 가족 누구나", bg: C.tealSoft },
    { icon: "🎓", title: "교육·클래스", sub: "외부 연계", bg: C.coralSoft },
  ];
  return (
    <AbsoluteFill>
      <Shell nav={<BottomNav active="" />}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 13,
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 800 }}>🛍️ 선물숍</div>
          <div style={{ display: "flex", gap: 6 }}>
            <ChildChip name="서준" />
            <ChildChip name="서아" active={false} />
          </div>
        </div>

        {/* 내 기록에서 출발하는 배너 */}
        <div style={{ marginBottom: 13, ...appear(frame, fps, 8) }}>
          <Photo src={babySleep} height={130} radius={18}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(40,25,15,0.72), rgba(40,25,15,0.15))",
                padding: 14,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.45, marginBottom: 4 }}>
                서준이의 7월 회고,
                <br />
                책으로 남길까요?
              </div>
              <div style={{ fontSize: 11.5, opacity: 0.85, marginBottom: 8 }}>
                사진 42장이 이미 골라져 있어요
              </div>
              <span
                style={{
                  background: C.coral,
                  borderRadius: 999,
                  padding: "5px 13px",
                  fontSize: 12.5,
                  fontWeight: 800,
                  width: "fit-content",
                }}
              >
                미리 보기 →
              </span>
            </div>
          </Photo>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 13,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              style={{
                ...cardStyle,
                padding: "13px 12px",
                ...appear(frame, fps, 24 + i * 8),
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 19,
                  marginBottom: 8,
                }}
              >
                {item.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 11.5, color: C.sub, lineHeight: 1.4 }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 12.5,
            color: C.sub,
            textAlign: "center",
            ...appear(frame, fps, 64),
          }}
        >
          💡 할머니·할아버지도 각자 결제로 바로 선물할 수 있어요
        </div>
      </Shell>
    </AbsoluteFill>
  );
}
