import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Form, Button, Card} from 'react-bootstrap'


import {productDetailAction} from '../actions/productAction'
import Rating from '../components/Rating'

const ProductScreen = (props) => {
    const dispatch  = useDispatch()

    useEffect(() => {
        dispatch(productDetailAction(props.match.params.id))

    }, [props, dispatch])

    const {loading, error, product} = useSelector(state => state.productDetail)
    return (
        <>
        <Link to='/' className=" btn btn-light my-3">Go back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item><h3>{ product.name }</h3></ListGroup.Item>
                    <ListGroup.Item><Rating value={product.rating} text={ ` ${product.numReviews} Reviews `} /></ListGroup.Item>
                    <ListGroup.Item>${ product.price }</ListGroup.Item>
                    <ListGroup.Item>{ product.description }</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card className="card-body">
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                        <Col>Price:</Col>
                        <Col>
                            <strong>${product.price}</strong>
                        </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Status:</Col>
                        <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 1 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty:</Col>
                                <Col>
                                    <Form.Control as="select">
                                        {
                                            [...Array(product.countInStock).keys()].map(x => (
                                                <option key={ x+1 } value={x+1}>{ x+1 }</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup>
                        <Button className="btn btn-block" type="button" disabled={product.countInStock === 0}>Add to cart</Button>
                    </ListGroup>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
        
     );
}
 
export default ProductScreen;