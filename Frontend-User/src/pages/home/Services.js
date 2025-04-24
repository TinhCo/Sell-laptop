import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/product/category/4"
        );
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
        <h4 className="title-section text-uppercase">LINH KIỆN - PHỤ KIỆN</h4>
      </header>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-6">
            <Link to={`/detail/${product.id}`} className="card-link">
              <article className="card card-post">
                {product.discountPercent === -56 && (
                  <span className="productType">
                    <img
                      className="img-fluid"
                      src={require("../../assets/images/items/sale.jpg")}
                      alt="sale off"
                    />
                    <span className="percent">-56%</span>
                  </span>
                )}
                <div className="image-container">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                </div>
                <h6 className="title fone xuong">
                  {product.name}
                  <p className="kha text-center xuong">
                    {product.price} VND
                    <span className="small text-uppercase text-muted khai">
                      {product.presale} vnd
                    </span>
                  </p>
                </h6>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
