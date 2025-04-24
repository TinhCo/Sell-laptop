import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
const CheckOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/shoppingcart");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Image
        src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg"
        alt="Checkout Complete"
        fluid
        className="w-100 h-100"
      />
    </Container>
  );
};

export default CheckOut;
