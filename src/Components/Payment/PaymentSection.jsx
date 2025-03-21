import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";

const PaymentSection = ({ data, enableCheckout, setEnableCheckout }) => {

    const [paybleAmount, setPaybleAmount] = useState()

    useEffect(() => {
        if (data) {
            let totalamount = 0
            for (let i in data) {
                totalamount = totalamount + data[i].subTotal
            }
            setPaybleAmount(totalamount)
        }
    }, [data])

    return (
        <div className="paymentContainer">
            {
                data?.map((item, index) => {
                    return (
                        <div key={item?._id} style={{ display: "flex", gap: "10px", width: "90%", marginTop: "20px" }} >
                            <img src={item?.image} style={{ width: "10vmax", height: "10vmax", borderRadius: "5px" }} />
                            <div>
                                <p style={{ fontSize: "1.5vmax", opacity: "0.7" }}>{item?.title}</p>
                                <p style={{ fontSize: "1vmax", opacity: "0.7" }}>₹ {Math.floor(item.subTotal)}</p>
                                <p style={{ fontSize: "1vmax", opacity: "0.7" }}>Total items: {item.count}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div style={{ width: "90%", marginTop: "20px" }}>
                <p style={{ fontSize: "1.3vmax", fontWeight: "500", opacity: "0.7" }} >Total Payble Ammount: ₹{Math.floor(paybleAmount)}</p>
            </div>
            <div style={{ width: "90%", marginTop: "20px" }}>
                <Button
                    disabled={!enableCheckout}
                    variant="contained"
                    sx={{
                        color: "white",
                        fontSize: "1vmax",
                        width: "35vmin",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: " center",
                        padding: "15px",
                        padding: "15px",
                        fontWeight: "600",
                        backgroundColor: "#ec0d75",
                        "&:hover": {
                            backgroundColor: "#ed4694",
                        },
                    }}
                >
                    Checkout For Payment
                </Button>
            </div>
            {
                !enableCheckout &&
                <div style={{ width: "90%", marginTop: "10px" }}>
                    <p style={{ fontSize: "0.9vmax", opacity: 0.5 }} >Please add address for checkout for payment</p>
                </div>
            }

        </div >

    )
}

export default PaymentSection