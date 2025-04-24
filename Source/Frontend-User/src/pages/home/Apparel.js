import React, { useEffect, useState } from "react";
import axios from "axios";

const Apparel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/product/category/1"
        ); // Thay đường dẫn API phù hợp
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="padding-bottom">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase">LAPTOP MACBOOK</h4>
      </header>

      <div className="card card-home-category">
        <div className="row no-gutters">
          <div className="col-md-3">
            <div className="home-category-banner bg-light-orange1">
              <h5 className="title">
                XU HƯỚNG LAPTOP LÀM VIỆC TRONG VĂN PHÒNG
              </h5>
              <p>Laptop Apple MacBook Air M1 2020</p>
              <a
                href="/ListingGrid?categoryId=1"
                className="btn btn-outline-primary rounded-pill"
              >
                Source now
              </a>
              <div className="image5">
                <img
                  src={require("../../assets/images/items/dh2.jpg")}
                  className="image4"
                  alt="banner"
                />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <ul className="row no-gutters bordered-cols">
              {products.slice(0, 8).map((product) => (
                <li className="col-6 col-lg-3 col-md-4" key={product.id}>
                  <a href={`/detail/${product.id}`} className="item">
                    <div className="card-body">
                      <div className="image">
                        <img
                          className="img-sm float-right image1"
                          src={product.image} // Đường dẫn ảnh của sản phẩm
                          alt={product.name}
                        />
                      </div>
                      <h6 className="title fone xuong">
                        {product.name}
                        <p className="kha text-center xuong">
                          {product.presale} đ
                          <span className="small text-uppercase text-muted khai">
                            {product.price} đ
                          </span>
                        </p>
                      </h6>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apparel;
