import { useState, ChangeEvent, FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import loginBg from "../../images/login.jpg";
import "./LoginForm.scss";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface Errors {
  username?: string;
  password?: string;
  auth?: string;
}

interface LoginValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const userData = await handleLogin({
          email: formData.username,
          password: formData.password,
        });
        // Lưu token vào localStorage
        localStorage.setItem("token", userData.token);
        navigate("/");
      } catch (error) {
        setErrors({ auth: "Đăng nhập thất bại. Vui lòng thử lại." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const navigate = useNavigate();
  const handleLogin = async (values: LoginValues) => {
    try {
      // 1. Login để lấy token
      const loginResponse = await api.post("login", values);
      const token = loginResponse.data.token;

      // 2. Lấy thông tin user bằng token
      const userResponse = await api.get("users/2", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 3. Combine token và user info
      const userData = {
        ...userResponse.data.data,
        token: token,
      };

      // 4. Dispatch user data vào Redux store
      dispatch(login(userData));
      return userData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-side">
        <img src={loginBg} alt="Supportive Psychology" />
        <div className="overlay"></div>
        <div className="content">
          <h1>School Psychology</h1>
          <p>
            Supporting mental health and well-being in educational environments
          </p>
        </div>
      </div>

      <div className="login-form-side">
        <div className="form-wrapper">
          <div className="header">
            <h2>Welcome Back</h2>
            <p>Đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <div className="input-container">
                <span className="icon">👤</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "error" : ""}
                  placeholder="Nhập tên đăng nhập/SĐT"
                />
              </div>
              {errors.username && (
                <div className="error-message">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-container">
                <span className="icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <div className="form-footer">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Ghi nhớ đăng nhập </label>
              </div>
              <a href="#" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="register-section">
              <p>
                Chưa có tài khoản?
                <a href="/register">Đăng ký ngay</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
