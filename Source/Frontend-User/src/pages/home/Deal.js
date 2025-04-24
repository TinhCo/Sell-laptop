import React, { useState, useEffect } from "react";
import axios from "axios";

const Deal = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [products, setProducts] = useState([]);

  const calculateTimeLeft = () => {
    const currentDate = new Date();
    let dealDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );
    if (currentDate >= dealDate) {
      dealDate.setDate(dealDate.getDate() + 1);
    }

    const difference = dealDate - currentDate;
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    fetchProducts();

    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/product/all");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error fetching the products:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      }
    }
  };

  return (
    <section>
      <div className="row">
        <div className="col-3 border">
          <header className="section-heading">
            <h4 className="section-title">GIỜ VÀNG GIÁ SỐC</h4>
          </header>
          <div className="timer">
            <div></div>
            <div>
              <span className="num">{timeLeft.hours}</span> <small>Giờ</small>
            </div>
            <div>
              <span className="num">{timeLeft.minutes}</span>{" "}
              <small>Phút</small>
            </div>
            <div>
              <span className="num">{timeLeft.seconds}</span>{" "}
              <small>Giây</small>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="row no-gutters items-wrap">
            {products.slice(0, 4).map((product) => (
              <div className="col-md-3 col-6 border" key={product.id}>
                <figure className="card-product-grid mb-0 card-sm">
                  <a href={`/detail/${product.id}`} className="img-wrap">
                    <img src={product.image} alt={product.name} />
                  </a>
                  <div className="text-wrap p-3 text-center">
                    <a href="#" className="title">
                      {product.name}
                    </a>
                    <span className="badge badge-danger">
                      {" "}
                      -10% {product.presale}
                    </span>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deal;
