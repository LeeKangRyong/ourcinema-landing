import { FadeIn } from "../components/FadeIn";
import { PhoneFrame } from "../components/PhoneFrame";
import { HomeFeedScreen, AlbumScreen } from "../remotion/screens";
import iconSns from "../assets/icon-sns.svg";
import illustAlbum from "../assets/illust/album.png";

export function DetailGrowth() {
  return (
    <section className="section band band--peach" id="growth">
      <div className="detail__panel band__inner">
        <FadeIn className="detail__content">
          <span className="badge badge--white">
            <img src={iconSns} alt="" />
            성장 일기
          </span>
          <h2>
            평소엔, 가족이 함께 쓰는
            <br />
            성장 일기
          </h2>
          <p>
            아이의 첫 걸음, 처음 뱉은 말, 소중한 모든 순간을 날짜별로 자동
            정리합니다. 온 가족이 함께 실시간으로 반응을 남기고 추억을
            공유하세요. 이렇게 쌓인 일상의 기록이, 걱정되는 순간의 가장 정확한
            근거가 돼요.
          </p>
          {/* 버튼 제거 자리 — 레이아웃 유지를 위한 투명 플레이스홀더 */}
          <span
            className="pill-button"
            style={{ visibility: "hidden" }}
            aria-hidden="true"
          >
            일기 화면 미리 보기
          </span>
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
