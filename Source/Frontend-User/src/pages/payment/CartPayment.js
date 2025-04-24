import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Modal,
  ListGroup,
} from "react-bootstrap";
import {
  FaTruck,
  FaMoneyCheckAlt,
  FaQrcode,
  FaCreditCard,
  FaMobileAlt,
  FaRegCreditCard,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartPayment.css";
import { useCart } from "../../api/CartContext";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
import { useNavigate } from "react-router-dom";

const CartPayment = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [discount, setDiscount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderInfo = async () => {
      const orderId = JSON.parse(localStorage.getItem("order")).id;
      try {
        const response = await axios.get(
          `http://localhost:8081/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrderInfo(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        toast.error("Lỗi khi lấy thông tin đơn hàng!");
      }
    };

    getOrderInfo();
  }, []);

  const cleanPrice = (price) => {
    return parseFloat(price.replace(/[^0-9]/g, ""));
  };

  const totalPrice = Object.values(state.items).reduce((total, item) => {
    const itemPrice =
      typeof item.product.price === "string"
        ? cleanPrice(item.product.price)
        : item.product.price;
    return total + item.quantity * itemPrice;
  }, 0);

  const totalItems = Object.values(state.items).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const discountedPrice = () => {
    if (discount) {
      const discountAmount = Math.min(totalPrice * 0.02, 200000);
      return totalPrice - discountAmount;
    }
    return totalPrice;
  };

  const handleDiscountApply = () => {
    if (discount) {
    }
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    handleCloseModal();
  };

  const clearCartAndOrder = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("order");
  };

  const handlePayment = async () => {
    const orderId = JSON.parse(localStorage.getItem("order")).id;
    const orderDetails = Object.values(state.items).map((item) => ({
      orderId,
      productId: item.product.id,
      price: item.product.price,
      qty: item.quantity,
      amount: item.quantity * item.product.price,
    }));

    try {
      const response = await axios.post(
        `http://localhost:8081/orderdetails`,
        orderDetails[0],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Thanh toán thành công:", response.data);
      toast.success("Thanh toán thành công!");
      setPaymentSuccess(true);
      clearCartAndOrder();
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
      toast.error("Lỗi khi xử lý thanh toán!");
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (paymentSuccess) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: 700, height: 700 }}
        />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Body>
          <Row className="justify-content-between align-items-center mb-4">
            <a href="/payment" className="btn btn-link">
              <FaArrowLeft size={24} />{" "}
            </a>
            <h2 className="text-center flex-grow-1">Thông tin</h2>
          </Row>
          <Row className="mb-3">
            <Col md={8}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Nhập mã giảm giá (chỉ áp dụng 1 lần)"
                  className="rounded-start"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="rounded-end"
                  onClick={handleDiscountApply}
                >
                  Áp dụng
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} className="text-dark">
              Số lượng sản phẩm
            </Col>
            <Col md={6} className="text-end text-dark">
              {totalItems}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} className="text-dark">
              Tiền hàng (tạm tính)
            </Col>
            <Col md={6} className="text-end text-dark">
              {totalPrice.toLocaleString()}đ
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} className="text-dark">
              Phí vận chuyển
            </Col>
            <Col md={6} className="text-end text-dark">
              Miễn phí
            </Col>
          </Row>

          {discount && (
            <Row className="mb-3">
              <Col md={6} className="text-dark">
                Ưu đãi giảm giá
              </Col>
              <Col md={6} className="text-end text-dark">
                -{Math.min(totalPrice * 0.02, 200000).toLocaleString()}đ
              </Col>
            </Row>
          )}

          <hr />
          <Row className="mb-3">
            <Col md={6} className="text-dark">
              <strong>Tổng tiền (đã gồm VAT)</strong>
            </Col>
            <Col md={6} className="text-end text-dark">
              <strong>{discountedPrice().toLocaleString()}đ</strong>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <div
                className="p-3 border rounded-3 bg-light d-flex align-items-center cursor-pointer"
                onClick={handleShowModal}
              >
                <FaMoneyCheckAlt className="me-2 text-primary" size={24} />
                <span className="text-dark">{selectedMethod}</span>
                <Button variant="link" className="ms-auto text-primary">
                  thay đổi
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={12}>
              <h5 className="text-dark">Thông tin nhận hàng</h5>
              <div className="p-3 border rounded-3 bg-light">
                <p>
                  Khách hàng: <strong>{orderInfo?.name}</strong>
                </p>
                <p>
                  Số điện thoại: <strong>{orderInfo?.phone}</strong>
                </p>
                <p>
                  Email: <strong>{orderInfo?.email}</strong>
                </p>
                <p>
                  Nhận hàng tại: <strong>{orderInfo?.address}</strong>
                </p>
                <p>
                  Người nhận: <strong>{orderInfo?.name}</strong>
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <Form.Check
                type="checkbox"
                label="Bằng việc Đặt hàng, bạn đồng ý với Điều khoản sử dụng của tôi. Với các giao dịch từ 10 triệu trở lên, xin phép kiểm tra thẻ cùng với CCCD của đúng chủ thẻ trước khi tiến hành giao hàng nhằm hạn chế các trường hợp gian lận."
                defaultChecked
                className="text-dark"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="text-center">
              <h5 className="text-dark">
                Tổng tiền tạm tính: {discountedPrice().toLocaleString()}đ
              </h5>
              <Button
                variant="danger"
                className="mt-3 rounded-pill px-4"
                onClick={handlePayment}
              >
                Thanh toán
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal chọn phương thức thanh toán */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">
            Chọn phương thức thanh toán
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item
              action
              className={`payment-method ${
                selectedMethod === "Thanh toán khi nhận hàng" ? "active" : ""
              }`}
              onClick={() => handleMethodChange("Thanh toán khi nhận hàng")}
            >
              <div className="d-flex align-items-center">
                <FaTruck className="me-2 payment-icon truck" />
                Thanh toán khi nhận hàng
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className={`payment-method ${
                selectedMethod === "Chuyển khoản ngân hàng qua mã QR"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleMethodChange("Chuyển khoản ngân hàng qua mã QR")
              }
            >
              <div className="d-flex align-items-center">
                <FaQrcode className="me-2 payment-icon qrcode" /> Chuyển khoản
                ngân hàng qua mã QR
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className={`payment-method ${
                selectedMethod === "VNPAY" ? "active" : ""
              }`}
              onClick={() => handleMethodChange("VNPAY")}
            >
              <div className="d-flex align-items-center">
                <FaCreditCard className="me-2 payment-icon credit-card" /> VNPAY
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className={`payment-method ${
                selectedMethod === "OnePay Qua thẻ Visa/Master/JCB/Napas"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleMethodChange("OnePay Qua thẻ Visa/Master/JCB/Napas")
              }
            >
              <div className="d-flex align-items-center">
                <FaMobileAlt className="me-2 payment-icon mobile" /> OnePay Qua
                thẻ Visa/Master/JCB/Napas
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className={`payment-method ${
                selectedMethod === "Ví MoMo" ? "active" : ""
              }`}
              onClick={() => handleMethodChange("Ví MoMo")}
            >
              <div className="d-flex align-items-center">
                <FaRegCreditCard className="me-2 payment-icon reg-credit-card" />
                Ví MoMo
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className={`payment-method ${
                selectedMethod === "Kredivo" ? "active" : ""
              }`}
              onClick={() => handleMethodChange("Kredivo")}
            >
              <div className="d-flex align-items-center">
                <FaMoneyCheckAlt className="me-2 payment-icon money-check" />
                Kredivo
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default CartPayment;
