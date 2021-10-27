import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@material-ui/core';

import Arrow from '../../images/angle-down.svg';

import './ReviewAccordian.css';

/* Documentation */
/*
  title: The "title"/text that will always be visible when the accordian is expanded or hidden
  content: The content that will be displayed when the accordian is expanded. The content should be a component or an
  array of components. e.g. For an "Accordian" used in the Shopping Cart page, the content is an array of "CartItem.js"
  components, i.e. content = [<CartItem itemName="Airpods"/>, <CartItem itemName="Macbook"/>, <CartItem itemName="iPhone" />]


*/

function ReviewAccordian({ title, content, writeFunc, sortFunc, loadFunc }) {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState();

  const refHeight = useRef();

  useEffect(() => {
    setHeight(`${refHeight.current.scrollHeight}px`);
  }, []);

  const toggleState = () => {
    setToggle(!toggle);
  };

  return (
    <div className='Accordian'>
      <button onClick={toggleState} className='Accordian-visible'>
        <span>{title}</span>
        <img className={toggle && 'active'} src={Arrow} />
      </button>
      <div
        className={toggle ? 'Accordian-toggle animated' : 'Accordian-toggle'}
        style={{ height: toggle ? `${height}` : '0px' }}
        ref={refHeight}
      >
        <div className='Accordian-buttons-top'>
					<Button
            onClick={() => {
              sortFunc();
            }}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              borderRadius: '16px',
              width: '200px',
              marginTop: '64px'
            }}
            size='large'
            variant='contained'
          >
            Sort reviews
          </Button>
          <Button
            onClick={() => {
              writeFunc();
            }}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              borderRadius: '16px',
              width: '200px',
              marginTop: '64px'
            }}
            size='large'
            variant='contained'
          >
            Write a review
          </Button>
        </div>
        <div className='Accordian-content' style={{ display: toggle===true ? 'block' : 'none' }}>{content}</div>
        <div>
          <Button
            onClick={() => {
              loadFunc();
            }}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              borderRadius: '16px',
              width: '400px',
              marginBottom: '30px'
            }}
            size='large'
            variant='contained'
          >
            Load more reviews...
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewAccordian;
