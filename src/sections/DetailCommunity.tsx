import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import { CommunityScreen } from "../remotion/screens";
import iconCommunity from "../assets/icon-community.svg";
import illustCommunity from "../assets/illust/community.png";

export function DetailCommunity() {
  return (
    <section className="section band band--sand" id="community">
      <div className="detail__panel band__inner">
        <FadeIn className="detail__content">
          <span className="badge badge--white">
            <img src={iconCommunity} alt="" />
            커뮤니티
          </span>
          <h2>
            혼자가 아니에요,
            <br />
            함께 키워요
          </h2>
          <p>
            대한민국 부모라면 누구나 함께 모여 서로의 꿀팁을 공유. 선배들의
            꿀팁을 전수받고 동기들과 소통해요.
          </p>
          <button className="pill-button">커뮤니티 구경하기</button>
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
