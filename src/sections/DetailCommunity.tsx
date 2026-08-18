import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import { CommunityScreen } from "../remotion/mockup";
import iconCommunity from "../assets/icon-community.svg";
import illustCommunity from "../assets/illust/community.png";

export function DetailCommunity() {
  return (
    <section className="section band band--sand" id="community">
      <div className="detail__panel band__inner">
        <FadeIn className="detail__content">
          <span className="badge badge--white">
            <img src={iconCommunity} alt="" />
            커뮤니티 · 준비 중
          </span>
          <h2>
            혼자가 아니에요,
            <br />
            함께 키워요
          </h2>
          <p>
            월령이 비슷한 동기 부모들과 서로의 꿀팁을 나누는 공간을 준비하고
            있어요. 선배들의 경험을 전수받고 동기들과 소통해요.
          </p>
          <span className="soon-note">✏️ 정식 오픈과 함께 열려요</span>
        </FadeIn>
        <FadeIn className="detail__visual" delay={0.1}>
          <div className="detail__stage detail__stage--single">
            <PhoneFrame
              screen={CommunityScreen}
              width={300}
              height={600}
              style={{ position: "absolute", right: 0, top: 16 }}
            />
            <img
              src={illustCommunity}
              alt="둘러앉아 이야기 나누는 부모들 일러스트"
              className="sticker sticker--lg float-slow"
              style={{ position: "absolute", left: 0, bottom: 48, zIndex: 2 }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
