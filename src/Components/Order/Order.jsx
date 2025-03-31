import React from 'react'
import "./Order.css"
import { useDispatch, useSelector } from 'react-redux'
import { GetUserOrder } from '../../../Redux/Slice/orderSlicer'
import useAuth from '../Hooks/useAuth'
import { useEffect, useState } from 'react'
import OrderBox from './OrderBox'
import Empty_order from "../../assets/Empty_order.svg"

const Order = () => {
    const { orderItems } = useSelector(state => state.order)
    const dispatch = useDispatch()
    const { auth } = useAuth()

    useEffect(() => {
        if (auth?.userId) {
            dispatch(GetUserOrder(auth?.userId))
        }
    }, [dispatch, auth])



    return (
        <div className="orderPageDiv">
            {orderItems?.lemgth < 1 ?
                <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                    <div>
                        <img src={Empty_order} style={{ height: "30vmax", widows: "30vmax" }} />
                    </div>
                    <p style={{ fontSize: "2vmax", fontWeight: "6000" }} >No item added into cart</p>
                </div>

                :
                <>
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
                </>
            }

        </div>
    )
}

export default Order