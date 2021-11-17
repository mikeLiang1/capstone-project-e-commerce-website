import React, { useState } from 'react';
import useForm from '../../useForm';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreditCardForm.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const CreditCardForm = ({ setCardValid }) => {
  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
  function checkCard() {
    if (errors.variant === 'danger') {
      setCardValid(false);
    }
    if (errors.variant === 'success') {
      setCardValid(true);
    }
  }
  return (
    <div className='container'>
      <div className='box justify-content-center align-items-center'>
        <div className='formDiv'>
          <div className='creditCard'>
            <Cards
              cvc={values.cardSecurityCode}
              expiry={values.cardExpiration}
              focused={values.focus}
              name={values.cardName}
              number={values.cardNumber}
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type='number'
                id='cardNumber'
                data-testid='cardNumber'
                name='cardNumber'
                placeholder='Card Number'
                value={values.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cnumber}
                style={{ margin: '8px 0' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='text'
                id='cardName'
                data-testid='cardName'
                name='cardName'
                placeholder='Cardholder Name'
                value={values.cardName}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cname}
                style={{ margin: '8px 0' }}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='number'
                    id='cardSecurityCode'
                    data-testid='cardSecurityCode'
                    name='cardSecurityCode'
                    placeholder='Security Code'
                    value={values.cardSecurityCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ccvv}
                    style={{ marginBottom: '8px' }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='text'
                    id='cardExpiration'
                    data-testid='cardExpiration'
                    name='cardExpiration'
                    placeholder='Expiration Date'
                    value={values.cardExpiration}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cexp}
                    style={{ marginBottom: '8px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              onClick={checkCard}
              size={'block'}
              data-testid='validateButton'
              id='validateButton'
              type='submit'
              style={{
                backgroundColor: '#000000',
                border: 'none',
                borderRadius: '16px',
                fontSize: '16px',
              }}
            >
              Validate
            </Button>
          </Form>
        </div>
        <Alert
          id='alertMessage'
          data-testid='alertMessage'
          variant={errors.variant}
          show={errors.show}
        >
          {errors.message}
        </Alert>{' '}
      </div>
    </div>
  );
};

export default CreditCardForm;
