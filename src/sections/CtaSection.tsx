import { FadeIn } from "../components/FadeIn";

export function CtaSection() {
  return (
    <section className="section" style={{ minHeight: "auto" }}>
      <FadeIn className="panel" style={{ width: "100%" }}>
        <div className="cta__panel">
          <h2>
            새로운 행복을 위한 설렘,
            <br />
            아워시네마
          </h2>
          <p>대한민국 부모라면 누구나 사용하는 앱. 지금 바로 시작해보세요.</p>
          <button className="cta__button">아워시네마 다운로드</button>
        </div>
      </FadeIn>
    </section>
  );
}