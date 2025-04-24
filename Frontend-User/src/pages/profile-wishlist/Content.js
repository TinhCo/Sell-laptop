import React from "react";

const Content = () => (
  <section class="section-content padding-y">
    <div class="container">
      <div class="row">
        <aside class="col-md-3">
          <nav class="list-group">
            <a className="list-group-item " href="profilemain">
              {" "}
              Tổng quan về tai khoản{" "}
            </a>
            <a className="list-group-item" href="profileaddress">
              {" "}
              Địa chỉ của tôi{" "}
            </a>
            <a className="list-group-item " href="cart-payment">
              Đơn đặt hàng của tôi
            </a>
            <a className="list-group-item active" href="profilemain">
              {" "}
              Sản phẩm yêu thích{" "}
            </a>
            <a className="list-group-item" href="profilesell">
              {" "}
              Mặt hàng bán của tôi{" "}
            </a>
            <a className="list-group-item" href="profilesetting">
              {" "}
              Cài đặt{" "}
            </a>
            <a class="list-group-item" href="page-index-1.html">
              {" "}
              Đăn xuất{" "}
            </a>
          </nav>
        </aside>
        <main class="col-md-9">
          <article class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <figure class="itemside mb-4">
                    <div class="aside">
                      <img
                        src={require("../../assets/images/items/ln1.jpg")}
                        class="border img-md"
                      />
                    </div>
                    <figcaption class="info">
                      <a href="#" class="title">
                        Great product name goes here
                      </a>
                      <p class="price mb-2">$80</p>
                      <a href="#" class="btn btn-secondary btn-sm">
                        Add to cart{" "}
                      </a>
                      <a
                        href="#"
                        class="btn btn-danger btn-sm"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Remove from wishlist"
                      >
                        {" "}
                        <i class="fa fa-times"></i>{" "}
                      </a>
                    </figcaption>
                  </figure>
                </div>

                <div class="col-md-6">
                  <figure class="itemside mb-4">
                    <div class="aside">
                      <img
                        src={require("../../assets/images/items/ln2.jpg")}
                        class="border img-md"
                      />
                    </div>
                    <figcaption class="info">
                      <a href="#" class="title">
                        Men's Jackeet for Winter{" "}
                      </a>
                      <p class="price mb-2">$1280</p>
                      <a href="#" class="btn btn-secondary btn-sm">
                        {" "}
                        Add to cart{" "}
                      </a>
                      <a
                        href="#"
                        class="btn btn-danger btn-sm"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Remove from wishlist"
                      >
                        {" "}
                        <i class="fa fa-times"></i>{" "}
                      </a>
                    </figcaption>
                  </figure>
                </div>

                <div class="col-md-6">
                  <figure class="itemside mb-4">
                    <div class="aside">
                      <img
                        src={require("../../assets/images/items/ln3.jpg")}
                        class="border img-md"
                      />
                    </div>
                    <figcaption class="info">
                      <a href="#" class="title">
                        Another book of item goes here{" "}
                      </a>
                      <p class="price mb-2">$280</p>
                      <a href="#" class="btn btn-secondary btn-sm">
                        {" "}
                        Add to cart{" "}
                      </a>
                      <a
                        href="#"
                        class="btn btn-danger btn-sm"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Remove from wishlist"
                      >
                        {" "}
                        <i class="fa fa-times"></i>{" "}
                      </a>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  </section>
);

export default Content;
