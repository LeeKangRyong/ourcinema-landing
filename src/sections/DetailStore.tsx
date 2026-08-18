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
            선물숍 · 준비 중
          </span>
          <h2>
            내 기록에서 출발하는
            <br />
            선물숍
          </h2>
          <p>
            매달 쌓인 회고를 실물 앨범·포토북으로, 소중한 순간을 액자와
            달력으로. 조부모님도 각자 결제로 바로 선물할 수 있게 준비하고
            있어요.
          </p>
          <span className="soon-note">🎁 확장 기능으로 준비 중이에요</span>
        </FadeIn>
      </div>
    </section>
  );
}
