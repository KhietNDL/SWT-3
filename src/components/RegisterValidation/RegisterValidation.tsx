import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast} from "react-toastify";
import { toastConfig } from "../../types/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterValidation.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const VerificationPage: React.FC = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const [canResend, setCanResend] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const User = useSelector((state: RootState) => state.user);
    // Debugging: Log all localStorage contents
    useEffect(() => {
        console.log("All localStorage contents:", localStorage);
        
        // Retrieve email from localStorage with additional logging
        const storedEmail = localStorage.getItem("email");
        console.log("Stored email:", storedEmail);
        
        if (!storedEmail) {
            // If no email is found, redirect to registration or show an error
            toast.error("Không tìm thấy email. Vui lòng đăng ký lại.", {
                ...toastConfig,
                onClose: () => navigate("/register")
            });
        }
    }, [navigate]);

    // Retrieve email from localStorage
    const email = localStorage.getItem("email") || "";

    useEffect(() => {
        if (timer > 0 && !canResend) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setCanResend(true);
        }
    }, [timer, canResend]);

    const handleInput = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        setError("");
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerification = async () => {
        const code = verificationCode.join("");
        if (code.length !== 6) {
            setError("Vui lòng nhập đủ 6 chữ số");
            toast.error("Vui lòng nhập đủ 6 chữ số", toastConfig);
            return;
        }
        
        setLoading(true);
        try {
            // Rigorous email validation
            const email = localStorage.getItem("email");
            if (!email) {
                throw new Error("Không tìm thấy email. Vui lòng đăng ký lại.");
            }

            const otpData = {
                email: email,
                otp: code
            };

            console.log("Sending OTP verification request:", otpData);

            const response = await fetch("http://localhost:5199/Account/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(otpData),
            });

            // Log the full response for debugging
            const data = await response.json();
            console.log("Server response:", response.status, data);

            if (response.ok) {
                setSuccess(true);
                setError("");
                toast.success("Xác thực email thành công!", toastConfig);
                
                // Check user role and navigate accordingly
                
                if (User?.roleName === "Manager") {
                    setTimeout(() => navigate("/manage"), 3000);
                } else {
                    setTimeout(() => navigate("/login"), 3000);
                }
                
                localStorage.removeItem("email");
            } else {
                const errorMessage = data.message || "Mã xác thực không hợp lệ";
                setError(errorMessage);
                toast.error(errorMessage, toastConfig);
            }
        } catch (err) {
            console.error("Verification error:", err);
            const errorMessage = err instanceof Error ? err.message : "Xác thực thất bại. Vui lòng thử lại.";
            setError(errorMessage);
            toast.error(errorMessage, toastConfig);
            navigate("/register");
        }
        setLoading(false);
    };

    const handleResendCode = async () => {
        setCanResend(false);
        setTimer(60);
        try {
            const email = localStorage.getItem("email");
            if (!email) {
                throw new Error("Không tìm thấy email. Vui lòng đăng ký lại.");
            }

            const resendData = { email: email };
            console.log("Sending OTP resend request:", resendData);

            const response = await fetch("http://localhost:5199/Account/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resendData),
            });

            const data = await response.json();
            console.log("Resend server response:", response.status, data);

            if (response.ok) {
                toast.info("Mã xác thực mới đã được gửi", toastConfig);
            } else {
                toast.error(data.message || "Không thể gửi lại mã xác thực", toastConfig);
            }
        } catch (err) {
            console.error("Resend error:", err);
            toast.error("Không thể gửi lại mã xác thực", toastConfig);
            
            // Redirect to registration if email is missing
            navigate("/register");
        }
    };

    return (
        <div className="verification-page">
            <ToastContainer />
            <div className="container">
                <div className="icon-container">
                    <FiMail className="icon" />
                </div>
                <h2>Xác Thực Email Của Bạn</h2>
                <p>Chúng tôi đã gửi mã xác thực đến địa chỉ email {email}</p>
                <div className="code-inputs">
                    {verificationCode.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                inputRefs.current[idx] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInput(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e as React.KeyboardEvent<HTMLInputElement>)}
                        />
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleVerification} disabled={loading || success}>
                    {loading ? <AiOutlineLoading3Quarters className="loading-icon" /> : "Xác Thực Email"}
                </button>
                <div>
                    {!canResend ? (
                        <p>Gửi lại mã sau {timer} giây</p>
                    ) : (
                        <button onClick={handleResendCode} className="resend-button">
                            Gửi lại mã xác thực
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;