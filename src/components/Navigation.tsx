import logo from "../assets/logo.svg";

export function Navigation() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <img src={logo} alt="" />
          아워시네마
        </a>
        <nav className="nav__links">
          <a href="#features">기능 소개</a>
          <a href="#community">커뮤니티</a>
          <a href="#store">쇼핑몰</a>
        </nav>
        <button className="nav__cta">앱 다운로드</button>
      </div>
    </header>
  );
}
