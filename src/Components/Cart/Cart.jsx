import React, { useEffect, useState } from 'react'
import Cartbox from './Cartbox'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { GetCartItems } from '../../../Redux/Slice/cartSlicer'
import useAuth from '../Hooks/useAuth'

const Cart = () => {
    const { auth } = useAuth()
    const dispatch = useDispatch()
    const { cartitems } = useSelector(state => state.cart)
    const [subTotal, setSubTotal] = useState({ price: 0, totalItem: 0 })

    useEffect(() => {
        if (cartitems && cartitems.length > 0) {
            let price = 0
            let totalItem = 0
            for (let i in cartitems) {
                price = price + cartitems[i].subTotal
                totalItem = totalItem + cartitems[i].count
            }
            setSubTotal((prev) => ({ ...prev, price, totalItem }))
        }
    }, [cartitems])

    useEffect(() => {
        console.log(subTotal)
    }, [subTotal])

    useEffect(() => {
        if (auth?.userId) dispatch(GetCartItems(auth.userId))
    }, [dispatch, auth])

    return (
        <div className="userCartComponet">
            <div className="cartItems">
                {cartitems?.map((data, index) => <Cartbox cartData={data} key={data._id} />)}
            </div>
            <div className="cartAmoutBox">

            </div>
        </div>
    )
}

export default Cart