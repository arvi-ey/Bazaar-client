import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PlaceOrder } from '../../../Redux/Slice/orderSlicer'
import { UpdateCartItem, RemoveFromCart } from '../../../Redux/Slice/cartSlicer';
import order_placed from "../../assets/order_placed.svg"
import { useNavigate } from 'react-router';
const Success = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const orderjson = localStorage.getItem("orderobj")
        if (!orderjson) navigate("/")
        const orderObj = JSON.parse(orderjson)
        if (orderObj?.length > 0) {
            console.log("THis is running")
            PlaceUserOrder(orderObj)
        }
    }, [dispatch])

    const PlaceUserOrder = async (orderObj) => {
        for (let i in orderObj) {
            await dispatch(PlaceOrder(orderObj[i]))
            await dispatch(RemoveFromCart(orderObj[i].cartId))
        }
        localStorage.removeItem("orderobj")
        setTimeout(() => {
            navigate("/user/orders")
        }, 2000);
    }

    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
            <div>
                <img src={order_placed} style={{ height: "30vmax", widows: "30vmax" }} />
            </div>
            <p style={{ fontSize: "2vmax", fontWeight: "6000" }} >Order Placed successfully</p>
        </div>
    )
}

export default Success