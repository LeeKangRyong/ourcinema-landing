import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import {
  ReportFlowScreen,
  REPORT_FLOW_DURATION,
} from "../remotion/screens";
import iconCare from "../assets/icon-care.svg";
import illustDoctor from "../assets/illust/doctor.png";

const MOCKUP_URL = "https://ourcinema-mockup.netlify.app";

const FLOW_STEPS = [
  {
    num: "1",
    title: "물어보기",
    desc: "챗봇 주부리에게 “아이가 걱정돼요” 한마디면 시작돼요. 이 대화는 가족에게 보이지 않아요.",
  },
  {
    num: "2",
    title: "살펴보기",
    desc: "아이의 실제 행동을 하나씩 짚는 질문으로 걱정을 구체화해요. 판단이 아니라 기록을 위한 질문이에요.",
  },
  {
    num: "3",
    title: "기록 고르기",
    desc: "그 무렵의 사진·영상 중 함께 담을 장면을 부모가 직접 골라요.",
  },
  {
    num: "4",
    title: "리포트",
    desc: "병원 가기 전 선생님이 먼저 읽는 정리본이 완성돼요. 진료·상담 전에 미리 전달할 수 있어요.",
  },
];

export function DetailCare() {
  return (
    <section className="section band band--mint" id="care">
      <div className="detail__panel band__inner">
        <FadeIn className="detail__visual">
          <div className="detail__stage detail__stage--single">
            <PhoneFrame
              screen={ReportFlowScreen}
              durationInFrames={REPORT_FLOW_DURATION}
              width={300}
              height={600}
              style={{ position: "absolute", left: 0, top: 16 }}
            />
            <img
              src={illustDoctor}
              alt="아기를 진료하는 의사 선생님 일러스트"
              className="sticker sticker--lg float-slower"
              style={{ position: "absolute", right: 0, bottom: 48, zIndex: 2 }}
            />
          </div>
        </FadeIn>
        <FadeIn className="detail__content" delay={0.1}>
          <span className="badge badge--white">
            <img src={iconCare} alt="" />
            걱정 살펴보기
          </span>
          <h2>
            아이가 걱정되는 순간,
            <br />
            기록이 가장 정확한 답이 돼요
          </h2>
          <p>
            검색만 하다 끝나던 막연한 걱정을, 쌓인 기록 기반의 분석과 추천으로
            정리해요. 병명을 판정하지 않아요. 결론은 전문가의 영역이에요.
          </p>
          <ol className="flow-steps">
            {FLOW_STEPS.map((step) => (
              <li className="flow-step" key={step.num}>
                <span className="flow-step__num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            className="pill-button"
            href={MOCKUP_URL}
            target="_blank"
            rel="noreferrer"
          >
            🎬 직접 체험하기
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
