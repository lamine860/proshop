import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { userLoginAction } from "./../actions/userAction";
import Message from "../components/common/Message";
import InputField from "../components/common/InputField";
import { Link } from 'react-router-dom';
const LoginScreen = ({history, location}) => {
    const redirect = location.search ? location.search.split('=')[1] : '/shipping'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleChange = (e) => {
        if(e.target.name === 'email'){
             setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }

    }
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(email.length > 0){
          dispatch(userLoginAction({email, password}))
        }
    }
    useEffect(() => {
      if(userLogin.userInfo){
        history.push(redirect)
      }
    }, [userLogin, history, redirect])
  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card>
          <Card.Header>
            <h1>Sign In</h1>
          </Card.Header>
          <Card.Body>
            { userLogin.error && <Message variant={'danger'}>{ userLogin.error.message }</Message>}
            <Form onSubmit={e => handleSubmit(e)}>
              <InputField name="email" value={email} onChange={handleChange} placeholder="Enter your email" />
              <InputField name="password" value={password} onChange={handleChange} placeholder="Enter your password" type="password" />
              <Form.Group>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form.Group>
            </Form>
            <div>New Customer ? <Link to="/register">Create an account</Link> </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
