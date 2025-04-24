import React, { useEffect, useState } from "react";
import Slider from "../pages/home/Slider";
import Deal from "../pages/home/Deal";
import Apparel from "../pages/home/Apparel";
import Electronics from "../pages/home/Electronics";
import Likenew from "../pages/home/likenew";
import Request from "../pages/home/Request";
import Item from "../pages/home/Items";
import Services from "../pages/home/Services";
import Region from "../pages/home/Region";
function Home() {
  const [categories, setCategories] = useState([]);

  const filteredCategories = categories.filter(
    (category) => category.isHome === 1
  );
  return (
    <div class="container">
      <Slider />
      <Deal />
      <Apparel />
      <Electronics />
      <Likenew />
      <Request />
      {filteredCategories.length > 0 &&
        filteredCategories.map((row) => (
          <Item categoryName={row.name} categoryId={row.id} />
        ))}
      <Services />
      <Region />
    </div>
  );
}
export default Home;
