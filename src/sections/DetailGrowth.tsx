import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import { HomeFeedScreen, AlbumScreen } from "../remotion/screens";
import iconSns from "../assets/icon-sns.svg";
import illustAlbum from "../assets/illust/album.png";

export function DetailGrowth() {
  return (
    <section className="section band band--peach" id="features">
      <div className="detail__panel band__inner">
        <FadeIn className="detail__content">
          <span className="badge badge--white">
            <img src={iconSns} alt="" />
            성장 앨범
          </span>
          <h2>
            가장 소중한 순간을
            <br />
            영화처럼 기록하세요
          </h2>
          <p>
            아이의 첫 걸음, 처음 뱉은 말, 소중한 모든 순간을 날짜별로 자동
            정리합니다. 온 가족이 함께 실시간으로 반응을 남기고 추억을
            공유하세요.
          </p>
          <button className="pill-button">기록 시작하기</button>
        </FadeIn>
        <FadeIn className="detail__visual" delay={0.1}>
          <div className="detail__stage">
            <PhoneFrame
              screen={AlbumScreen}
              width={228}
              height={494}
              style={{
                position: "absolute",
                right: 0,
                top: 96,
                opacity: 0.9,
              }}
            />
            <PhoneFrame
              screen={HomeFeedScreen}
              width={240}
              height={520}
              style={{ position: "absolute", left: 0, top: 32 }}
            />
            <img
              src={illustAlbum}
              alt="아이 사진을 찍는 부모 일러스트"
              className="sticker sticker--lg float-slow"
              style={{ position: "absolute", left: -12, bottom: 0, zIndex: 2 }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
