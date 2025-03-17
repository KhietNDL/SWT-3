import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import "./index.scss";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { RootState } from "../../redux/Store";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { setOrder } from "../../redux/features/orderSlice";
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    dispatch(setOrder(null));
    navigate("/");
  };

  

  return (
    <header className={`header ${isScrolled ? "fixed" : ""}`}>
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
          <li>
            <Link to="/dich-vu">Dịch vụ</Link>
          </li>

          <li className="dropdown">
            <Link to="/survey">Quiz</Link>
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

      {user ? (
        <div className="user-menu dropdown">
          <div className="user-avatar">
            <img src={`http://localhost:5199${user.imgUrl}`}/>
            <span className="user-name">{user.userName}</span>
          </div>
          <ul className="dropdown-content">
            <li>
              <Link to="/info-user">
                <UserOutlined/> Thông tin 
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>
              <LogoutOutlined /> Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/login">
          <Button type="primary" className="login-button">
            Đăng nhập
          </Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
