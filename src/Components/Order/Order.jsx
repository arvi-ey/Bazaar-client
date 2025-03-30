import React from 'react'
import "./Order.css"
import { useDispatch, useSelector } from 'react-redux'
import { GetUserOrder } from '../../../Redux/Slice/orderSlicer'
import useAuth from '../Hooks/useAuth'
import { useEffect, useState } from 'react'
import OrderBox from './OrderBox'


const Order = () => {
    const { orderItems } = useSelector(state => state.order)
    const dispatch = useDispatch()
    const { auth } = useAuth()

    useEffect(() => {
        dispatch(GetUserOrder(auth?.userId))
    }, [dispatch, auth])
    useEffect(() => {
        console.log(orderItems)

    }, [orderItems])

    return (
        <div className="orderPageDiv">
            <p className='orderPageTitle' >Your orders</p>
            <div className='OrderCompBox'>
                {
                    orderItems?.map((data, index) => {
                        return (
                            <OrderBox data={data} />
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Order