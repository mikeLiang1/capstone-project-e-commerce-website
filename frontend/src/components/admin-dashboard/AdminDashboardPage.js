import TextButton from "../buttons-and-sections/TextButton.js";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./AdminDashboardPage.css";

function AdminDashboardPage() {
  const [units_sold, set_units_sold] = useState(0);
  const [revenue, set_revenue] = useState(0);

  async function letsGo() {
    // Send request to the backend
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch("/units_sold", requestOptions);
    const response2 = await fetch("/total_revenue", requestOptions);

    if (response.status !== 200) {
      console.log("Not Successful");
    } else {
      const data = await response.json();
      const data2 = await response2.json();
      set_units_sold(data.units_sold);
      set_revenue(data2.total_revenue);
    }
  }
  useEffect(() => {
    letsGo();
  }, []);

  return (
    <div id="AdminDashboardPage-flexbox">
      <div className="AdminDashboardPage-box">
        <Link to="/addproduct" style={{ textDecoration: "none" }}>
          <TextButton buttonName="Add Product" buttonType="button" />
        </Link>
      </div>
      <div className="AdminDashboardPage-box">Total Units Sold</div>
      <div> {units_sold} </div>
      <div className="AdminDashboardPage-box">Total Revenue</div>
      <div> ${revenue} </div>
      <div className="AdminDashboardPage-box">Recent Reviews</div>
    </div>
  );
}

export default AdminDashboardPage;
