import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import us from "../assets/images/icons/flags/US.png";
import imglogo from "../assets/images/items/logo1.png";
import { FaShopify, FaFileAlt, FaBlog, FaShoppingBag } from "react-icons/fa";
import { BsQuestionSquareFill } from "react-icons/bs";
function Header({}) {
  const email = localStorage.getItem("email");
  const [categories, setCategories] = useState([]);

  return (
    <header class="section-header " style={{ boxShadow: "unset" }}>
      <section class="header-main border-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-2 col-lg-3 col-md-12">
              <a href="/" class="brand-wrap">
                <img
                  style={{ maxWidth: "150px", maxHeight: "none" }}
                  className="logo"
                  src={imglogo}
                  alt="Logo"
                />

                {/* <h3 class="chu">LAPTOP</h3> */}
              </a>
            </div>
            <div class="col-xl-6 col-lg-5 col-md-6">
              <form action="#" class="search-header vien">
                <div class="input-group w-100">
                  <select
                    class="custom-select border-right"
                    name="category_name"
                  >
                    <option value="">All type</option>
                    <option value="codex">Special</option>
                    <option value="comments">Only best</option>
                    <option value="content">Latest</option>
                  </select>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                  />

                  <div class="input-group-append">
                    <button class="btn btn-primary mau" type="submit">
                      <i class="fa fa-search"></i> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6">
              <div class="widgets-wrap float-md-right">
                <div className="widget-header mr-3">
                  {email ? (
                    <Link to="/profile" class="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-user"></i>
                      </div>
                      <small className="text">{email}</small>
                    </Link>
                  ) : (
                    <Link to="/login" class="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-user"></i>
                      </div>
                      <small className="text">Đăng Nhập</small>
                    </Link>
                  )}
                </div>
                <div class="widget-header mr-3">
                  <a href="#" class="widget-view">
                    <div class="icon-area">
                      <i class="fa fa-comment-dots"></i>
                      <span class="notify">1</span>
                    </div>
                    <small class="text"> Tin nhắn </small>
                  </a>
                </div>
                <div class="widget-header mr-3">
                  <a href="profileorder" class="widget-view">
                    <div class="icon-area">
                      <i class="fa fa-store"></i>
                    </div>
                    <small class="text"> Đơn đặt hàng </small>
                  </a>
                </div>
                <div class="widget-header">
                  <a href="shoppingcart" class="widget-view">
                    <div class="icon-area">
                      <i class="fa fa-shopping-cart"></i>
                    </div>
                    <small class="text"> Giỏ hàng </small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav class="navbar navbar-main navbar-expand-lg border-bottom p-0">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main_nav"
          aria-controls="main_nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse w-100  py-2" id="main_nav">
          <ul class="navbar-nav ml-5">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle trang"
                data-toggle="dropdown"
                href="#"
              >
                {" "}
                <i class="fa fa-bars text-muted mr-2"></i> LAPTOP MỚI{" "}
              </a>
              <div class="dropdown-menu dropdown-large text-center">
                <nav class="row">
                  <div class="col-6">
                    <a href="listinglarge"> Macbook</a>
                    <a href="offer">Macbook 13 pro</a>
                    <a href="payment"></a>
                    <a href="profileaddress"> Macbook gaming</a>
                    <a href="profilemain">Macbook 16</a>
                  </div>
                  <div class="col-6">
                    <a href="profileorder">Profile orders</a>
                    <a href="profilesell">Profile seller</a>
                    <a href="profilesetting">Profile Setting</a>
                    <a href="profilewish">Profile wishlist</a>
                  </div>
                </nav>
              </div>
            </li>
            <li className="nav-item">
              <a href="category" className="nav-link trang">
                DANH MỤC
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle trang chu "
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Danh sách sản phẩm
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.length > 0 &&
                  categories.map((row) => (
                    <a
                      class="dropdown-item"
                      href={`/ListingGrid?categoryId=${row.id}`}
                    >
                      {row.name}
                    </a>
                  ))}

                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="ListingGrid">
                  Tất cả sản phẩm
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a href="ListingGrid" className="nav-link trang">
                SHOP
              </a>
            </li>
            <li className="nav-item">
              <a href="pages" className="nav-link trang">
                BÀI VIẾT
              </a>
            </li>
            <li className="nav-item">
              <a href="blog" className="nav-link trang">
                DỊCH VỤ
              </a>
            </li>
            <li className="nav-item">
              <a href="question" className="nav-link trang">
                CÂU HỎI THƯỜNG GẶP
              </a>
            </li>
            <li className="nav-item">
              <a href="contact" className="nav-link trang">
                LIÊN HỆ CHÚNG TÔI
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-md-auto mr-5">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle trang"
                href="http://example.com"
                data-toggle="dropdown"
              >
                VIETNAMESE
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">
                  Englist
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;

/* chèn đoạn kia vào */
