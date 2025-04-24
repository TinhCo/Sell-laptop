import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style.css";
import { auth, provider } from "../../api/config";
import { signInWithPopup } from "firebase/auth";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [value, setValue] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    if (response.email && response.accessToken) {
      localStorage.setItem("email", response.email);
      localStorage.setItem("token", response.accessToken);
      navigate("/");
    }
  };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      navigate("/");
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/authenticate",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        navigate("/");
      } else {
        alert("Đăng nhập không thành công. Vui lòng kiểm tra thông tin.");
      }
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });
  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div
        className="card mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Sign in</h2>
          <form onSubmit={handleLogin}>
            <FacebookLogin
              appId="1347958199092549"
              autoLoad={false}
              fields="name,email,picture"
              onClick={() => console.log("Facebook login clicked")}
              callback={responseFacebook}
              cssClass="btn btn-facebook btn-block mb-2"
              icon="fa-facebook"
            />
            <button
              type="button"
              className="btn btn-google btn-block mb-4"
              onClick={handleClick}
            >
              <i className="fab fa-google"></i>&nbsp; Sign in with Google
            </button>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="forgotpassword" className="float-right">
                Forgot password?{" "}
              </a>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="text-center mt-4">
        Don't have an account? <a href="register">Sign up</a>
      </p>
      <br />
      <br />
    </section>
  );
};

export default Login;
