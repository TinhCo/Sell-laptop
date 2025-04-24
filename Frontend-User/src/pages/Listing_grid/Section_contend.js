import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Section_contend = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `http://localhost:8081/product/${
        categoryId ? `category/${categoryId}` : "all"
      }`;

      try {
        const response = await axios.get(url);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching products: ${error}`);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const renderProducts = () => {
    const offset = pageNumber * productsPerPage;
    const currentPageProducts = products.slice(
      offset,
      offset + productsPerPage
    );

    return currentPageProducts.map((product) => (
      <div className="col-md-3" key={product.id}>
        <figure className="card card-product-grid">
          <Link to={`/detail/${product.id}`} className="img-wrap">
            <span className="badge badge-danger">NEW</span>
            <img src={product.image} alt={product.name} />
          </Link>
          <figcaption className="info-wrap">
            <Link to={`/detail/${product.id}`} className="title mb-2">
              {product.name}
            </Link>
            <div className="price-wrap">
              <span className="price">{product.price}</span>
              <small className="text-muted">/ per item</small>
            </div>
          </figcaption>
        </figure>
      </div>
    ));
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">{renderProducts()}</div>
        <nav className="d-flex justify-content-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
          />
        </nav>
      </div>
    </section>
  );
};

export default Section_contend;
