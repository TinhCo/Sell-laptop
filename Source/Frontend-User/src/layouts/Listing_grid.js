import React from "react";
import Section_contend from "../pages/Listing_grid/Section_contend";
import Subscribe from "../pages/detailproduct/Subscribe";
import { useLocation } from "react-router-dom";

function Listing_grid(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = parseInt(searchParams.get("categoryId"), 10);

  return (
    <div className="container">
      <Section_contend categoryId={categoryId} />
      <Subscribe />
    </div>
  );
}

export default Listing_grid;
