import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Card, Form, Button, Row, Col} from 'react-bootstrap'
import { userRegisterAction } from './../actions/userAction';
import Message from '../components/common/Message'


const RegisterScreen = ({history, location}) => {
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConform] = useState('')
    const dispatch = useDispatch()
    const userRegister =  useSelector(state => state.userRegister)
    const handleSubmit = (e) => {
        e.preventDefault()
        const user  = {name, email, password, passwordConfirm}
        dispatch(userRegisterAction(user))
    }
    useEffect(() => {
        if(userRegister.userInfo || localStorage.getItem('userInfo')){
            history.push(redirect)
        }

    }, [history, userRegister, redirect])

    return (
        <Row className="justify-content-md-center">
            <Col md={8}>
            <Card>
            <Card.Header>
                <h1>Registration</h1>
            </Card.Header>
            <Card.Body>
                { userRegister.error && <Message variant="danger">{ userRegister.error.message }</Message>}
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control value={name} placeholder={"Enter your name"}
                         onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control type="email" value={email} placeholder={"Enter your email"}
                         onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Your Passord</Form.Label>
                        <Form.Control type="password" value={password} placeholder={"Enter your password"}
                         onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Passord</Form.Label>
                        <Form.Control type="password" value={passwordConfirm} placeholder={"Confirm password"}
                         onChange={(e) => setPasswordConform(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
            </Col>
        </Row>
    )
}

export default RegisterScreen