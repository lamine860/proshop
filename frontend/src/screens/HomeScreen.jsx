import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/products/Product'
const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const  {data} =  await axios.get('/api/products')
            setProducts(data)
        } 
        fetchProducts()
    }, [])
    return (  
        <>
        <h1>Latest product</h1>
        <Row>
        {
            products.map(product => (
                <Col xs={12} sm={6} md={4} lg={3} key={ product.name }>
                    <Product product={product} />
                </Col>
            ))
        }
        </Row>
        </>
    );
}
 
export default HomeScreen