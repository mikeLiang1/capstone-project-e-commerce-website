import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./AccountPage.css";

import PreviousOrderitem from "../buttons-and-sections/PreviousOrderItems.js";

function PreviousOrders() {
  const [previousItems, setPreviousItems] = useState([]);

  const getPurchaseHistory = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(
      `/purchase_history/${Cookies.get("user")}`,
      requestOptions
    );
    if (response.status != 200) {
      alert("Failed to get Purchase_history!");
    } else if (response.status === 200) {
      const data = await response.json();
      let items = [];
      data.purchase_history.sort(function (a, b) {
        let rev_a = a.orderPlaced;
        let rev_b = b.orderPlaced;
        var d1 = Date.parse(rev_a);
        var d2 = Date.parse(rev_b);
        if (d1 > d2) return -1;
        if (d2 > d1) return 1;
        return 0;
      });
      for (var i = 0; i < data.purchase_history.length; i++) {
        items.push({
          id: data.purchase_history[i].product,
          content: (
            <PreviousOrderitem
              itemName={data.purchase_history[i].name}
              imageUrl={data.purchase_history[i].image}
              itemQuantity={data.purchase_history[i].quantity}
              itemPrice={data.purchase_history[i].price}
              productRouteId={data.purchase_history[i].product}
              deliveryInfo={data.purchase_history[i].deliveryInfo}
              orderPlaced={data.purchase_history[i].orderPlaced}
            />
          ),
        });
      }
      setPreviousItems(items);
    }
  };

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  return (
    <div className="CartPage">
      <h2 style={{ fontSize: "24px" }}>MY ORDERS</h2>
      {previousItems.map((item) => (
        <div>{item.content}</div>
      ))}
    </div>
  );
}

export default PreviousOrders;
