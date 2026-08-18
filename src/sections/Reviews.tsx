import { FadeIn } from "../components/FadeIn";
import illustMascot from "../assets/illust/mascot.png";

const MOMENTS = [
  {
    quote: "“새벽에 ‘말 늦는 아기’ 검색만 한참 했어요. 정작 병원에선 말문이 막히고요.”",
    avatar: "맘",
    role: "16개월 아이 엄마",
  },
  {
    quote: "“진료 3분 안에 두 달치 걱정을 설명할 자신이 없어요.”",
    avatar: "대디",
    role: "14개월 아이 아빠",
  },
  {
    quote: "“아이 사진 보내달라는 부모님 성화에, 고르다 지쳐서 결국 못 보내요.”",
    avatar: "맘",
    role: "9개월 아이 엄마",
  },
  {
    quote: "“걱정을 꺼내면 유난이라 할까 봐, 혼자만 끙끙 앓게 돼요.”",
    avatar: "대디",
    role: "20개월 아이 아빠",
  },
];

function MomentCards() {
  return (
    <div className="reviews__group">
      {MOMENTS.map((moment) => (
        <div className="review-card" key={moment.quote}>
          <p className="review-card__quote">{moment.quote}</p>
          <div className="review-card__author">
            <div className="review-card__avatar">{moment.avatar}</div>
            <div>
              <div className="review-card__name">{moment.role}</div>
              <div className="review-card__role">아워시네마가 풀려는 순간</div>
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
          <h2>아워시네마는 이런 순간들에서 출발했어요</h2>
        </FadeIn>
        <FadeIn className="reviews__viewport">
          {/* 같은 카드 묶음을 두 번 이어붙여 -50% 이동으로 무한 루프 */}
          <div className="reviews__track">
            <MomentCards />
            <MomentCards />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
