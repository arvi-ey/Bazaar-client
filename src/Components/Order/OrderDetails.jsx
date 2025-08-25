import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderById } from '../../../Redux/Slice/orderSlicer'
import { useEffect, useState } from 'react'
import OrderTrack from './OrderTrack'

const OrderDetails = () => {
    const productId = useParams().id
    const dispatch = useDispatch()
    const { singleOrder } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(GetOrderById(productId))
    }, [dispatch, productId])

    function formatFriendlyDate(date) {
        const d = new Date(date);

        const day = d.getDate();
        const suffix =
            (day % 10 === 1 && day !== 11) ? 'st' :
                (day % 10 === 2 && day !== 12) ? 'nd' :
                    (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        const month = d.toLocaleString('default', { month: 'short' });

        const weekday = d.toLocaleString('default', { weekday: 'long' });
        let hour = d.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        return `${day}${suffix} ${month}, ${weekday} at ${hour} ${ampm}`;
    }

    const GetDeliveryDate = (days) => {
        if (!days) return
        const today = new Date();
        today.setDate(today.getDate() + days);
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        return today.toLocaleDateString('en-US', options);
    }

    return (
        <div className='OrderDetailComp' >
            <div className='Order-Track' >
                <OrderTrack
                    orderStatus={singleOrder?.orderStatus}
                    orderDate={formatFriendlyDate(singleOrder?.orderDate)}
                    deliveryDate={GetDeliveryDate(singleOrder?.deliveryTime)}

                />
            </div>
            <div className='OrderBoxDetailContainer'  >
                <div className='orderDetailProductImage' onClick={() => navigate(`/user/orderdetails/${singleOrder?._id}`)} >
                    <img src={singleOrder?.image} alt='Order-Product' className='OrderDetailProduct' />
                </div>
                <div className='orderProductDesc' >
                    <p className='orderProductTitle' >{singleOrder?.productTitle} (<span style={{ fontSize: "clamp(1em ,1vmax ,2em)" }}>Qty:{singleOrder?.quantity}</span>) </p>
                    <p className='orderProductPrice'>₹ {Math.floor(singleOrder?.totalPrice)}</p>
                    <p className='orderProductSize' >Size: {singleOrder?.size}</p>
                    <p className='orderProductAddress'>{`${singleOrder?.state}, ${singleOrder?.orderAddress}, ${singleOrder?.city},${singleOrder?.pinCode}, ${singleOrder?.houseNumber && `House no.${singleOrder.houseNumber}`}`}</p>
                    <p className='orderProductDate'>Order placed on {formatFriendlyDate(singleOrder?.orderDate)}</p>
                    <p className='orderProducPayment'>Payment Status: <span className='paymentStatusText' >{singleOrder?.paymentStatus}</span> </p>
                    <p className='orderProducStatus'>Order Status: <span className='orderStatusText' >{singleOrder?.orderStatus}</span> </p>
                    <p className='orderExpecedDelivery'>Delivery expected by : {GetDeliveryDate(singleOrder?.deliveryTime)}</p>
                    <p className='orderAddressType'>Address Type : {singleOrder?.addressType}</p>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails