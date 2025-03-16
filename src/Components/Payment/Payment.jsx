import React from 'react'
import "./Payment.css"
import { useLocation } from 'react-router'
import { useFormik } from 'formik'
import Address from './Address'
import PaymentSection from './PaymentSection'
const Payment = () => {

    const location = useLocation()
    const paymentData = location.state.cartData



    return (
        <div className="paymentDiv">
            <div className="address">
                <Address />
            </div>
            <div className="payment">
                <PaymentSection />
            </div>

        </div>
    )
}

export default Payment