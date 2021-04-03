import React from 'react'
import CheckoutStep from '../components/CheckoutStep'
import FormContainer from '../components/FormContainer'

const PaymentScreen = () => {
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
        </FormContainer>
    )
}

export default PaymentScreen
