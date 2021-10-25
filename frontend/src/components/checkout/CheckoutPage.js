import React from 'react';
import CreditCardForm from './CreditCardForm';
import Button from '@material-ui/core/Button';

function CheckoutPage() {
  return (
    <div style={{ minHeight: '650px' }}>
      <CreditCardForm />
      <Button
        onClick={() => {
          console.log('add');
        }}
        type='submit'
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderRadius: '16px',
        }}
        variant='contained'
      >
        Purchase
      </Button>
    </div>
  );
}

export default CheckoutPage;
