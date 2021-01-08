import React, {useEffect, useState} from 'react';
import axios from 'axios'

const DetailScreen = (props) => {
    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/products/${props.match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [props])
    return (
        <h2>Test</h2>
        
     );
}
 
export default DetailScreen;