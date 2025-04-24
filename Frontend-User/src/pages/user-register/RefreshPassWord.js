import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RefreshPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setMessage("Không tìm thấy email trong localStorage.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Mật khẩu không khớp. Vui lòng thử lại!");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8081/forgotPassword/changePassword/${email}`,
        { password, repeatPassword }
      );
      setMessage(response.data);
      navigate("/login"); // Điều hướng về trang đăng nhập sau khi cập nhật thành công
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật mật khẩu:", error);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("Đã xảy ra lỗi khi cập nhật mật khẩu. Vui lòng thử lại!");
      }
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px" }}>
        <article className="card-body">
          <header className="mb-4 text-center">
            <h2 className="card-title">Cập nhật mật khẩu mới</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="repeatPassword">Nhập lại mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                placeholder="Nhập lại mật khẩu"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Cập nhật mật khẩu
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </article>
      </div>
    </section>
  );
};

export default RefreshPassword;
