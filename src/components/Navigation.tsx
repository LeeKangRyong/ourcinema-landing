import { useEffect, useRef, useState } from "react";
import logo from "../assets/mascot.png";

/** 스크롤 방향/위치에 따라 내비 상태를 계산하는 훅 (Headroom 패턴)
 *  - 최상단(24px 미만): 배경 투명, 히어로 위에 얹힘
 *  - 300px 이상에서 아래로 10px 누적 시 숨김 / 위로 5px 시 등장
 *  - iOS 러버밴딩(y<0)·페이지 최하단 오버스크롤은 무시
 *  - nav 안에 키보드 포커스가 있으면 숨기지 않는다 */
const NAV_OFFSET = 300;
const TOLERANCE_DOWN = 10;
const TOLERANCE_UP = 5;

function useSmartNav() {
  const [hidden, setHidden] = useState(false);
  const focused = useRef(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      if (y < 0) return; // iOS 러버밴딩
      const delta = y - lastY.current;
      const atBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (delta > TOLERANCE_DOWN) {
        if (y > NAV_OFFSET && !focused.current && !atBottom) setHidden(true);
        lastY.current = y;
      } else if (delta < -TOLERANCE_UP) {
        setHidden(false);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    hidden,
    onFocus: () => {
      focused.current = true;
      setHidden(false);
    },
    onBlur: () => {
      focused.current = false;
    },
  };
}

export function Navigation() {
  const { hidden, onFocus, onBlur } = useSmartNav();

  return (
    <header
      className={`nav ${hidden ? "nav--hidden" : ""}`}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
    >
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <img src={logo} alt="" />
          아워시네마
        </a>
        <nav className="nav__links">
          <a href="#growth">성장 일기</a>
          <a href="#care">걱정 살펴보기</a>
          <a href="#community">커뮤니티</a>
          <a href="#store">선물숍</a>
        </nav>
        <a
          className="nav__cta"
          href="https://ourcinema-mockup.netlify.app"
          target="_blank"
          rel="noreferrer"
        >
          미리 체험하기
        </a>
      </div>
    </header>
  );
}
