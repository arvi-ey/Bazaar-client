import React from 'react'

const PaymentSection = ({ data }) => {
    console.log(data)
    return (
        <div className="paymentContainer">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "90%", marginTop: "20px" }} >
                <img src={data?.image} style={{ width: "10vmax", height: "10vmax", borderRadius: "5px" }} />
                <div>
                    <p style={{ fontSize: "1.5vmax" }}>{data?.title}</p>
                    <p style={{ fontSize: "1.2vmax" }}>₹ {Math.floor(data.subTotal)}</p>
                    <p style={{ fontSize: "1.2vmax" }}>Total items: {data.count}</p>
                </div>
                <div className='Checkout' >
                    <p style={{ color: "White", fontSize: "1.2", fontWeight: "500" }}>
                        Checkout For Payment
                    </p>
                </div>
            </div>
        </div>

    )
}

export default PaymentSection