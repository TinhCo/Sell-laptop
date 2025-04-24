import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../pages/detailproduct/Detail";
import Subscribe from "../pages/detailproduct/Subscribe";

function DetailProduct() {
  let { id } = useParams();

  return (
    <div className="container">
      <Detail productId={id} />
      <Subscribe />
    </div>
  );
}

export default DetailProduct;
