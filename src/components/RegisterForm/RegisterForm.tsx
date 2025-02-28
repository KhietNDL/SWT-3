import { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./RegisterForm.scss";
import { FormData, FormErrors } from "../../types/RegisterForm";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const navigate = useNavigate();

  const validatePassword = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(formData.fullName)) {
      newErrors.fullName = "Tên chỉ được chứa chữ cái và ít nhất 2 ký tự";
    }
    if (!/^[a-zA-Z0-9_]{4,}$/.test(formData.username)) {
      newErrors.username = "Tên người dùng phải có ít nhất 4 ký tự (không dấu, không khoảng trắng)";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Mật khẩu xác nhận không khớp";
    }
    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    if (formData.address.length < 5) {
      newErrors.address = "Địa chỉ phải có ít nhất 5 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //này tạo thử coi chuyển trang đc ko khi nào có API tính tiếp
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // https://f113a0ea-c6c6-48f4-b55b-e526c80aefaa.mock.pstmn.io/api/registerfail
        const apiUrl = formData.username.includes("test")
          ? "https://f113a0ea-c6c6-48f4-b55b-e526c80aefaa.mock.pstmn.io/api/registerfail"
          : "https://f113a0ea-c6c6-48f4-b55b-e526c80aefaa.mock.pstmn.io/api/register";

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            role: formData.role,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success(`${result.message}`, {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
          });
          setFormData({
            fullName: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            role: "",
            phone: "",
            address: "",
          });
          setTimeout(() => {
            navigate("/login")
          }
            , 3000);
        } else {
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

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
        </div>
        <div className="registration-form-container">
          <div className="registration-form-wrapper">
            <div className="registration-form-content">
              <h2 className="registration-title">Đăng Ký Tài Khoản</h2>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label className="form-label">Họ và Tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="vd: Nguyễn Văn A"
                    className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  />
                  {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Tên người dùng</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="vd: nguyenvana"
                    className={`form-input ${errors.username ? 'input-error' : ''}`} />
                  {errors.username && <p className="error-message">{errors.username}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mật khẩu</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Mật khẩu từ 8 ký tự"
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
                  <label className="form-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange} className={`form-input ${errors.passwordConfirmation ? 'input-error' : ''}`} />
                  {errors.passwordConfirmation && <p className="error-message">{errors.passwordConfirmation}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vd: a@a.com"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
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

                <div className="form-group">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="vd: 123 Đường ABC, Quận XYZ, TP HCM"
                    className={`form-input ${errors.address ? 'input-error' : ''}`} />
                  {errors.address && <p className="error-message">{errors.address}</p>}
                </div>

                <button type="submit" disabled={isLoading} className="submit-button">
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;