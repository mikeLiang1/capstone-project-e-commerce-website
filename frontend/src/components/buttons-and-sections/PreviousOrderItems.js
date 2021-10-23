import React from "react";

import { Link } from "react-router-dom";

import { Card, IconButton } from "@material-ui/core";

import "./PreviousOrderItems.css";

function PreviousOrders({
  itemName,
  itemPrice,
  imageUrl,
  itemQuantity,
  productRouteId,
}) {
  return (
    <div className="POItem">
      <Card
        className="CartItem-card"
        elevation={3}
        style={{
          maxWidth: "1600px",
          minWidth: "800px",
          minHeight: "300px",
          margin: "32px 0",
          padding: "16px 16px",
        }}
      >
        <div className="CartItem-image">
          <Link to={`/product/${productRouteId}`}>
            <img
              className="LargeItemContainer-image"
              src={imageUrl}
              alt="Item Image"
              style={{ width: "175px" }}
            ></img>
          </Link>
        </div>
        <div className="CartItem-information">
          <p style={{ fontSize: "16px", fontWeight: "700" }}>Order Placed</p>
          <p>{itemName}</p>
        </div>
        <div className="CartItem-quantity">
          <div> Quantity </div>
          <div className="CartItem-quantity-display">{itemQuantity}</div>
        </div>
        <div className="CartItem-price">${itemPrice}</div>
      </Card>
    </div>
  );
}

export default PreviousOrders;
