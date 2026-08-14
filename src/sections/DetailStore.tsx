import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import { StoreScreen } from "../remotion/screens";
import iconStore from "../assets/icon-store.svg";
import illustGift from "../assets/illust/gift.png";

export function DetailStore() {
  return (
    <section className="section band band--blush" id="store">
      <div className="detail__panel band__inner">
        <FadeIn className="detail__visual">
          <div className="detail__stage detail__stage--single">
            <PhoneFrame
              screen={StoreScreen}
              width={300}
              height={600}
              style={{ position: "absolute", left: 0, top: 16 }}
            />
            <img
              src={illustGift}
              alt="선물 상자에서 나온 아기 일러스트"
              className="sticker sticker--lg float-slower"
              style={{ position: "absolute", right: 0, bottom: 48, zIndex: 2 }}
            />
          </div>
        </FadeIn>
        <FadeIn className="detail__content" delay={0.1}>
          <span className="badge badge--white">
            <img src={iconStore} alt="" />
            스토어
          </span>
          <h2>
            검증된 육아템만
            <br />
            골라 담았어요
          </h2>
          <p>
            선배 부모들이 직접 써보고 추천한 아이템을 한곳에. 아이 월령에 딱
            맞는 상품을 매주 새롭게 만나보세요.
          </p>
          <button className="pill-button">스토어 구경하기</button>
        </FadeIn>
      </div>
    </section>
  );
}
