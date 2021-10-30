import React from "react";
import CreditCardForm from "./CreditCardForm";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function CheckoutPage() {
  return (
    <div style={{ minHeight: "650px" }}>
      <CreditCardForm />
      <Link to={"/paymentComplete"}>
        <Button
          onClick={() => {
            console.log("add");
          }}
          type="submit"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            borderRadius: "16px",
          }}
          variant="contained"
        >
          Purchase
        </Button>
      </Link>
    </div>
  );
}

export default CheckoutPage;
