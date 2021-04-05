import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        <LinkContainer to="/login">
            {step1 ? (<Nav.Link>Sign in</Nav.Link>) : (<Nav.Link disabled>Sign in</Nav.Link>)}
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/Shipping">
            {step2 ? (<Nav.Link>Sipping</Nav.Link>) : (<Nav.Link disabled>Sipping</Nav.Link>)}
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/payment">
            {step3 ? (<Nav.Link>Payment Method</Nav.Link>) : (<Nav.Link disabled>Payment Method</Nav.Link>)}
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/placeorder">
            {step4 ? (<Nav.Link>Place order</Nav.Link>) : (<Nav.Link disabled>Order</Nav.Link>)}
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
