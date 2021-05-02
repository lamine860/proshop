import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import InputField from "../components/common/InputField";
import { userUpdateProfileAction } from './../actions/userAction';
import Message from '../components/common/Message'
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/common/Loader";

const ProfileScreen = ({location, history}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {error, success} = useSelector(state => state.userUpdate)

  const handleSubmit =  (e) => {
      e.preventDefault()
      dispatch(userUpdateProfileAction({name, email, password, passwordConfirm}))
      setPassword('')
      setPasswordConfirm('')
  }

  useEffect(() =>
  {
    if(!userLogin.userInfo){
      history.push('/')
    }
  })

  return (
    <Row>
      <Col md={4}>
        <h3>Your Profile</h3>
        <Card>
          <Card.Header>
            <h5>Update your profile</h5>
          </Card.Header>
          <Card.Body>
            {error && <Message variant="danger">{ error.message}</Message>}
            {success && <Message variant="success">Profile updated successfull</Message>}
            <Form onSubmit={(e) => handleSubmit(e)}>
              <InputField
                value={name}
                label="Your name"
                name="name"
                placeholder="Enter your name"
                onChange={e => setName(e.target.value)}
              />
              <InputField
                value={email}
                type="email"
                label="Your email"
                name="email"
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
              />
              <InputField
                value={password}
                type="password"
                label="Your password"
                name="password"
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
              />
              <InputField
                type="password"
                value={passwordConfirm}
                label="Confirm your password"
                name="passwordConfirm"
                placeholder="Confirm password"
                onChange={e => setPasswordConfirm(e.target.value)}
              />
              <Button type="submit">Update</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
     <Col md={8}>
        <h2 className="text-center mb-4">My Orders</h2>
        {true ? (
          <Loader />
        ) : false ? (
          <Message variant='danger'>Test</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
