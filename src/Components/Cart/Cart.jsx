import React, { useEffect } from 'react'
import Cartbox from './Cartbox'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { GetCartItems } from '../../../Redux/Slice/cartSlicer'
import useAuth from '../Hooks/useAuth'

const Cart = () => {
    const dispatch = useDispatch()
    const { auth } = useAuth()
    const { cartitems } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(GetCartItems(auth.userId))
    }, [dispatch])
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