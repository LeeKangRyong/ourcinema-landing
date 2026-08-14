import { FadeIn } from "../components/FadeIn";
import illustMascot from "../assets/illust/mascot.png";
import illustFamily from "../assets/illust/family.png";
import illustGift from "../assets/illust/gift.png";

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
          새로운 행복을 위한 설렘,
          <br />
          아워시네마
        </h2>
        <p>대한민국 부모라면 누구나 사용하는 앱. 지금 바로 시작해보세요.</p>
        <button className="cta__button">아워시네마 다운로드</button>
        <div className="cta-band__gift">
          <img src={illustGift} alt="" />
          <span>지금 시작하면 웰컴 기프트 박스를 드려요</span>
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
