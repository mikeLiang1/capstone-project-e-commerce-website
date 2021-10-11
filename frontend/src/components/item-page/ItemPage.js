import React, { useEffect } from 'react';

function ItemPage() {
  // pass in item id
  const productId = 'aChvKCMFhjFLyJ32153r';

  async function getItemData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(
      `http://localhost:5000/product/${productId}`,
      requestOptions
    );
    console.log(res);
  }

  useEffect(() => {
    getItemData();
  }, []);

  return <div>ItemPage</div>;
}

export default ItemPage;
