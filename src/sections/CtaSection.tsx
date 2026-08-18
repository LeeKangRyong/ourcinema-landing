import { FadeIn } from "../components/FadeIn";
import illustMascot from "../assets/illust/mascot.png";
import illustFamily from "../assets/illust/family.png";

const MOCKUP_URL = "https://ourcinema-mockup.netlify.app";

export function CtaSection() {
  return (
    <section className="section cta-band">
      <div className="cta-band__pattern" />
      <FadeIn className="cta-band__inner">
        <img
          src={illustMascot}
          alt=""
          className="sticker sticker--md float-slow cta-band__mascot"
        />
        <h2>
          걱정되는 순간의 아워시네마,
          <br />
          지금 바로 만나보세요
        </h2>
        <p>
          가입 없이 브라우저에서 걱정 살펴보기를 처음부터 끝까지 체험할 수
          있어요.
        </p>
        <a
          className="cta__button"
          href={MOCKUP_URL}
          target="_blank"
          rel="noreferrer"
        >
          🎬 지금 체험해보기
        </a>
        <div className="cta-band__gift">
          <span className="cta-band__gift-icon">🔒</span>
          <span>체험용 데모예요 — 실제 가입·결제는 없어요</span>
        </div>
        <img
          src={illustFamily}
          alt="아기를 안고 있는 엄마 아빠 일러스트"
          className="cta-band__family"
        />
      </FadeIn>
    </section>
  );
}
