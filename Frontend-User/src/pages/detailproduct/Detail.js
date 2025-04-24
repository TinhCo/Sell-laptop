import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../api/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Detail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (state.items[product.id]) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: { id: product.id } });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { id: product.id, product, quantity },
      });
    }
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/shoppingcart");
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  if (!product) {
    return <div>Đang tải thông tin sản phẩm...</div>;
  }

  return (
    <section>
      <section className="py-3 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/category/${product.categoryId}`}>
                detail
                {product.category && product.category.name}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.id}
            </li>
          </ol>
        </div>
      </section>
      <section className="section-content bg-white padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-md-6">
              <div className="card">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      <a href="#">
                        <img src={product.image} alt={product.name} />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-6">
              <article className="product-info-aside">
                <h2 className="title mt-3">{product.name}</h2>
                <div className="rating-wrap my-3">
                  <ul className="rating-stars">
                    <li className="stars-active">
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                  <small className="label-rating text-muted">132 reviews</small>
                  <small className="label-rating text-success">
                    <i className="fa fa-clipboard-check"></i> 154 orders{" "}
                  </small>
                </div>
                <div className="mb-3">
                  <var className="price h4 do">Deal: {product.price} đ</var>
                  <span className="text-muted khai">{product.presale} đ</span>
                </div>
                <dl className="row">
                  <dt className="col-sm-3">Nhà xản xuất:</dt>
                  <dd className="col-sm-9">
                    <a href="#">LapTop</a>
                  </dd>
                  <dt className="col-sm-3">Số lượng</dt>
                  <dd className="col-sm-9">{product.qty}</dd>
                  <dt className="col-sm-3">Bảo hành</dt>
                  <dd className="col-sm-9">1 năm</dd>
                  <dt className="col-sm-3">Thời gian giao hàng</dt>
                  <dd className="col-sm-9">3-4 ngày</dd>
                  <dt className="col-sm-3">Tình trạng:</dt>
                  <dd className="col-sm-9">Còn hàng</dd>
                </dl>
                <div className="form-row mt-4">
                  <div className="form-group mb-3 flex-grow-0">
                    <div className="input-group mb-3 input-spinner">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={decrementQuantity}
                        >
                          &minus;
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          value={quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={incrementQuantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md">
                    <button
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                    >
                      <i className="fas fa-shopping-cart"></i>
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
      <section className="section-name padding-y bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h5 className="title-description">Đặc Điểm Nổi Bật</h5>
              <p>
                Macbook 16 2023 sở hữu logo mới với thiết kế hoàn toàn khác biệt
                so với trước đây khi mặt A được thiết với hoàn toàn mới. Nitro
                16 2023 sở hữu thiết kế hoàn toàn mới với logo hình chữ N đổi
                màu theo góc nhìn và ánh sáng xung quanh, tạo nên những đường
                nét đa sắc đầy mê hoặc và thu hút. Ngoài ra, từng chi tiết của
                máy cũng được làm mới, tạo nên một diện mạo ấn tượng hơn, hiện
                đại hơn.
              </p>
              <p>
                Laptop Nitro 16 2023 cũng có sự nâng cấp đáng kể về chất lượng
                hiển thị. Màn hình WQXGA (2560 x 1600) với tần số quét lên đến
                165Hz giúp mọi hình ảnh trở nên sắc nét, mượt mà và chân thực
                hơn. Tỷ lệ màn hình 16:10 và độ sáng cao tới 500 nits là điểm
                nhấn, giúp việc sử dụng máy trở nên thuận tiện hơn cho các tác
                vụ từ làm việc, học tập đến giải trí.
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="title-description">Thêm Thông Tin</h5>
              <p>
                Với sự nâng cấp vượt trội về hiệu năng và thiết kế, Nitro 16
                2023 xứng đáng là sự lựa chọn hoàn hảo cho nhu cầu làm việc và
                giải trí. Đừng bỏ lỡ cơ hội sở hữu chiếc máy tính này với mức
                giá cực hấp dẫn chỉ có tại LapTop.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Detail;
