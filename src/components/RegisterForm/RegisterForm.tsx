import { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./RegisterForm.scss";
import loginBg from "../../images/login.jpg";

// Định nghĩa kiểu dữ liệu cho form
interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  // Hàm kiểm tra độ mạnh của mật khẩu
  const validatePassword = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Kiểm tra dữ liệu nhập vào form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(formData.fullName)) {
      newErrors.fullName = "Tên chỉ được chứa chữ cái và ít nhất 2 ký tự";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Giả lập gọi API
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Registration successful!");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "",
          phone: "",
        });
      } catch (error) {
        alert("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Xử lý khi thay đổi input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <div className="registration-background">
        <img
          src={loginBg}
          alt="Supportive Psychology"
        />
        </div>
        <div className="registration-form-container">
          <div className="registration-form-wrapper">
            <div className="registration-form-content">
              <h2 className="registration-title">Tạo Tài Khoản</h2>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label className="form-label">Họ và Tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  />
                  {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mật khẩu</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-input ${errors.password ? 'input-error' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle-button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                  <div className="password-strength">
                    <div className={`strength-meter strength-${passwordStrength}`}></div>
                    <span>{['Yếu', 'Trung bình', 'Khá', 'Mạnh'][passwordStrength - 1]}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Vai trò</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`form-input ${errors.role ? 'input-error' : ''}`}
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="student">Học sinh</option>
                    <option value="parent">Phụ huynh</option>
                  </select>
                  {errors.role && <p className="error-message">{errors.role}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <PhoneInput
                    country="vn"
                    value={formData.phone}
                    onChange={(phone: string) => setFormData(prev => ({ ...prev, phone }))}
                    containerClass="phone-input-container"
                    inputClass={`phone-input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>

                <button type="submit" disabled={isLoading} className="submit-button">
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

      export default RegistrationForm;
