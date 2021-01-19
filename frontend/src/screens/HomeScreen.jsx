import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {productListAction} from '../actions/productAction'
import Product from '../components/products/Product'
const HomeScreen = () => {
    const dispatch  = useDispatch()
    const {loading, error, products} = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(productListAction())
    }, [dispatch])

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