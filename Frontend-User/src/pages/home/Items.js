import React, { useEffect, useState } from "react";
import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";
import { Link } from "react-router-dom";
const cardTextStyle = {
  maxWidth: "80%",
};
const Items = (category) => {
  const { categoryName, categoryId } = category;
  const [products, setProducts] = useState([]);

  return (
    <section class="padding-bottom">
      <header class="section-heading mb-4 heading-line">
        <h3 class="title-section text-uppercase">{categoryName}</h3>
      </header>
      <div class="row">
        {products.length > 0 &&
          products.map((row) => (
            <div class="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
              <div class="card card-product-grid text-center">
                <Link to={`/Detail?productId=${row.id}`} class="img-wrap">
                  <img src={`./images/items/${row.thumbnail}`} />{" "}
                </Link>
                <figcaption class="info-wrap">
                  <ul class="rating-stars mb-1">
                    <li style={{ cardTextStyle }} class="stars-active">
                      <img src={startsActive} alt="" />
                    </li>
                    <li>
                      <img src={startsDisable} alt="" />
                    </li>
                  </ul>
                  <div>
                    <Link to={`/Detail?productId=${row.id}`} class="title">
                      {row.title}
                    </Link>
                  </div>
                  <div class="price h5 mt-2 kha">
                    {row.price}.000.000
                    <span class="small text-uppercase text-muted khai">
                      30.990.000
                    </span>
                  </div>
                </figcaption>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default Items;
