import React, { useEffect, useState } from 'react'
import Cartbox from './Cartbox'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { GetCartItems } from '../../../Redux/Slice/cartSlicer'
import useAuth from '../Hooks/useAuth'
import Recentview from '../RecentlyViewed/Recentview'
import { useNavigate } from 'react-router'
import Empty_cart from "../../assets/Empty_cart.svg"

const Cart = () => {
    const navigate = useNavigate()
    const { auth } = useAuth()
    const dispatch = useDispatch()
    const { cartitems } = useSelector(state => state.cart)
    const [subTotal, setSubTotal] = useState({ price: 0, totalItem: 0 })

    useEffect(() => {
        if (auth?.userId) dispatch(GetCartItems(auth.userId))
    }, [dispatch, auth])

    useEffect(() => {
        if (cartitems && cartitems?.length > 0) {
            let price = 0
            let totalItem = 0
            for (let i in cartitems) {
                price = price + cartitems[i].subTotal
                totalItem = totalItem + cartitems[i].count
            }
            setSubTotal((prev) => ({ ...prev, price, totalItem }))
        }
    }, [cartitems])

    const PLaceAllOrder = () => {
        navigate(`/user/payment`, { state: { cartData: cartitems } })
    }



    return (
        <>
            <div className="userCartComponet">
                {cartitems?.length < 1 ?
                    <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                        <div>
                            <img src={Empty_cart} style={{ height: "30vmax", widows: "30vmax" }} />
                        </div>
                        <p style={{ fontSize: "2vmax", fontWeight: "6000" }} >No item added into cart</p>
                    </div>

                    :
                    <>
                        <div className="cartItems">
                            {cartitems?.map((data, index) => <Cartbox cartData={data} key={data._id} />)}
                        </div>
                        <div className="cartAmoutBox">
                            <p style={{ fontSize: "1.5vmax", color: "black", opacity: "0.8", fontWeight: "500" }} >Price Details</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1em", color: "rgba(0, 0, 0, 0.634)" }} >

                                <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500" }}>Total Price</p>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500" }}>₹ {Math.floor(subTotal.price)}</p>
                                </div>
                                <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500" }}>Total Item</p>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500" }}>{subTotal.totalItem}</p>
                                </div>
                                <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500" }}>Delivery Charges</p>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500", color: "#8ad20c" }}>FREE</p>
                                </div>
                                <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ fontSize: "1vamx", fontWeight: "500" }}>Coupons applied</p>
                                    <p style={{ fontSize: "0.8vamx", fontWeight: "500", color: "#ec0d75" }}>NONE</p>
                                </div>
                                <div style={{ height: "1px", widh: "100%", backgroundColor: "rgba(0, 0, 0, 0.252)" }} />
                                <div style={{ width: "90%", display: "flex", justifyContent: "space-between", opacity: "1", color: "rgba(0, 0, 0, 0.713)" }}>
                                    <p style={{ fontSize: "2vmax", fontWeight: "500" }}>Total Amount</p>
                                    <p style={{ fontSize: "2vmax", fontWeight: "500", }}>₹ {Math.floor(subTotal.price)}</p>
                                </div>
                                <p className='PlaceTotalOrder' onClick={PLaceAllOrder} >PlaceOrder</p>
                            </div>

                        </div>
                    </>
                }
            </div>
            <Recentview />
        </>
    )
}

export default Cart