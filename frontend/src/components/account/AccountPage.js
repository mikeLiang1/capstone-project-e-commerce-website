import React from "react";
import { Link } from "react-router-dom";

import "./AccountPage.css";

import TextButton from "../buttons-and-sections/TextButton";
import RecommendMeProductsSection from "../buttons-and-sections/RecommendMeProductsSection";
import RecommendedSection from "../buttons-and-sections/RecommendedSection";

function AccountPage() {
  const options = ['one', 'two', 'three'];
  const defaultOption = options[0];
  return (
    <div className="AccountPage">
      <h2 style={{ fontSize: "24px" }}>MY ACCOUNT</h2>
      <Link to="/previousorders" className="AccountPage-link">
        <TextButton buttonName="Previous Orders" buttonType="button" />
      </Link>
      <Link to="/accountdetails" className="AccountPage-link">
        <TextButton buttonName="Account Details" buttonType="button" />
      </Link>
      <RecommendMeProductsSection />
      <div className="AccountPage-recommended">
        <RecommendedSection />
      </div>
      ;
    </div>
  );
}

export default AccountPage;
