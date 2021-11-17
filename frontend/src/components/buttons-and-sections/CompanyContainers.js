import React from "react";
import PropTypes from "prop-types";

import { Paper } from "@material-ui/core";

import "./SmallItemContainer.css";

function CompanyContainers({ itemName, imageUrl, route }) {
  return (
    <div className="SmallItemContainer">
      <Paper
        elevation={3}
        style={{
          display: "flex",
          height: "150px",
          width: "150px",
          backgroundColor: "#E8E8E8",
        }}
      >
        <div className="SmallItemContainer-image-container">
          <a target="_blank" href={route}>
            <img
              className="SmallItemContainer-image"
              src={imageUrl}
              alt="Item Image"
            ></img>
          </a>
        </div>
      </Paper>
      <p style={{ fontSize: "13px", paddingTop: "8px" }}>{itemName}</p>
    </div>
  );
}

export default CompanyContainers;

CompanyContainers.propTypes = {
  itemName: PropTypes.string,
};
