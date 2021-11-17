import React, { useState } from "react";
import CompanyContainers from "./CompanyContainers";

import "./AboutSection.css";

function AboutSection() {
  const [items, setItems] = useState([
    {
      id: 1,
      content: (
        <CompanyContainers
          itemName="Apple"
          imageUrl={require("../../images/brand-logos/Apple-Logo.png").default}
          route="http://www.apple.com"
        />
      ),
    },
    {
      id: 2,
      content: (
        <CompanyContainers
          itemName="Microsoft"
          imageUrl={
            require("../../images/brand-logos/Microsoft-Logo.png").default
          }
          route="https://www.microsoft.com/en-au/"
        />
      ),
    },
    {
      id: 3,
      content: (
        <CompanyContainers
          itemName="Google"
          imageUrl={require("../../images/brand-logos/Google-Logo.png").default}
          route="https://www.google.com/"
        />
      ),
    },
    {
      id: 4,
      content: (
        <CompanyContainers
          itemName="Samsung"
          imageUrl={
            require("../../images/brand-logos/Samsung-Logo.png").default
          }
          route="https://www.samsung.com/au/"
        />
      ),
    },
    {
      id: 5,
      content: (
        <CompanyContainers
          itemName="Sony"
          imageUrl={require("../../images/brand-logos/Sony-Logo.png").default}
          route="https://www.sony.com.au/"
        />
      ),
    },
    {
      id: 6,
      content: (
        <CompanyContainers
          itemName="Bose"
          imageUrl={require("../../images/brand-logos/Bose-Logo.png").default}
          route="https://www.bose.com.au/en_au/index.html"
        />
      ),
    },
    {
      id: 7,
      content: (
        <CompanyContainers
          itemName="HP"
          imageUrl={require("../../images/brand-logos/HP-Logo.png").default}
          route="https://www.hp.com/au-en/home.html"
        />
      ),
    },
    {
      id: 8,
      content: (
        <CompanyContainers
          itemName="LG"
          imageUrl={require("../../images/brand-logos/LG-Logo.png").default}
          route="https://www.lg.com/au"
        />
      ),
    },
    {
      id: 9,
      content: (
        <CompanyContainers
          itemName="Nintendo"
          imageUrl={
            require("../../images/brand-logos/Nintendo-Logo.png").default
          }
          route="https://www.nintendo.com.au/"
        />
      ),
    },
    {
      id: 10,
      content: (
        <CompanyContainers
          itemName="Razer"
          imageUrl={require("../../images/brand-logos/Razer-Logo.png").default}
          route="https://www.razer.com/"
        />
      ),
    },
  ]);

  return (
    <div className="AboutSection">
      <div className="AboutSection-information">
        <h2 style={{ fontSize: "24px" }}>EST. 2021</h2>
        <br></br>
        <p>
          <span style={{ color: "#FF7A00" }}>NOCTA TECHNOLOGY</span> is a brand
          dedicated to offering the highest quality technology software and
          hardware from a variety of partnered brands, including Apple,
          Microsoft, Google, Samsung, Sony, and more...
        </p>
      </div>
      <div className="AboutSection-brands-section">
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
}

export default AboutSection;
