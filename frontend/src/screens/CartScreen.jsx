import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button} from 'react-bootstrap'
import Message from '../components/common/Message'

import { addToCartAction, removeFromCartAction } from '../actions/cartAction';



const CartScreen = ({location, match, history}) => {
    const dispatch  = useDispatch()
    const qty = location.search ? Number(location.search.split('=')[1]): 1
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCartAction(id))
    }
    const handleChekout = () => {
        history.push('/login?redirect=shipping')
    }
    useEffect(() => {
        if(match.params.id){
            dispatch(addToCartAction(match.params.id, qty))
        }

    }, [dispatch, match, qty])
    const {cartItems}  = useSelector(state => state.cart)
    console.log(cartItems)
    return (
        <Row>
            <Col md={8}>
                <h1>Yor shopping cart</h1>
                {
                    cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                        <ListGroup variant="flush">
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}><Image rounded fluid src={item.image} alt={item.name} /></Col>
                                            <Col md={3}><Link to={`/products/${item.product}`}>{ item.name }</Link></Col>
                                            <Col className="h4" md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                {item.countInStock > 1 && (
                                                    <Form.Control as="select" onChange={(e) => dispatch(addToCartAction(item.product, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map(x => (
                                                                <option key={ x+1 } value={x+1}>{ x+1 }</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                )}
                                            </Col>
                                            <Col md={2}>
                                                <Button variant="light" onClick={() => removeFromCartHandler(item.product)} type="button"><i className="fas fa-trash"></i></Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                    </ListGroup.Item>
                   {cartItems.length > 0 && (
                    <ListGroup.Item>
                        <h4>$({cartItems.reduce((acc, item) => acc + item.qty  * item.price, 0).toFixed()})</h4>
                    </ListGroup.Item>
                   )}
                    <ListGroup.Item>
                        <Button type="button" disabled={cartItems.length === 0} className="btn btn-block" onClick={() => handleChekout()}>Proceed to checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}
 
export default CartScreen