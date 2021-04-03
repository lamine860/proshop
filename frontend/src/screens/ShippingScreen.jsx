import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {useDispatch, useSelector } from 'react-redux'
import CheckoutStep from "../components/CheckoutStep";
import InputField from "../components/common/InputField";
import FormContainer from "./../components/FormContainer";
import { cartSaveShippingAddress } from './../actions/cartAction';


export const ShippingScreen = ({history}) => {
  const {shippingAddress} = useSelector(state => state.cart)
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch()

  const shippingHandler = (e) => {
      e.preventDefault()
    dispatch(cartSaveShippingAddress({address, city, country, postalCode}))
    history.push('/payment')
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <Card>
        <Card.Header as="h4">Shipping</Card.Header>
        <Card.Body>
          <Form onSubmit={shippingHandler}>
            <InputField
              value={address}
              placeholder="enter your address"
              label="Your adress"
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputField
              value={city}
              placeholder="Enter your city"
              label="Your city"
              onChange={(e) => setCity(e.target.value)}
            />
            <InputField
              value={country}
              placeholder="Enter your country"
              label="Your country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <InputField
              value={postalCode}
              placeholder="Enter your postal code"
              label="Your postal code"
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <Button type="submit">Continue</Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ShippingScreen;
