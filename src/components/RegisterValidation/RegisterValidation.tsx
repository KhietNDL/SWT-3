import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../types/toastConfig";
import 'react-toastify/dist/ReactToastify.css';
import "./RegisterValidation.scss";

const VerificationPage = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);

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
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1].focus();
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
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (code === "123456") {
                setSuccess(true);
                setError("");
                toast.success("Xác thực email thành công!", toastConfig);
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setError("Mã xác thực không hợp lệ");
                toast.error("Mã xác thực không hợp lệ", toastConfig);
            }
        } catch (err) {
            setError("Xác thực thất bại. Vui lòng thử lại.");
            toast.error("Xác thực thất bại. Vui lòng thử lại.", toastConfig);
        }
        setLoading(false);
    };

    const handleResendCode = async () => {
        setCanResend(false);
        setTimer(30);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.info("Mã xác thực mới đã được gửi", toastConfig);
    };

    return (
        <div className="verification-page">
            <ToastContainer />
            <div className="container">
                <div className="icon-container">
                    <FiMail className="icon" />
                </div>
                <h2>Xác Thực Email Của Bạn</h2>
                <p>Chúng tôi đã gửi mã xác thực đến địa chỉ email của bạn</p>
                <div className="code-inputs">
                    {verificationCode.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                if (el) inputRefs.current[idx] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInput(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                        />
                    ))}
                </div>
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
