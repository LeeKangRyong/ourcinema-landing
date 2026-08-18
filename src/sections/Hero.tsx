import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { PhoneFrame } from "../components/PhoneFrame";
import {
  MockupTourScreen,
  MOCKUP_TOUR_CAPTIONS,
  MOCKUP_TOUR_DURATION,
  tourSceneAt,
} from "../remotion/mockup";
import illustMascot from "../assets/illust/mascot.png";
import filmSleep from "../assets/photos/film-sleep.png";
import filmFamily from "../assets/photos/film-family.png";
import filmCrawl from "../assets/photos/film-crawl.png";

const MOCKUP_URL = "https://ourcinema-mockup.netlify.app";

/* 히어로 배경 필름 — 자막 없는 앰비언트 컷, 사진 3장만 순환 */
const FILM_SLIDES = [filmSleep, filmFamily, filmCrawl];

/* 시각적 줄 단위로 분해 — 큰 줄은 마스크 리빌, 라벨은 가벼운 페이드 라이즈 */
const HEADLINE_LINES: Array<{
  kind: "label" | "big";
  className?: string;
  node: React.ReactNode;
}> = [
  { kind: "label", node: <>평소엔</> },
  {
    kind: "big",
    node: (
      <>
        가족이 쓰는 <mark className="hero__mark">성장 일기</mark>,
      </>
    ),
  },
  {
    kind: "label",
    className: "hero__row--gap",
    node: <span className="hero__label--accent">아이가 걱정되는 순간엔</span>,
  },
  { kind: "big", node: <>전문가에게 가져갈 수 있는</> },
  {
    kind: "big",
    node: (
      <mark className="hero__mark hero__mark--late">가장 정확한 기록</mark>
    ),
  },
];

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [scene, setScene] = useState(0);
  const handleFrame = useCallback((frame: number) => {
    setScene(tourSceneAt(frame));
  }, []);

  return (
    <section className="hero">
      <div className="hero__film" aria-hidden>
        {FILM_SLIDES.map((image, i) => (
          <span
            key={i}
            className="hero__film-slide"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="hero__scrim" aria-hidden />
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            {HEADLINE_LINES.map((line, i) => {
              const delay = 0.15 + i * 0.1;
              return line.kind === "big" ? (
                <span
                  key={i}
                  className={`hero__line-mask ${line.className ?? ""}`}
                >
                  <motion.span
                    className="hero__big"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay, ease: REVEAL_EASE }}
                  >
                    {line.node}
                  </motion.span>
                </span>
              ) : (
                <motion.span
                  key={i}
                  className={`hero__label ${line.className ?? ""}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay, ease: "easeOut" }}
                >
                  {line.node}
                </motion.span>
              );
            })}
          </h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.0, ease: "easeOut" }}
          >
            걱정이 생기면 쌓인 기록을 기반으로 분석과 추천을 정리해, 진료 전에
            전문가에게 전달해요.
          </motion.p>
          <motion.div
            className="hero__buttons"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.15, ease: "easeOut" }}
          >
            <a
              className="store-button"
              href={MOCKUP_URL}
              target="_blank"
              rel="noreferrer"
            >
              🎬 체험해보기
            </a>
            <a className="store-button store-button--light" href="#care">
              아이가 걱정될 때는?
            </a>
          </motion.div>
        </div>
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <div className="hero__tour">
            <span className="hero__tour-cap" key={scene}>
              {MOCKUP_TOUR_CAPTIONS[scene]}
            </span>
            <PhoneFrame
              screen={MockupTourScreen}
              durationInFrames={MOCKUP_TOUR_DURATION}
              width={340}
              height={700}
              onFrame={handleFrame}
            />
            <span className="hero__tour-dots">
              {MOCKUP_TOUR_CAPTIONS.map((caption, i) => (
                <i key={caption} className={i === scene ? "on" : ""} />
              ))}
            </span>
          </div>
          <img
            src={illustMascot}
            alt=""
            className="sticker sticker--md float-slow hero__mascot"
          />
        </motion.div>
      </div>
    </section>
  );
}
