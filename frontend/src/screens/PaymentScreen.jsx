import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { cartSavePaymentMethod } from "../actions/cartAction";

const PaymentScreen = ({history}) => {
  const {shippingAddress} = useSelector(state => state.cart)
  if(!shippingAddress.address){
      history.push('/shipping')
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState();
  const handlePaymentMethod = (e) => {
    e.preventDefault();
    dispatch(cartSavePaymentMethod(paymentMethod))
    history.push('/placeorder')
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <Row>
        <Col md="10">
          <Card>
            <Card.Header as="h3">Payment Method</Card.Header>
            <Card.Body>
              <Form onSubmit={handlePaymentMethod}>
                <Form.Label as="legend">Select payment method</Form.Label>
                <Col>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      label="Paypal or credit card"
                      name="paymentMethod"
                      value="paypal"
                      id="paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type="radio"
                      label="Stripe"
                      name="paymentMethod"
                      value="stripe"
                      id="stripe"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                  </Form.Group>
                  <Form.Group>
                    <Button type="submit">Continue</Button>
                  </Form.Group>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PaymentScreen;
