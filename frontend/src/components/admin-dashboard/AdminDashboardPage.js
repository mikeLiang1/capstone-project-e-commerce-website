import TextButton from "../buttons-and-sections/TextButton.js";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Typography } from "@material-ui/core";

import "./AdminDashboardPage.css";

function AdminDashboardPage() {
  const [units_sold, set_units_sold] = useState(0);
  const [revenue, set_revenue] = useState(0);
  const [total_sales, set_total_sales] = useState({});

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
    const response3 = await fetch("/total_sales", requestOptions);

    if (response.status !== 200) {
      console.log("Not Successful");
    } else {
      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      set_units_sold(data.units_sold);
      set_revenue(data2.total_revenue);
      set_total_sales(data3.data);
    }
  }
  useEffect(() => {
    letsGo();
  }, []);

  return (
    <div id="AdminDashboardPage-flexbox">
      <div className="AdminDashboardPage-top">
        <Typography variant='h6'>Administrator Dashboard</Typography>
      </div>
      <div className="AdminDashboardPage-box">
        <Link to="/addproduct" style={{ textDecoration: "none" }}>
          <TextButton buttonName="Add Product" buttonType="button" />
        </Link>
      </div>
      <div className="AdminDashboardPage-sales-report">
        <Typography style={{ marginBottom: '30px' }}>Total Sales Report</Typography>
        <Line
          data={{
            labels: Object.keys(total_sales),
            datasets: [{
              label: 'Sales',
              data: Object.values(total_sales),
              borderColor: 'rgb(0, 0, 0)'
            }]
          }}
          width={500}
        />
        <div className="AdminDashboardPage-sales-text">
          <Typography>Total Units Sold: {units_sold}</Typography>
          <Typography>Total Revenue: ${revenue}</Typography>
        </div>
      </div>
      
      <div className="AdminDashboardPage-box">Recent Reviews</div>
    </div>
  );
}

export default AdminDashboardPage;
