import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const navigation = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/register",
        {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }
      );
      toast.success("Đăng ký thành công!");
      setTimeout(() => {
        navigation("/login");
      }, 2000); // Chờ 2 giây trước khi chuyển hướng
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng ký:", error);
      toast.error("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại!");
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <article className="card-body">
          <header className="mb-4 text-center">
            <h2 className="card-title">Đăng ký</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Nhập tên của bạn"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group position-relative">
              <label htmlFor="password">Tạo mật khẩu</label>
              <input
                className="form-control"
                type={passwordType}
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              <i
                className={`fas ${
                  passwordType === "password" ? "fa-eye" : "fa-eye-slash"
                } position-absolute`}
                style={{
                  top: "43px",
                  right: "10px",
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="form-group position-relative">
              <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
              <input
                className="form-control"
                type={confirmPasswordType}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <i
                className={`fas ${
                  confirmPasswordType === "password" ? "fa-eye" : "fa-eye-slash"
                } position-absolute`}
                style={{
                  top: "43px",
                  right: "10px",
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Đăng ký
              </button>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="terms">
                Tôi đồng ý với <a href="#">điều khoản và điều kiện</a>
              </label>
            </div>
          </form>
        </article>
        <p className="text-center mt-4">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Content;
