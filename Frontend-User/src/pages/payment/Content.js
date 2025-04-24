import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaArrowLeft } from "react-icons/fa";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { districts, provinces, wards } from "../payment/vietnam-addresses";

const Checkout = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    receiveMethod: "delivery",
    province: null,
    district: null,
    ward: null,
    address: "",
    notes: "",
    companyInvoice: false,
    emailNotify: true,
  });

  const [cart, setCart] = useState({});
  const [price, setPrice] = useState(0);
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    Object.values(cart).forEach((item) => {
      const itemPrice =
        typeof item.product.price === "number" ? item.product.price : 0;
      totalPrice += item.quantity * itemPrice;
    });
    setPrice(totalPrice);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setCustomerInfo({
      ...customerInfo,
      [name]: selectedOption,
    });
  };

  const handleContinue = () => {
    const token = localStorage.getItem("token");
    const orderItems = Object.values(cart).map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const orderData = {
      name: customerInfo.name,
      phone: customerInfo.phone,
      email: customerInfo.email,
      address: `${customerInfo.address}, ${customerInfo.ward?.label}, ${customerInfo.district?.label}, ${customerInfo.province?.label}`,
      note: customerInfo.notes,
      status: 1,
      orderItems: orderItems, // thêm thông tin về các sản phẩm trong đơn hàng
    };

    axios
      .post("http://localhost:8081/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Đơn hàng đã được tạo thành công!");

        // Lưu đơn hàng vào localStorage với tên 'order'
        localStorage.setItem("order", JSON.stringify(response.data));
        navigate("/cart-payment");
      })
      .catch((error) => {
        console.error("Lỗi tạo đơn hàng:", error);
        toast.error("Lỗi tạo đơn hàng. Vui lòng thử lại.");
      });
  };

  const toggleProductInfo = () => {
    setIsProductInfoExpanded(!isProductInfoExpanded);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center mb-4">
        <a href="/shoppingcart" className="btn btn-link">
          <FaArrowLeft size={24} />{" "}
        </a>
        <h2 className="text-center flex-grow-1">Thông tin</h2>
      </Row>
      <Card className="shadow">
        <Card.Body>
          <div className="mb-3">
            <h4 className="card-title d-flex justify-content-between align-items-center">
              <span>Thông tin</span>
              <Button
                variant="link"
                onClick={toggleProductInfo}
                aria-expanded={isProductInfoExpanded ? "true" : "false"}
              >
                {isProductInfoExpanded ? "Thu gọn" : "Mở rộng"}
              </Button>
            </h4>
            {isProductInfoExpanded && (
              <>
                {Object.values(cart).map((item, index) => (
                  <Row key={index} className="mb-3">
                    <Col md={8}>
                      <h5 className="card-title">{item.product.name}</h5>
                      <p className="card-text">
                        {item.product.price.toLocaleString()} ₫
                        <span className="text-muted">
                          {item.product.presale && (
                            <del>{item.product.presale.toLocaleString()}₫</del>
                          )}
                        </span>
                      </p>
                      <p>Số lượng: {item.quantity}</p>
                    </Col>
                    <Col md={4} className="text-right">
                      <img
                        src={item.product.image}
                        alt="Product"
                        className="img-thumbnail"
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </div>
          <Form>
            <h4 className="mb-3">Thông tin khách hàng</h4>
            <Form.Group controlId="name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="emailNotify" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Nhận email thông báo!"
                checked={customerInfo.emailNotify}
                onChange={handleChange}
                name="emailNotify"
              />
            </Form.Group>
            <h4 className="mb-3">Thông tin nhận hàng</h4>
            <Form.Group>
              <div>
                <Form.Check
                  type="radio"
                  id="homeDelivery"
                  label="Giao hàng tận nơi"
                  name="receiveMethod"
                  value="delivery"
                  checked={customerInfo.receiveMethod === "delivery"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            {customerInfo.receiveMethod === "delivery" && (
              <>
                <Form.Group>
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Select
                    name="province"
                    options={provinces}
                    value={customerInfo.province}
                    onChange={handleSelectChange}
                    isClearable
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </Form.Group>
                {customerInfo.province && (
                  <Form.Group>
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Select
                      name="district"
                      options={districts[customerInfo.province.value]}
                      value={customerInfo.district}
                      onChange={handleSelectChange}
                      isClearable
                      className="basic-single"
                      classNamePrefix="select"
                    />
                  </Form.Group>
                )}
                {customerInfo.district && (
                  <Form.Group>
                    <Form.Label>Phường/Xã</Form.Label>
                    <Select
                      name="ward"
                      options={wards[customerInfo.district.value]}
                      value={customerInfo.ward}
                      onChange={handleSelectChange}
                      isClearable
                      className="basic-single"
                      classNamePrefix="select"
                    />
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label htmlFor="address">Số nhà, tên đường</Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            {customerInfo.receiveMethod === "delivery" && (
              <Form.Group controlId="companyInvoice" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Yêu cầu xuất hoá đơn công ty"
                  checked={customerInfo.companyInvoice}
                  onChange={handleChange}
                  name="companyInvoice"
                />
              </Form.Group>
            )}
            <Form.Group controlId="notes" className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={customerInfo.notes}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleContinue}
              disabled={!customerInfo.name || !customerInfo.phone}
            >
              Tiếp tục
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Checkout;
