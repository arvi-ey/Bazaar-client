import React, { useState } from 'react'
import "./Payment.css"
import { useLocation } from 'react-router'
import { useFormik } from 'formik'
import Address from './Address'
import PaymentSection from './PaymentSection'
const Payment = () => {

    const location = useLocation()
    const paymentData = location.state.cartData || []
    const [enableCheckout, setEnableCheckout] = useState(false)


    return (
        <div className="paymentDiv">
            <div className="address">
                <Address
                    enableCheckout={enableCheckout}
                    setEnableCheckout={setEnableCheckout}
                />
            </div>
            <div className="payment">
                <PaymentSection data={paymentData}
                    enableCheckout={enableCheckout}
                    setEnableCheckout={setEnableCheckout}
                />
            </div>

        </div>
    )
}

export default Payment