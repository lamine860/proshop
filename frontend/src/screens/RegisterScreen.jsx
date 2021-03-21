import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { Card, Form, Button } from "react-bootstrap";

import {userRegisterAction} from '../actions/userAction'

const RegisterScreen = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(userRegisterAction({name, email, password}))

  }
  return (
    <Card className="card-body">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="name" >
          <Form.Label id="name">Name</Form.Label>
          <Form.Control type="text"  placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)} value={password} />
        </Form.Group>

        <Form.Group controlId="passworConfirm">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password"  onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterScreen;
