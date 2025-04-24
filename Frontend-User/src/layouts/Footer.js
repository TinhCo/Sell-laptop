import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="bg-secondary py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h4 className="text-white">Giới thiệu về công ty</h4>
              <ul className="list-unstyled text-white">
                <li>LaptopAZ.vn 2022 - Công ty công nghệ thông minh IT</li>
                <li>
                  Laptop đang trong giai đoạn phát triển mạnh với nhiều mặt hàng
                  phong phú, giá cả cạnh tranh, mong muốn đem đến chất lượng tốt
                  nhất cho khách hàng.
                </li>
                <li>
                  Địa chỉ:61a Hẻm 59, đường 102, Phường Tăng Nhơn Phú A, quận 9,
                  thành phố Hồ Chí Minh
                </li>
                <li>Điện thoại: 0375582856</li>
                <li>Email: phungtoan872@gmail.com</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="text-white">Chính sách công ty</h4>
              <ul className="list-unstyled text-white">
                <li>Chính sách chất lượng</li>
                <li>Chính sách bảo hành</li>
                <li>Chính sách đổi trả</li>
                <li>Chính sách bảo mật thông tin</li>
                <li>Chính sách vận chuyển</li>
                <li>Hướng dẫn mua hàng và thanh toán</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="text-white">Các chính sách</h4>
              <ul className="list-unstyled text-white">
                <li>Chính sách đổi trả hàng</li>
                <li>Chính sách bảo hành - bảo trì</li>
                <li>Phương thức thanh toán</li>
                <li>Chính sách trả góp</li>
                <li>Giao hàng và nhận hàng</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="text-white">Hỗ trợ - Dịch vụ</h4>
              <ul className="list-unstyled text-white">
                <li>Dịch vụ sửa chữa</li>
                <li>Gói nâng cấp tăng tốc độ</li>
                <li>Bảo dưỡng – chăm sóc máy tính</li>
                <li>Hướng dẫn mua trả góp</li>
                <li>Hướng dẫn mua hàng từ xa</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="social-icons d-flex justify-content-center">
            <a
              href="#"
              className="social-icon me-3 bg-primary rounded-circle p-2 m-2"
              target="_blank"
              title="Facebook"
            >
              <i className="fab fa-facebook-f text-white fa-2x"></i>
            </a>
            <a
              href="#"
              className="social-icon me-3 bg-info rounded-circle p-2 m-2"
              target="_blank"
              title="Twitter"
            >
              <i className="fab fa-twitter text-white fa-2x"></i>
            </a>
            <a
              href="#"
              className="social-icon me-3 bg-danger rounded-circle p-2 m-2"
              target="_blank"
              title="Instagram"
            >
              <i className="fab fa-instagram text-white fa-2x"></i>
            </a>
            <a
              href="#"
              className="social-icon me-3 bg-danger rounded-circle p-2 m-2"
              target="_blank"
              title="Youtube"
            >
              <i className="fab fa-youtube text-white fa-2x"></i>
            </a>
            <a
              href="#"
              className="social-icon bg-secondary rounded-circle p-2 m-2"
              target="_blank"
              title="Pinterest"
            >
              <i className="fab fa-pinterest text-white fa-2x"></i>
            </a>
          </div>
        </div>

        <div className="container border-top">
          <p className="text-center text-white mt-3 mb-0">
            &copy; Bản quyền thuộc về Duy Tân
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
