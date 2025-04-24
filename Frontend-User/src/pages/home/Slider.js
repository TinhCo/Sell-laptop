import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/ListingGrid?categoryId=${categoryId}`);
  };

  return (
    <section className="section-main padding-y">
      <main className="card">
        <div className="card-body">
          <div className="row">
            <aside className="col-lg-3 col-md-3 flex-lg-grow-0">
              <nav className="nav-home-aside">
                <h6 className="title-category">
                  SẢN PHẨM CỦA TÔI{" "}
                  <i className="d-md-none icon fa fa-chevron-down"></i>
                </h6>
                <ul className="menu-category">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <a href="#">{category.name}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <div className="col-md-9 col-lg-9 col-xl-9">
              <div
                id="carousel1_indicator"
                className="slider-home-banner carousel slide"
                data-ride="carousel"
                data-interval="3000"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carousel1_indicator"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li data-target="#carousel1_indicator" data-slide-to="1"></li>
                  <li data-target="#carousel1_indicator" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={require("../../assets/images/items/slide1.jpg")}
                      className="d-block w-100"
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={require("../../assets/images/items/slide3.jpg")}
                      className="d-block w-100"
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={require("../../assets/images/items/gm3.jpg")}
                      className="d-block w-100"
                      alt="Second slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carousel1_indicator"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carousel1_indicator"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Slider;
