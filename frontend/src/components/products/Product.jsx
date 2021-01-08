import React from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const Product = (props) => {
    const {product} = props
    return (  
    <Card className="mb-2">
        <Link to={ '/products/' + product.name }><Card.Img variant="top" src={  product.image } /></Link>
        <Card.Body>
            <Link to={ '/products/' +  product.name }><Card.Title>{ product.name }</Card.Title></Link>
            <Card.Text>{ product.description }</Card.Text>
            <Card.Text as="h3">${ product.price }</Card.Text>
        </Card.Body>
    </Card>
    );
}
 
export default Product;