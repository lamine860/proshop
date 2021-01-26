import React, {useState} from 'react';
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
    const [show, setShow] = useState(true);
    if (show){
        return <Alert dismissible onClose={() => setShow(false)} variant={variant}>{children}</Alert>
    }
    return ''
}
 Message.defaultProps = {
    variant: 'info'
 }
 
export default Message;