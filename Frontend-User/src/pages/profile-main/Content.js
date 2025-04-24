import React from "react";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="list-group">
              <a className="list-group-item active" href="profilemain">
                {" "}
                Tổng quan về tai khoản{" "}
              </a>
              <a className="list-group-item" href="profileaddress">
                {" "}
                Địa chỉ của tôi{" "}
              </a>
              <a className="list-group-item " href="cart-payment">
                Đơn đặt hàng của tôi
              </a>
              <a className="list-group-item" href="profilewish">
                {" "}
                Sản phẩm yêu thích{" "}
              </a>
              <a className="list-group-item " href="profilesell">
                {" "}
                Mặt hàng bán của tôi{" "}
              </a>
              <a className="list-group-item" href="profilesetting">
                {" "}
                Cài đặt{" "}
              </a>
              <a className="list-group-item" href="#" onClick={handleLogout}>
                Đăng xuất
              </a>
            </nav>
          </aside>
          <main className="col-md-9">
            <article className="card mb-3">
              <div className="card-body">
                <figure className="icontext">
                  <div className="icon">
                    <img
                      className="rounded-circle img-sm border"
                      src={require("../../assets/images/items/gm.jpg")}
                    />
                  </div>
                  <div className="text">
                    <strong> Mr. Jackson Someone </strong>
                    <p className="mb-2"> myloginname@gmail.com </p>
                    <a href="#" className="btn btn-light btn-sm">
                      Edit
                    </a>
                  </div>
                </figure>

                <p>
                  <i className="fa fa-map-marker text-muted"></i> &nbsp; My
                  address: Tashkent city, Street name, Building 123, House 321{" "}
                  &nbsp;
                  <a href="#" className="btn-link">
                    {" "}
                    Edit
                  </a>
                </p>

                <article className="card-group card-stat">
                  <figure className="card bg">
                    <div className="p-3">
                      <h4 className="title">38</h4>
                      <span>Orders</span>
                    </div>
                  </figure>
                  <figure className="card bg">
                    <div className="p-3">
                      <h4 className="title">5</h4>
                      <span>Wishlists</span>
                    </div>
                  </figure>
                  <figure className="card bg">
                    <div className="p-3">
                      <h4 className="title">12</h4>
                      <span>Awaiting delivery</span>
                    </div>
                  </figure>
                  <figure className="card bg">
                    <div className="p-3">
                      <h4 className="title">50</h4>
                      <span>Delivered items</span>
                    </div>
                  </figure>
                </article>
              </div>
            </article>

            <article className="card  mb-3">
              <div className="card-body">
                <h5 className="card-title mb-4">Recent orders </h5>

                <div className="row">
                  <div className="col-md-6">
                    <figure className="itemside  mb-3">
                      <div className="aside">
                        <img
                          src={require("../../assets/images/items/gm1.jpg")}
                          className="border img-sm"
                        />
                      </div>
                      <figcaption className="info">
                        <time className="text-muted">
                          <i className="fa fa-calendar-alt"></i> 12.09.2019
                        </time>
                        <p>Great book name goes here </p>
                        <span className="text-success">Order confirmed </span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-md-6">
                    <figure className="itemside  mb-3">
                      <div className="aside">
                        <img
                          src={require("../../assets/images/items/gm6.jpg")}
                          className="border img-sm"
                        />
                      </div>
                      <figcaption className="info">
                        <time className="text-muted">
                          <i className="fa fa-calendar-alt"></i> 12.09.2019
                        </time>
                        <p>How to be rich</p>
                        <span className="text-success">Departured</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-md-6">
                    <figure className="itemside mb-3">
                      <div className="aside">
                        <img
                          src={require("../../assets/images/items/gm3.jpg")}
                          className="border img-sm"
                        />
                      </div>
                      <figcaption className="info">
                        <time className="text-muted">
                          <i className="fa fa-calendar-alt"></i> 12.09.2019
                        </time>
                        <p>Harry Potter book </p>
                        <span className="text-success">Shipped </span>
                      </figcaption>
                    </figure>
                  </div>
                </div>

                <a href="#" className="btn btn-outline-primary btn-block">
                  {" "}
                  See all orders <i className="fa fa-chevron-down"></i>{" "}
                </a>
              </div>
            </article>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Content;
