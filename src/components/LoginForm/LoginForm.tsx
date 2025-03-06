import { useState, ChangeEvent, FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import loginBg from "../../images/login.jpg";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Errors {
  email?: string;
  password?: string;
  auth?: string;
}

interface LoginResponse {
  token: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userData = await handleLogin(formData.email, formData.password);
      localStorage.setItem("token", userData.token);
      navigate("/");
    } catch (error) {
      setErrors({ auth: "Đăng nhập thất bại. Vui lòng thử lại." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch("http://localhost:5199/Account/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("📡 Response Status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Lỗi từ server:", errorText);
        throw new Error(`Lỗi HTTP ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("✅ Data nhận được:", data);
  
      const token = data.accessToken;
      if (!token) {
        console.error("⚠️ API không trả về token:", data);
        throw new Error("Không nhận được token từ server");
      }
  
      const decodedToken: any = jwtDecode(token);
      console.log("🔑 Token decode:", decodedToken);
  
      const userData = {
        id: decodedToken.sub || "unknown",
        username: decodedToken.unique_name || "guest",
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "user",
        token,
      };
  
      localStorage.setItem("token", token);
      console.log("💾 Token đã lưu:", localStorage.getItem("token"));
  
      dispatch(login(userData));
      navigate("/");
  
      return userData;
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      setErrors({ auth: "Đăng nhập thất bại. Vui lòng thử lại." });
      throw err;
    }
  };
  

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <div className="header-left">
            <h2>Welcome Back</h2>
          </div>
          <div className="header-right">
            <p>Đăng nhập để tiếp tục</p>
          </div>
        </div>
      </div>

      <div className="login-container">
        <div className="login-image-side">
          <img src={loginBg} alt="Supportive Psychology" />
          <div className="overlay"></div>
          <div className="content">
            <h1>School Psychology</h1>
            <p>Supporting mental health and well-being in educational environments</p>
          </div>
        </div>

        <div className="login-form-side">
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <span className="icon">📧</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Nhập email"
                  />
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
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
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
