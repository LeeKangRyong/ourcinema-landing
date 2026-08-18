import logo from "../assets/logo.svg";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={logo} alt="" />
            아워시네마
          </div>
          <p className="footer__info">
            심심네트워크 (주) | 대표이사 : 심재혁
            <br />
            사업자등록번호 : 123-45-01234
            <br />
            부산광역시 부산진구 서전로 8 (부전동)
          </p>
        </div>
        <div className="footer__col">
          <h4>고객 지원</h4>
          <ul>
            <li>일반 문의: help@ourcinema.kr</li>
            <li>
              <a
                href="https://ourcinema-mockup.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                아워시네마 미리 체험하기
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>관련 사이트</h4>
          <ul>
            <li>
              <a href="#">SimsimNet</a>
            </li>
            <li>
              <a href="#">연혁</a>
            </li>
            <li>
              <a href="#">인재영입</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© LifeX, Inc. All Rights Reserved.</span>
        <div className="footer__bottom-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  );
}
