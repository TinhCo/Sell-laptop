import React, { useEffect } from "react";
import { useCart } from "../../api/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const cleanPrice = (price) => {
    if (typeof price === "number") {
      return price;
    }
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.-]+/g, ""));
    }
    console.error("Price is not a string or number:", price);
    return 0;
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const handleIncrement = (id) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
  };

  const handleDecrement = (id) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
  };

  const totalPrice = Object.values(state.items).reduce((total, item) => {
    const itemPrice =
      typeof item.product.price === "string"
        ? cleanPrice(item.product.price)
        : item.product.price;
    return total + item.quantity * itemPrice;
  }, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const completePurchase = () => {
    const orderItems = Object.values(state.items).map((item) => {
      const price = item.product.price;
      const cleanedPrice = cleanPrice(price);
      return {
        productId: item.product.id,
        quantity: item.quantity,
        price: cleanedPrice,
      };
    });

   
    dispatch({ type: "CLEAR_CART" });

    toast.success("Thông tin của bạn!");
    navigate("/payment");
  };

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
      }
    };

    checkUserLoggedIn();
  }, [navigate]);

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <main className="col-md-9">
            <div className="card">
              <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">
                  <tr className="small text-uppercase">
                    <th scope="col">Sản phẩm</th>
                    <th scope="col" width="120">
                      Số lượng
                    </th>
                    <th scope="col" width="120">
                      Giá
                    </th>
                    <th scope="col" className="text-right" width="200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(state.items).map((item, index) => (
                    <tr key={index}>
                      <td>
                        <figure className="itemside">
                          <div className="aside">
                            <img
                              src={item.product.image}
                              className="img-sm"
                              alt="product"
                            />
                          </div>
                          <figcaption className="info">
                            <a href="#" className="title text-dark">
                              {item.product.name}
                            </a>
                            <p className="text-muted small">
                              Price:{" "}
                              {cleanPrice(item.product.price).toLocaleString()}₫
                            </p>
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            onClick={() => handleDecrement(item.product.id)}
                            className="btn btn-sm btn-light mr-2"
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => handleIncrement(item.product.id)}
                            className="btn btn-sm btn-light ml-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {(
                          cleanPrice(item.product.price) * item.quantity
                        ).toLocaleString()}
                        ₫
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="btn btn-light"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="card-body border-top">
                <button
                  onClick={completePurchase}
                  className="btn btn-primary float-md-right"
                >
                  Mua hàng <i className="fa fa-chevron-right"></i>
                </button>
                <a href="/ListingGrid" className="btn btn-light">
                  {" "}
                  <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm{" "}
                </a>
              </div>
            </div>

            <div className="alert alert-success mt-3">
              <p className="icontext">
                <i className="icon text-success fa fa-truck"></i> Giao hàng miễn
                phí trong vòng 1-2 tuần
              </p>
            </div>
          </main>
          <aside className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Có phiếu giảm giá?</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        placeholder="Mã giảm giá"
                      />
                      <span className="input-group-append">
                        <button className="btn btn-primary">Áp dụng</button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Tổng giá:</dt>
                  <dd className="text-right">{totalPrice.toLocaleString()}₫</dd>
                </dl>
                <p className="text-center mb-3">
                  <img
                    src={require("../../assets/images/misc/payments.png")}
                    height="26"
                    alt="Payment methods"
                  />
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Content;
