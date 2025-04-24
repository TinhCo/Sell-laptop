import React from 'react';

const Contactus = () => {
  return (
    <main className="main-content bg-gray-100 py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.234139704564!2d-79.37321218401041!3d43.664100079121056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb4f102d2327%3A0xba090d3ae7f8abda!2s474+Ontario+St%2C+Toronto%2C+ON+M4X+1M7%2C+Ca-na-%C4%91a!5e0!3m2!1svi!2sus!4v1487219840492"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
              <div className="card-body">
                <p className="card-text mb-4">
                  Sed vestibulum faucibus felis, sit amet facilisis tellus. Aliquam erat volutpat. Sed consectetur ipsum velit, quis rhoncus libero egestas eget.
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex mb-3">
                    <i className="fa fa-map-marker text-primary me-2 mt-1"></i>
                    <span>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fa fa-clock-o text-primary me-2 mt-1"></i>
                    <div>
                      <span>Giờ mở cửa:</span>
                      <ul className="list-unstyled ps-3 mt-1">
                        <li>Thứ Hai - Thứ Sáu: 11.00 - 20.00</li>
                        <li>Thứ Bảy: 10.00 - 20.00</li>
                        <li>Chủ Nhật: 19.00 - 20.00</li>
                      </ul>
                    </div>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fa fa-envelope-o text-primary me-2 mt-1"></i>
                    <span>support@nngochai040103</span>
                  </li>
                  <li className="d-flex">
                    <i className="fa fa-phone text-primary me-2 mt-1"></i>
                    <span>(+84)33.3279.143</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <form id="contact_form" acceptCharset="UTF-8" className="contact-form">
                  <input type="hidden" name="form_type" value="contact" />
                  <input type="hidden" name="utf8" value="✓" />

                  <div className="mb-3">
                    <label htmlFor="ContactFormName" className="form-label fw-bold">Tên</label>
                    <input
                      type="text"
                      id="ContactFormName"
                      className="form-control"
                      name="contact[name]"
                      placeholder="Nhập tên của bạn"
                      autoComplete="on"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ContactFormEmail" className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      id="ContactFormEmail"
                      className="form-control"
                      name="contact[email]"
                      placeholder="Nhập email của bạn"
                      autoComplete="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ContactFormPhone" className="form-label fw-bold">Số điện thoại</label>
                    <input
                      type="tel"
                      id="ContactFormPhone"
                      className="form-control"
                      name="contact[phone]"
                      placeholder="Nhập số điện thoại của bạn"
                      pattern="[0-9\-]*"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ContactFormMessage" className="form-label fw-bold">Tin nhắn</label>
                    <textarea
                      rows="5"
                      id="ContactFormMessage"
                      className="form-control"
                      name="contact[body]"
                      placeholder="Nhập nội dung tin nhắn của bạn"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactus;
