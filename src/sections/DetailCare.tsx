import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import {
  ReportFlowScreen,
  REPORT_FLOW_DURATION,
} from "../remotion/screens";
import iconCare from "../assets/icon-care.svg";
import illustDoctor from "../assets/illust/doctor.png";

export function DetailCare() {
  return (
    <section className="section band band--mint">
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
            전문가 케어
          </span>
          <h2>
            걱정되는 순간,
            <br />
            전문가의 지혜를 더합니다
          </h2>
          <p>
            아이가 아프거나 발달이 걱정될 때, 챗봇과의 상담으로 증상을
            기록하고 즉시 전문가 리포트를 생성하세요. 병원 방문 시 가장
            정확한 근거 자료가 됩니다.
          </p>
          <button className="pill-button">리포트 샘플 보기</button>
        </FadeIn>
      </div>
    </section>
  );
}
