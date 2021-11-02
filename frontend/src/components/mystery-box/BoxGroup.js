import React, { useState, useEffect } from "react";

import TextButton from "../buttons-and-sections/TextButton";
import { Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import SmallItemContainer from "../buttons-and-sections/SmallItemContainer";
import { Link } from "react-router-dom";

import "./MysteryBoxPage.css";


function BoxGroup({ boxName }) {
  // Dummy data
  let title = boxName.toUpperCase();
  title = title.replace("_", " MYSTERY ");
  const [price, setPrice] = useState("999.99");
  const [img, setIMG] = useState("");
  const [ID, setID] = useState("")
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

      // Parse products
      let products = [];
      for (var ID of Object.keys(data.box_data.Products)) {
        const chance = data.box_data.Products[ID];
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
  
  // Add Item to the User's Cart
  const addTocart = async () => {
    console.log("CLICKED?")
    // const uid = Cookies.get('user');
    // const productId = match.params.itemId;
    // const productQuantity = quantity;
    const addToCartBody = {
      uid: Cookies.get('user'),
      productId: boxName,
      productQuantity: 1,
      productImage: img,
      productName: title,
      productPrice: price,
    };
    console.log(addToCartBody);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(addToCartBody),
    };

    const response = await fetch('/cart', requestOptions);
    if (response.status != 200) {
      alert('Failed to add to cart!');
    } else if (response.status === 200) {
      const data = await response.json();
      // TODO: Implement "Succefully Added to Cart" Pop-up
      alert('Added to Cart!');
    }
  };

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
        <TextButton
          handleClick={addTocart}
          buttonName="Add to Cart"
        >
          Add to cart
        </TextButton>
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
