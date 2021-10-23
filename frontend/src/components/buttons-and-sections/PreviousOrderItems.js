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
  deliveryInfo,
  orderPlaced,
}) {
  return (
    <div className="POItem">
      <Card
        className="PreviousItem-card"
        elevation={3}
        style={{
          maxWidth: "1600px",
          minWidth: "800px",
          minHeight: "300px",
          margin: "32px 0",
          padding: "16px 16px",
        }}
      >
        <div className="PreviousItem-image">
          <div className="OrderPlaced">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              Order Placed
            </p>
            <p style={{ marginBottom: "20px" }}>{orderPlaced}</p>
          </div>
          <Link to={`/product/${productRouteId}`}>
            <img
              className="LargeItemContainer-image"
              src={imageUrl}
              alt="Item Image"
              style={{ width: "175px" }}
            ></img>
          </Link>
        </div>
        <div className="PreviousItem-information">
          <div className="deliveryInfo">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              Delivery Info
            </p>
            <p>{deliveryInfo}</p>
          </div>
          <p style={{ paddingTop: "45px" }}>{itemName}</p>
        </div>
        <div className="PreviousItem-quantity">
          <p style={{ fontSize: "16px", fontWeight: "700" }}>Quantity</p>
          <div className="PreviousItem-quantity-display">{itemQuantity}</div>
        </div>

        <div className="PreviousItem-price">
          <p style={{ fontSize: "16px", fontWeight: "700" }}>Total</p>
          <div style={{ fontSize: "16px", fontWeight: "450" }}>
            ${itemPrice * itemQuantity}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PreviousOrders;
