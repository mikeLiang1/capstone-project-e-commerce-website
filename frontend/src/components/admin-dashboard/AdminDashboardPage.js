import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Typography } from "@material-ui/core";

import "./AdminDashboardPage.css";
import BasicSelect from "../buttons-and-sections/BasicSelect.js";

function AdminDashboardPage() {
  // Total units sold and total revenue
  const [unitsSold, setUnitsSold] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // variables for dashboard sales data graph

  // raw data received from backend
  const [totalSales, setTotalSales] = useState({});
  // data to be presented on the x axis of the graph
  const [totalSalesLabels, setTotalSalesLabels] = useState([]);
  // data to be presented on the y axis of the graph
  const [totalSalesData, setTotalSalesData] = useState([]);
  // helper array to convert month
  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  // sales year to show on the graph; default is current year
  const [salesYear, setSalesYear] = useState(String(new Date().getFullYear()));
  // sales month to show on the graph; default is current month
  const [salesMonth, setSalesMonth] = useState(months[new Date().getMonth()]);
  // ranges of years that can be selected
  const [salesSelectYears, setSelectSalesYears] = useState([]);
  // ranges of months of the current sales year that can be selected
  const [salesSelectMonths, setSelectSalesMonths] = useState([]);
  // total revenue in sales year, sales month
  const [salesInRange, setSalesInRange] = useState(0);

  // get sales data from backend, set states
  async function getSales() {
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

      setUnitsSold(data.units_sold);
      setRevenue(data2.total_revenue);
      setTotalSales(data3.data);

      setTotalSalesLabels(Object.keys(data3.data[salesYear][salesMonth]));
      const values = Object.values(data3.data[salesYear][salesMonth]);
      setTotalSalesData(values);
      setSalesInRange(values.reduce((partialSum, a) => partialSum + a, 0));

      const sYears = ['All years'];
      const sMonths = ['All months'];
      Object.keys(data3.data).forEach(elem => {
        sYears.push(elem);
      });
      Object.keys(data3.data[salesYear]).forEach(elem => {
        sMonths.push(elem);
      });
      setSelectSalesYears(sYears);
      setSelectSalesMonths(sMonths);
    }
  }
  useEffect(() => {
    getSales();
  }, []);

  // change totalSalesLabels, totalSalesData, salesInRange according to the given year and month
  function adjustGraphData(y, m) {
    const sLabels = [];
    const sData = [];

    // All years & no specific month chosen
    // Sum up sales from each year
    if (y == 'All years') {
      Object.keys(totalSales).forEach(yr => {
        var sum = 0;
        Object.keys(totalSales[yr]).forEach(mnth => {
          Object.keys(totalSales[yr][mnth]).forEach(day => {
            sum += totalSales[yr][mnth][day];
          });
        });
        sLabels.push(yr);
        sData.push(sum);
      });
    }
    // Specific year chosen & all months
    // Sum up sales from each month, from specific year
    else if (y != 'All years' && m == 'All months') {
      Object.keys(totalSales[y]).forEach(mnth => {
        var sum = 0;
        Object.keys(totalSales[y][mnth]).forEach(day => {
          sum += totalSales[y][mnth][day];
        });
        sLabels.push(mnth);
        sData.push(sum);
      });
    }
    // Specific year & month chosen
    // Sum up sales from each day, from specific month & year
    else {
      Object.keys(totalSales[y][m]).forEach(day => {
        sLabels.push(day);
        sData.push(totalSales[y][m][day]);
      });
    }
    setTotalSalesLabels(sLabels);
    setTotalSalesData(sData);
    setSalesInRange(sData.reduce((partialSum, a) => partialSum + a, 0));
  }

  // If sales year changes, call adjustGraphData function and set extra states
  const changeSalesYear = (e) => {
    // Chose all years
    if (e.target.value == 'All years') {
      // empty the months array
      setSelectSalesMonths(['--']);
      setSalesYear('All years');
      setSalesMonth('--');
      adjustGraphData('All years', '--');
    }
    // Chose specific year
    else {
      const sMonths = ['All months'];
      Object.keys(totalSales[e.target.value]).forEach(elem => {
        sMonths.push(elem);
      });
      setSelectSalesMonths(sMonths);
      setSalesYear(e.target.value);
      setSalesMonth('All months');
      adjustGraphData(e.target.value, 'All months');
    }
  };

  // If sales month changes, call adjustGraphData function and set extra states
  const changeSalesMonth = (e) => {
    if (e.target.value == 'All months') {
      setSalesMonth('All months');
      adjustGraphData(salesYear, 'All months');
    }
    else if (e.target.value == '--') {
      // Do nothing
    }
    else {
      setSalesMonth(e.target.value);
      adjustGraphData(salesYear, e.target.value);
    }
  };

  return (
    <div id="AdminDashboardPage-flexbox">
      <div className="AdminDashboardPage-top">
        <Typography variant='h6'>Administrator Dashboard</Typography>
      </div>
      <div className="AdminDashboardPage-sales-report">
        <Typography style={{ marginBottom: '10px' }}>Total Sales Report: {salesYear}, {salesMonth}</Typography>
        <Typography style={{ marginBottom: '30px' }}>Revenue in Range: ${salesInRange}</Typography>
        <div className="AdminDashboardPage-sales-dropdown">
          <BasicSelect
            name='Year'
            list={salesSelectYears}
            selected={salesYear}
            handleChange={changeSalesYear}
          />
          <BasicSelect
            name='Month'
            list={salesSelectMonths}
            selected={salesMonth}
            handleChange={changeSalesMonth}
          />
        </div>
        <Line
          data={{
            labels: totalSalesLabels,
            datasets: [{
              label: 'Sales',
              data: totalSalesData,
              borderColor: 'rgb(0, 0, 0)'
            }]
          }}
          width={500}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              }
            }
          }}
        />
        <div className="AdminDashboardPage-sales-text">
          <Typography>Total Units Sold: {unitsSold}</Typography>
          <Typography>Total Revenue: ${revenue}</Typography>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
