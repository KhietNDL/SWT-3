import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import "./index.scss";
import { Button } from "antd";
import { useEffect, useState } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'fixed' : ''}`}>
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
            <Link to="/test">Quiz</Link>
          </li>
          <li className="dropdown">
            <Link to="/booking">Đặt lịch</Link>
            
          </li>
          <li className="dropdown">
            <span>Blog và tài liệu</span>
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

      <Link to="/login">
        <Button type="primary" className="login-button">
          Đăng nhập
        </Button>
      </Link>
    </header>
  );
}

export default Header;
