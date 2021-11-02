import React, { useState, useEffect } from "react";
import LargeItemContainer from "./LargeItemContainer";

import "./RecommendedSection.css";

function ProductRecommended({ productID }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(
      `/recommended_product/${productID}`,
      requestOptions
    );

    if (response.status !== 200) {
      alert("Login to get Recommended products!");
    } else if (response.status === 200) {
      const data = await response.json();
      let items = [];
      for (var i = 0; i < data.recommended_items.length; i++) {
        items.push({
          name: data.recommended_items[i].content.name,
          image: data.recommended_items[i].content.image,
          routeId: data.recommended_items[i].id,
        });
      }
      setProducts(items);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="RecommendedSection">
      <div className="RecommendedSection-information">
        <h2 style={{ fontSize: "24px" }}>RECOMMENDED</h2>
      </div>
      <div className="RecommendedSection-products-section">
        {products.map((item, id) => (
          <div key={id}>
            <LargeItemContainer
              itemName={item.name}
              imageUrl={item.image}
              productRouteId={item.routeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRecommended;
