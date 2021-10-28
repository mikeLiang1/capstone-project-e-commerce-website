import React, { useEffect } from 'react';

function ExplorePage({ match }) {
  const tag = match.params.tag;
  console.log(tag);

  async function getItems() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`/explore/${tag}`, requestOptions);
    if (res.status !== 200) {
      alert('Failed to fetch items!');
    } else if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    }
  }

  useEffect(() => {
    getItems();
  }, [tag]);

  return <div>explore</div>;
}

export default ExplorePage;
