import React, { useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { orderDetailsAction, orderPayAction } from "../actions/orderAction";
import Loader from "../components/common/Loader";
import Message from "../components/common/Message";
import PayPalButton from "../components/PayPalButton";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match, history}) => {

  const orderId = match.params.orderId;
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successPay, loading: loadinPay } = useSelector(
    (state) => state.orderPay
  );
  console.log(successPay, loadinPay);
  const dispatch = useDispatch();
  const handleSuccessPayment = (details) => {
    dispatch(orderPayAction(orderId, details));
  };
  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(orderDetailsAction(orderId));
    }
  }, [dispatch, orderId, successPay, order, history, userInfo]);
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <h1>Order {order._id}</h1>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>User:</strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong>
                  {""}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment method</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="warning">Not paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message variant="warning">Your cart is empty</Message>
                ) : (
                  <ListGroup>
                    {order.orderItems.map((item, index) => {
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col>
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
                              {item.qty} * {item.price} ={" "}
                              {addDecimals(item.price * item.qty)}
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
            <h3>Order summary</h3>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={handleSuccessPayment}
                  />
                </ListGroup.Item>
              )}
              {order.user.isAdmin && (
                <ListGroup.Item className="text-center">
                  <Button
                    variant="secondary"
                    className="btn-block"
                    type="button"
                  >
                    Set as delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
