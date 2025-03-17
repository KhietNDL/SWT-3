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
    <div className="payment-page">
      <h2>PAYMENT DETAILS</h2>
      <div className="payment-container">
        <div className="payment-form">
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Momo"
                onChange={() => handlePayment("Momo")}
              />
              <span>Momo</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="CreditCard"
                onChange={() => handlePayment("CreditCard")}
              />
              <span>Credit Card</span>
            </label>
          </div>

          <div className="payment-details">
            {selectedMethod === "CreditCard" && (
              <div className="credit-card-details">
                <label>
                  CREDIT CARD NUMBER
                  <input type="text" placeholder="0000 0000 0000 ****" />
                </label>
                <label>
                  CVV CODE
                  <input type="text" placeholder="***" />
                </label>
                <label>
                  EXPIRY DATE
                  <input type="text" placeholder="MM / YY" />
                </label>
              </div>
            )}

            {selectedMethod === "Momo" && (
              <div className="qr-code-container">
                <h3>Scan the QR code to pay with Momo</h3>
                <img
                  src="/assets/momo-qr.png"
                  alt="QR code for Momo"
                />
              </div>
            )}
          </div>
          <button className="payment-button" onClick={() => console.log("Payment processed")}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
