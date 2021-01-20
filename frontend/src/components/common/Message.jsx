import React, {useState} from 'react';
import {Alert} from 'react-bootstrap'

const Message = ({variant, message}) => {
    const [show, setShow] = useState(true);
    if (show){
        return <Alert dismissible onClose={() => setShow(false)} variant={variant}>{message}</Alert>
    }
    return ''
}
 
export default Message;