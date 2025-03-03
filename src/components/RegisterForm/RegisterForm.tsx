import { useState, ChangeEvent, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterForm.scss";
import { FormData, FormErrors } from "../../types/RegisterForm";

const vietnamPhoneRegex = /^0[35789][0-9]{8,9}$/;

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    DoB: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

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

    const {
      fullName,
      username,
      DoB,
      email,
      password,
      passwordConfirmation,
      role,
      phone,
      address,
    } = formData;

    if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(fullName)) {
      newErrors.fullName = "Tên chỉ được chứa chữ cái và ít nhất 2 ký tự";
    }
    if (!/^[a-zA-Z0-9_]{4,}$/.test(username)) {
      newErrors.username =
        "Tên người dùng phải có ít nhất 4 ký tự (không dấu, không khoảng trắng)";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ";
    }
    if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation = "Mật khẩu xác nhận không khớp";
    }
    if (!role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }
    if (!phone || !vietnamPhoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (phải có 10 hoặc 11 chữ số)";
    }
    if (address.length < 5) {
      newErrors.address = "Địa chỉ phải có ít nhất 5 ký tự";
    }
    if (!DoB) {
      newErrors.DoB = "Vui lòng nhập ngày sinh";
    } else {
      const today = new Date();
      const birthDate = new Date(DoB);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age < 6) {
        newErrors.DoB = "Bạn phải ít nhất 6 tuổi";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
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
          toast.success(result.message, {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            closeOnClick: true,
            transition: Zoom,
          });
          setFormData({
            fullName: "",
            username: "",
            DoB: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            role: "",
            phone: "",
            address: "",
          });
          setTimeout(() => navigate("/login"), 3000);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            closeOnClick: true,
            transition: Zoom,
          });
        }
      } catch (error: any) {
        console.error("Đăng ký lỗi:", error);
        toast.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          closeOnClick: true,
          transition: Zoom,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Hãy kiểm tra lại thông tin bạn nhập", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        transition: Zoom,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";

    switch (name) {
      case "fullName":
        if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(value)) {
          error = "Tên chỉ được chứa chữ cái và ít nhất 2 ký tự";
        }
        break;
      case "username":
        if (!/^[a-zA-Z0-9_]{4,}$/.test(value)) {
          error = "Tên người dùng phải có ít nhất 4 ký tự (không dấu, không khoảng trắng)";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Vui lòng nhập địa chỉ email hợp lệ";
        }
        break;
      case "password":
        setPasswordStrength(validatePassword(value));
        if (value.length < 8) {
          error = "Mật khẩu phải có ít nhất 8 ký tự";
        }
        break;
      case "passwordConfirmation":
        if (value !== formData.password) {
          error = "Mật khẩu xác nhận không khớp";
        }
        break;
      case "role":
        if (!value) {
          error = "Vui lòng chọn vai trò";
        }
        break;
      case "phone":
        if (!vietnamPhoneRegex.test(value)) {
          error = "Số điện thoại không hợp lệ (phải có 10 hoặc 11 chữ số)";
        }
        break;
      case "address":
        if (value.length < 5) {
          error = "Địa chỉ phải có ít nhất 5 ký tự";
        }
        break;
      case "DoB":
        if (!value) {
          error = "Vui lòng nhập ngày sinh";
        } else {
          const today = new Date();
          const birthDate = new Date(value);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          if (age < 6) {
            error = "Bạn phải ít nhất 6 tuổi";
          }
          if (age > 100) {
            error = "Really? Are you sure you are over 100 years old?";
          }
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <div className="registration-background"></div>
        <div className="registration-form-container">
          <div className="registration-form-wrapper">
            <div className="registration-form-content">
              <h2 className="registration-title">Đăng Ký Tài Khoản</h2>
              <form onSubmit={handleSubmit} className="registration-form">
                {currentStep === 1 && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Họ và Tên</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="vd: Nguyễn Văn A"
                        className={`form-input ${errors.fullName ? "input-error" : ""}`}
                      />
                      {errors.fullName && (
                        <p className="error-message">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Vai trò</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`form-input ${errors.role ? "input-error" : ""}`}
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="student">Học sinh</option>
                        <option value="parent">Phụ huynh</option>
                      </select>
                      {errors.role && (
                        <p className="error-message">{errors.role}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Ngày sinh</label>
                      <input
                        type="date"
                        name="DoB"
                        value={formData.DoB}
                        onChange={handleChange}
                        className={`form-input ${errors.DoB ? "input-error" : ""}`}
                      />
                      {errors.DoB && <p className="error-message">{errors.DoB}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vd: a@a.com"
                        className={`form-input ${errors.email ? "input-error" : ""}`}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Số điện thoại</label>
                      <div className="phone-input-container">
                        <PhoneInput
                          country={'vn'}
                          onlyCountries={['vn']}
                          disableDropdown={true}
                          disableCountryCode={true}
                          disableCountryGuess={true}
                          specialLabel="Số điện thoại"
                          placeholder="vd: 0912345678"
                          value={formData.phone}
                          onChange={(phone) => setFormData({ ...formData, phone })}
                          inputClass={`form-input ${errors.phone ? "input-error" : ""}`}
                          containerClass="phone-input"
                          inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true
                          }}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="vd: 123 Đường ABC, Quận XYZ, TP HCM"
                        className={`form-input ${errors.address ? "input-error" : ""}`}
                      />
                      {errors.address && <p className="error-message">{errors.address}</p>}
                    </div>

                    <div className="form-buttons">
                      <button type="button" onClick={() => setCurrentStep(2)} className="next-button">
                        Tiếp
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Tên người dùng</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="vd: nguyenvana"
                        className={`form-input ${errors.username ? "input-error" : ""}`}
                      />
                      {errors.username && (
                        <p className="error-message">{errors.username}</p>
                      )}
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
                          className={`form-input ${errors.password ? "input-error" : ""}`}
                        />
                        <button
                          type="button"
                          className="password-toggle-button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Ẩn" : "Hiện"}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="error-message">{errors.password}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Xác nhận mật khẩu</label>
                      <div className="password-input-container">
                        <input
                          type={showPasswordConfirmation ? "text" : "password"}
                          name="passwordConfirmation"
                          value={formData.passwordConfirmation}
                          onChange={handleChange}
                          placeholder="Xác nhận mật khẩu"
                          className={`form-input ${errors.passwordConfirmation ? "input-error" : ""}`}
                        />
                        <button
                          type="button"
                          className="password-toggle-button"
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        >
                          {showPasswordConfirmation ? "Ẩn" : "Hiện"}
                        </button>
                      </div>
                      {errors.passwordConfirmation && (
                        <p className="error-message">{errors.passwordConfirmation}</p>
                      )}
                    </div>

                    <div className="password-strength">
                      <div
                        className={`strength-meter strength-${passwordStrength}`}
                      ></div>
                      <span>
                        {
                          ["Yếu", "Trung bình", "Khá", "Mạnh"][passwordStrength - 1]
                        }
                      </span>
                    </div>

                    <div className="form-buttons">
                      <button type="button" onClick={() => setCurrentStep(1)} className="back-button">
                        Quay lại
                      </button>
                      <button type="submit" disabled={isLoading} className="submit-button">
                        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                      </button>
                    </div>
                  </>
                )}
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

