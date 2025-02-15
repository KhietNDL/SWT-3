import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import "./index.scss";
import { Button } from "antd";
function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} width={80} alt="Logo" />
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="dropdown">
            <Link to="/dich-vu">Dịch vụ</Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dich-vu/1">Dịch vụ 1</Link>
              </li>
              <li>
                <Link to="/dich-vu/2">Dịch vụ 2</Link>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/test">Test</Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/test/1">Test 1</Link>
              </li>
              <li>
                <Link to="/test/2">Test 2</Link>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/dat-lich">Đặt lịch</Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dat-lich/1">Đặt lịch 1</Link>
              </li>
              <li>
                <Link to="/dat-lich/2">Đặt lịch 2</Link>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/blog">Blog và tài liệu</Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/tai-lieu">Tài liệu</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/lien-he">Liên hệ</Link>
          </li>
        </ul>
      </nav>
      <Link to="/info-user">
      <Button type="primary" className="header__login-button">
        Đăng nhập
      </Button>
      </Link>
    </div>
  );
}

export default Header;
