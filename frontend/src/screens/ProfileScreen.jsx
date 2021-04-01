import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import InputField from "../components/common/InputField";
import { userUpdateProfileAction } from './../actions/userAction';
import Message from '../components/common/Message'

const ProfileScreen = ({location, history}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {error, success} = useSelector(state => state.userUpdate)

  useEffect(() =>
  {
    if(!userLogin.userInfo){
      history.push('/')
    }
  })

  const handleSubmit =  (e) => {
      e.preventDefault()
      dispatch(userUpdateProfileAction({name, email, password, passwordConfirm}))
      setPassword('')
      setPasswordConfirm('')

  }
  return (
    <Row>
      <Col md={6}>
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
      <Col md={6}>
        <h3>Your Orders</h3>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
