import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.scss";

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePayment = (method: string) => {
    setSelectedMethod(method);
    // Placeholder for API call
    console.log(`Processing payment with ${method}`);
    // After payment processing, navigate to a success page or order summary
    // navigate(`/payment-success`);
  };

  return (
    <div className="payment-container">
      <h2>Chọn phương thức thanh toán</h2>
      <div className="payment-buttons">
        <button onClick={() => handlePayment("Momo")}>Thanh toán bằng Momo</button>
        <button onClick={() => handlePayment("Bank")}>Thanh toán bằng Ngân hàng</button>
      </div>

      {selectedMethod && (
        <div className="qr-code-container">
          <h3>Quét mã QR để thanh toán bằng {selectedMethod}</h3>
          <img
            src={selectedMethod === "Momo" ? "/assets/momo-qr.png" : "/assets/bank-qr.png"}
            alt={`QR code for ${selectedMethod}`}
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
