import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setMessage("Không tìm thấy email trong localStorage.");
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const response = await axios.post(
        `http://localhost:8081/forgotPassword/verifyOtp/${otpValue}/${email}`
      );
      setMessage(response.data);
      navigate(`/refresh-password`);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xác thực OTP:", error);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("Đã xảy ra lỗi khi xác thực OTP. Vui lòng thử lại!");
      }
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px" }}>
        <article className="card-body text-center">
          <header className="mb-4">
            <h2 className="card-title">Nhập mã OTP</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mb-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control mx-1 text-center"
                  style={{ width: "2.5em", height: "2.5em", fontSize: "1.5em" }}
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Xác nhận
            </button>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </article>
      </div>
    </section>
  );
};

export default Otp;
