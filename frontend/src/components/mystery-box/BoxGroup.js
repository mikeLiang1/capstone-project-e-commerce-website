import React, { useState, useEffect } from "react";

import TextButton from "../buttons-and-sections/TextButton";

import { Link } from "react-router-dom";

import "./MysteryBoxPage.css";
import SmallItemContainer from "../buttons-and-sections/SmallItemContainer";

function BoxGroup({ boxName }) {
  // Dummy data
  let title = boxName.toUpperCase();
  title = title.replace("_", " MYSTERY ");
  const [price, setPrice] = useState("999.99");
  const [img, setIMG] = useState("");
  const [products, setProducts] = useState([
    {
      itemName: "",
      imageUrl: "",
      price: "99.99",
      routeId: "",
      chance: 20,
      background: "rgba(36, 62, 206, 0.6)",
    },
    {
      itemName: "",
      imageUrl: "",
      price: "99.99",
      routeId: "",
      chance: 20,
      background: "rgba(36, 62, 206, 0.6)",
    },
    {
      itemName: "",
      imageUrl: "",
      price: "99.99",
      routeId: "",
      chance: 20,
      background: "rgba(36, 62, 206, 0.6)",
    },
    {
      itemName: "",
      imageUrl: "",
      price: "99.99",
      routeId: "",
      chance: 20,
      background: "rgba(36, 62, 206, 0.6)",
    },
    {
      itemName: "",
      imageUrl: "",
      price: "99.99",
      routeId: "",
      chance: 20,
      background: "rgba(36, 62, 206, 0.6)",
    },
  ]);

  // Function calls to the backend to retrieve name, price, image, and product ids
  async function boxRequest() {
    // Send request to the backend
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch("/mystery_box/" + boxName, requestOptions);

    if (response.status !== 200) {
      console.log("Not Successful");
    } else {
      const data = await response.json();
      console.log("Successful");
      console.log(data.box_data);
      setPrice(data.box_data.Price);
      setIMG(data.box_data.Image);

      if (boxName === "standard_box") {
        console.log(img);
      }

      // Parse products

      console.log("PRINTING FOR " + boxName);
      let products = [];
      for (var ID of Object.keys(data.box_data.Products)) {
        const chance = data.box_data.Products[ID];
        console.log(`chance is ${chance}`);
        const productOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const productResponse = await fetch(`/product/${ID}`, productOptions);

        const productData = await productResponse.json();

        let background = "rgba(36, 62, 206, 0.6)";
        if (chance < 10) {
          background = "gold";
        } else if (chance < 30) {
          background = "purple";
        } else if (chance < 50) {
          background = "red";
        }

        products.push({
          itemName: productData.data.name,
          imageUrl: productData.data.image,
          price: productData.data.price,
          chance: chance,
          routeId: ID,
          background: background,
        });
        console.log(productData.data);
      }

      function compare(a, b) {
        if (a.chance < b.chance) {
          return -1;
        }
        if (a.chance < b.chance) {
          return 1;
        }

        return 0;
      }

      products.sort(compare);
      setProducts(products);
    }
  }

  useEffect(() => {
    boxRequest();
  }, []);

  // Need to route add to cart with product id

  return (
    <div className="boxGroup">
      <div className="centered">
        <div className="outline">
          <b className>{title}</b>
          <br />
          <b>${price}</b>
        </div>
        <img height="200" width="200" src={img} />
        <Link
          to={"/mysterybox/open/" + boxName}
          style={{ textDecoration: "none" }}
        >
          <TextButton buttonName="Add to cart" buttonType="submit" />
        </Link>
      </div>
      <div className="boxContents">
        Prize Pool:
        <div style={{ display: "flex", overflow: "auto" }}>
          {products.map((item, id) => (
            <div className="outline">
              <div className="container">
                <SmallItemContainer
                  key={id}
                  itemName={item.itemName}
                  imageUrl={item.imageUrl}
                  productRouteId={item.routeId}
                ></SmallItemContainer>
                <Link to={"/product/" + item.routeId}>
                  <div
                    className="chance"
                    style={{ background: item.background }}
                  >
                    <p>{item.chance}%</p>
                  </div>
                </Link>
              </div>
              <b>RRP: ${item.price}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoxGroup;
