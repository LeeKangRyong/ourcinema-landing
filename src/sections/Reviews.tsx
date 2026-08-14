import { FadeIn } from "../components/FadeIn";
import iconStar from "../assets/icon-star.svg";
import illustMascot from "../assets/illust/mascot.png";

const REVIEWS = [
  {
    quote: "“육아 기록이 너무 편해졌어요!”",
    avatar: "맘",
    name: "김지영",
    role: "12개월차 맘",
  },
  {
    quote: "“병원 갈 때 리포트 보여주니 선생님이 좋아하시네요”",
    avatar: "대디",
    name: "박민수",
    role: "6개월차 대디",
  },
  {
    quote: "“조부모님이 아이 사진 보며 너무 즐거워하세요”",
    avatar: "맘",
    name: "이현주",
    role: "18개월차 맘",
  },
  {
    quote: "“매일매일 기록하는 재미가 쏠쏠해요. 추천합니다!”",
    avatar: "대디",
    name: "정태웅",
    role: "3개월차 대디",
  },
];

function ReviewCards() {
  return (
    <div className="reviews__group">
      {REVIEWS.map((review) => (
        <div className="review-card" key={review.name}>
          <div className="review-card__stars">
            {Array.from({ length: 5 }, (_, s) => (
              <img key={s} src={iconStar} alt="" />
            ))}
          </div>
          <p className="review-card__quote">{review.quote}</p>
          <div className="review-card__author">
            <div className="review-card__avatar">{review.avatar}</div>
            <div>
              <div className="review-card__name">{review.name}</div>
              <div className="review-card__role">{review.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="section" style={{ padding: "96px 0" }}>
      <div className="reviews">
        <FadeIn className="reviews__intro">
          <img
            src={illustMascot}
            alt=""
            className="sticker sticker--md float-slow"
          />
          <h2>이미 많은 부모님들이 아워시네마와 함께하고 있어요</h2>
        </FadeIn>
        <FadeIn className="reviews__viewport">
          {/* 같은 카드 묶음을 두 번 이어붙여 -50% 이동으로 무한 루프 */}
          <div className="reviews__track">
            <ReviewCards />
            <ReviewCards />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
