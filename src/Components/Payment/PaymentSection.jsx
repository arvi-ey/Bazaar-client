import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import { loadStripe } from '@stripe/stripe-js';
import { URL } from '../../../config';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceOrder } from '../../../Redux/Slice/orderSlicer';
const stripePromise = loadStripe('pk_test_51QSNCoFEhO3EtVp5yMk2GSHB6RfLRUJGbsIf2aRFBqRAUT73iZZ9Uora9o1kUDoGx14Md9QfbSJNelk5ugRgHpc8005Ii5UlvA')

const PaymentSection = ({ data, enableCheckout, setEnableCheckout }) => {
    const { auth } = useAuth()
    const dispatch = useDispatch()
    const { currentOrderAddress } = useSelector(state => state.address)
    const [paybleAmount, setPaybleAmount] = useState()
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (data) {
            let totalamount = 0
            for (let i in data) {
                totalamount = totalamount + data[i].subTotal
            }
            setPaybleAmount(totalamount)
        }
    }, [data])

    console.log(data)

    const HandlePaymentCheckout = async () => {

        const baseURl = window.location.origin
        let orderObj = data?.map((data, id) => {
            return (
                {
                    productId: data?.product_id,
                    totalPrice: Math.floor(data?.subTotal),
                    quantity: data?.count,
                    deliveryTime: data?.deliveryTime,
                    size: data?.size,
                    image: data?.image,
                    productTitle: data?.title,
                    cartId: data?._id,
                    paymentMode: "CARD",
                    paymentStatus: "PAID",
                    orderDate: Date.now(),
                    orderAddress: currentOrderAddress?.street,
                    city: currentOrderAddress?.city,
                    state: currentOrderAddress?.state,
                    pinCode: currentOrderAddress?.pinCode,
                    addressType: currentOrderAddress?.addressType,
                    houseNumber: currentOrderAddress?.houseNumber,
                    name: auth?.name,
                    phone: auth?.phone,
                    userId: auth?.userId,
                    orderStatus: "PLACED",
                }
            )
        })
        const orderJson = JSON.stringify(orderObj)
        localStorage.setItem("orderobj", orderJson);
        try {
            const reqBody = {
                itemData: data,
                successURL: `${baseURl}/user/success`,
                failedUrl: `${baseURl}/user/failed`


            }
            const response = await axios.post(URL + 'payment/checkout-session', reqBody);
            const sessionId = response.data.id;
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error(error);
                return
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            return
        }
        finally {
            setIsProcessing(false)
        }


    }

    return (
        <div className="paymentContainer">
            {
                data?.map((item, index) => {
                    return (
                        <div key={item?._id} style={{ display: "flex", gap: "10px", width: "90%", marginTop: "20px" }} >
                            <img src={item?.image} className='Payment-item-image' alt='payment-item' />
                            <div>
                                <p className='Order-item-title'>{item?.title}</p>
                                <p style={{ fontSize: "clamp(1rem, 0.5vw , 1rem)", opacity: "0.8" }}>₹ {Math.floor(item.subTotal)}</p>
                                <p style={{ fontSize: "clamp(1rem, 0.5vw , 1rem)", opacity: "0.8" }}>Total items: {item.count}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div style={{ width: "90%", marginTop: "20px" }}>
                <p style={{ fontWeight: "500", opacity: "0.7", fontSize: "clamp(1rem, 0.5vw , 1rem)" }} >Total Payble Ammount: ₹{Math.floor(paybleAmount)}</p>
            </div>
            <div style={{ width: "90%", marginTop: "20px" }}>
                <Button
                    onClick={HandlePaymentCheckout}
                    disabled={!enableCheckout}
                    variant="contained"
                    sx={{
                        color: "white",
                        fontSize: "1vmax",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: " center",
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
                    <p style={{ fontSize: "clamp(0.6rem, 0.8vw , 1rem)", opacity: 0.5 }} >Please add address for checkout for payment</p>
                </div>
            }

        </div >

    )
}

export default PaymentSection