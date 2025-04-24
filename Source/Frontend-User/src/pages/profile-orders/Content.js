import React from "react";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="list-group">
              <a className="list-group-item" href="profilemain">
                {" "}
                Tổng quan về tai khoản{" "}
              </a>
              <a className="list-group-item" href="profileaddress">
                {" "}
                Địa chỉ của tôi{" "}
              </a>
              <a className="list-group-item active" href="cart-payment">
                Đơn đặt hàng của tôi
              </a>
              <a className="list-group-item" href="profilewish">
                {" "}
                Sản phẩm yêu thích{" "}
              </a>
              <a className="list-group-item" href="profilesell">
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
          <main class="col-md-9">
            <article class="card mb-4">
              <header class="card-header">
                <a href="#" class="float-right">
                  {" "}
                  <i class="fa fa-print"></i> Print
                </a>
                <strong class="d-inline-block mr-3">
                  Order ID: 6123456789
                </strong>
                <span>Order Date: 16 December 2018</span>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-8">
                    <h6 class="text-muted">Delivery to</h6>
                    <p>
                      Michael Jackson Phone +1234567890 Email: myname@gmail.com
                      Location: Home number, Building name, Street 123, P.O.
                      Box: 100123
                    </p>
                  </div>
                  <div class="col-md-4">
                    <h6 class="text-muted">Payment</h6>
                    <span class="text-success">
                      <i class="fab fa-lg fa-cc-visa"></i>
                      Visa **** 4216
                    </span>
                    <p>
                      Subtotal: $356 Shipping fee: $56
                      <span class="b">Total: $456 </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <td width="65">
                        <img
                          src={require("../../assets/images/items/dh.jpg")}
                          class="img-xs border"
                        />
                      </td>
                      <td>
                        <p class="title mb-0">Product name goes here </p>
                        <var class="price text-muted">USD 145</var>
                      </td>
                      <td> Seller Nike clothing </td>
                      <td width="250">
                        {" "}
                        <a href="#" class="btn btn-outline-primary">
                          Track order
                        </a>
                        <div class="dropdown d-inline-block">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            class="dropdown-toggle btn btn-outline-secondary"
                          >
                            More
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item">
                              Return
                            </a>
                            <a href="#" class="dropdown-item">
                              Cancel order
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={require("../../assets/images/items/dh1.jpg")}
                          class="img-xs border"
                        />
                      </td>
                      <td>
                        <p class="title mb-0">Another name goes here </p>
                        <var class="price text-muted">USD 15</var>
                      </td>
                      <td> Seller ABC shop </td>
                      <td>
                        <a href="#" class="btn btn-outline-primary">
                          Track order
                        </a>
                        <div class="dropdown d-inline-block">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            class="dropdown-toggle btn btn-outline-secondary"
                          >
                            More
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item">
                              Return
                            </a>
                            <a href="#" class="dropdown-item">
                              Cancel order
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={require("../../assets/images/items/dh2.jpg")}
                          class="img-xs border"
                        />
                      </td>
                      <td>
                        <p class="title mb-0">
                          The name of the product goes here{" "}
                        </p>
                        <var class="price text-muted">USD 145</var>
                      </td>
                      <td> Seller Wallmart </td>
                      <td>
                        {" "}
                        <a href="#" class="btn btn-outline-primary">
                          Track order
                        </a>
                        <div class="dropdown d-inline-block">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            class="dropdown-toggle btn btn-outline-secondary"
                          >
                            More
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item">
                              Return
                            </a>
                            <a href="#" class="dropdown-item">
                              Cancel order
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <article class="card order-item mb-4">
              <header class="card-header">
                <a href="#" class="float-right">
                  {" "}
                  <i class="fa fa-print"></i> Print
                </a>
                <strong class="d-inline-block mr-3">
                  Order ID: 6123456789
                </strong>
                <span>Order Date: 16 December 2018</span>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-8">
                    <h6 class="text-muted">Delivery to</h6>
                    <p>
                      Michael Jackson Phone +1234567890 Email:
                      myname@pixsellz.com Location: Home number, Building name,
                      Street 123, Tashkent, UZB P.O. Box: 100123
                    </p>
                  </div>
                  <div class="col-md-4">
                    <h6 class="text-muted">Payment</h6>
                    <span class="text-success">
                      <i class="fab fa-lg fa-cc-visa"></i>
                      Visa **** 4216
                    </span>
                    <p>
                      Subtotal: $356 Shipping fee: $56
                      <span class="b">Total: $456 </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <td width="65">
                        <img
                          src={require("../../assets/images/items/dh3.jpg")}
                          class="img-xs border"
                        />
                      </td>
                      <td>
                        <p class="title mb-0">Product name goes here </p>
                        <var class="price text-muted">USD 145</var>
                      </td>
                      <td> Seller Nike clothing </td>
                      <td width="250">
                        {" "}
                        <a href="#" class="btn btn-outline-primary">
                          Track order
                        </a>
                        <div class="dropdown d-inline-block">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            class="dropdown-toggle btn btn-outline-secondary"
                          >
                            More
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item">
                              Return
                            </a>
                            <a href="#" class="dropdown-item">
                              Cancel order
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={require("../../assets/images/items/dh4.jpg")}
                          class="img-xs border"
                        />
                      </td>
                      <td>
                        <p class="title mb-0">Another name goes here </p>
                        <var class="price text-muted">USD 15</var>
                      </td>
                      <td> Seller ABC shop </td>
                      <td>
                        {" "}
                        <a href="#" class="btn btn-outline-primary">
                          Track order
                        </a>
                        <div class="dropdown d-inline-block">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            class="dropdown-toggle btn btn-outline-secondary"
                          >
                            More
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item">
                              Return
                            </a>
                            <a href="#" class="dropdown-item">
                              Cancel order
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Content;
