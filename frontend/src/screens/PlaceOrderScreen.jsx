import React from "react";
import { useSelector } from "react-redux";
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";
import CheckoutStep from "../components/CheckoutStep";
import Message from "../components/common/Message";
import { Link } from "react-router-dom";

const PlaceOrderScreen = ({history}) => {
  let error = null;
  const cart = useSelector((state) => state.cart);
  
  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = addDecimals(cart.itemsPrice * 0.15);
  cart.totalPrice = addDecimals(
    +cart.itemsPrice + +cart.shippingPrice + +cart.taxPrice
  );
  return (
    <div>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md="8">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                ,
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col>
                            {item.price} * {item.qty} = (
                            {(item.price * item.qty).toFixed(2)})
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Items</Col>
                <Col>{cart.itemsPrice}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Shipping</Col>
                <Col>{cart.shippingPrice}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Tax</Col>
                <Col>{cart.taxPrice}</Col>
              </ListGroup.Item>
              {error && (<ListGroup.Item>
                  <Message variant="danger">{error }</Message>
              </ListGroup.Item>)}
              <ListGroup.Item>
                <Col>Total</Col>
                <Col>{cart.totalPrice}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" disabled={cart.cartItems.length === 0} type="button">Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
