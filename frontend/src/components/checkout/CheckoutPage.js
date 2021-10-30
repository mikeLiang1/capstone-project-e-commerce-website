import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import CreditCardForm from "./CreditCardForm";
import Button from "@material-ui/core/Button";
import TextButton from "../buttons-and-sections/TextButton";
import { Link } from "react-router-dom";

import Tick from "../../images/Tick.png";

import "./CheckoutPage.css";

function CheckoutPage() {
  const [open, setOpen] = useState("box closed");
  const [dialogOpen, setDialog] = useState(false);

  function handleClick() {
    setOpen("box open");
    setDialog(true);
  }

  return (
    <div style={{ minHeight: "650px" }}>
      <CreditCardForm />
      <Button
        onClick={() => {
          handleClick();
        }}
        class={open}
        type="button"
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          borderRadius: "16px",
        }}
        variant="contained"
      >
        Purchase
      </Button>
      <Dialog
        open={dialogOpen}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="checkoutContent">
          <img height="50px" width="50px" src={Tick} />
          <p style={{ paddingTop: "20px" }}>Hey Colin Hon,</p>

          <p style={{ fontWeight: 700, fontSize: "20px" }}>
            Your order is confirmed!
          </p>
          <DialogActions
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link to="/previousorders" className="checkout-link">
              <TextButton buttonName="View Orders"></TextButton>
            </Link>
            <Link to="/" className="checkout-link">
              <TextButton buttonName="Continue Shopping"></TextButton>
            </Link>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default CheckoutPage;
