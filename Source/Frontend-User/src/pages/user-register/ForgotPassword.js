import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ setCategory }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8081/forgotPassword/verifyMail/${email}`
      );
      setMessage(response.data);

      // Lưu email vào localStorage
      localStorage.setItem("email", email);

      navigate("/otp");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi email:", error);
      if (error.response && error.response.data) {
        setMessage(error.response.data); // Lấy thông báo lỗi từ API
      } else {
        setMessage("Đã xảy ra lỗi khi gửi email. Vui lòng thử lại!");
      }
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-5" style={{ maxWidth: "600px" }}>
        <article className="card-body">
          <header className="mb-4 text-center">
            <h4 className="card-title">Quên mật khẩu</h4>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Gửi email xác nhận
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </article>
      </div>
    </section>
  );
};

export default ForgotPassword;
