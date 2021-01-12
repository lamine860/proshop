import React from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

import  Rating from '../Rating'

const Product = (props) => {

    const {product} = props
    return (  
    <Card className="mb-2">
        <Link to={ '/products/' + product.name }><Card.Img variant="top" src={  product.image } /></Link>
        <Card.Body>
            <Link to={ `/products/${product.name}`}><Card.Title as="div">{ product.name }</Card.Title></Link>
            <Rating value={ product.rating } text={` ${product.numReviews} reviews`} />
            <Card.Text as="h4">${ product.price }</Card.Text>
        </Card.Body>
    </Card>
    );
}
 
export default Product