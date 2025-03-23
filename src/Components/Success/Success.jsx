import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PlaceOrder } from '../../../Redux/Slice/orderSlicer'
import { UpdateCartItem, RemoveFromCart } from '../../../Redux/Slice/cartSlicer';

const Success = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        const orderjson = localStorage.getItem("orderobj")
        const orderObj = JSON.parse(orderjson)
        console.log("OrderOBJ", orderObj)
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
    }

    return (
        <div>Success</div>
    )
}

export default Success