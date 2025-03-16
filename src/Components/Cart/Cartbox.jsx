import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { UpdateCartItem, RemoveFromCart } from '../../../Redux/Slice/cartSlicer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
const Cartbox = ({ cartData, key }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const UpdateCount = (value) => {
        if (value === 0 && cartData?.count === 1) RemoveCartItem()

        const countValue = cartData?.count + (value === 1 ? 1 : -1);
        const body = { count: countValue, subTotal: countValue * cartData.price };
        dispatch(UpdateCartItem({ cartId: cartData._id, body }));
    };





    const NavigateToPayment = () => {

        const data = {
            // pro
        }

        navigate(`/user/payment`, { state: { cartData } })
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

    const RemoveCartItem = () => {
        dispatch(RemoveFromCart(cartData?._id))

    }

    const HandleNavigateToDetail = () => {
        navigate(`/product/${cartData.product_id}`)
    }
    return (
        <div className="cartBoxComponent" >
            <div className='CartImageBox' >
                <img src={cartData.image} alt='product-Image' className='cartImage' onClick={HandleNavigateToDetail} />
            </div>
            <div className="cartDetail">
                <p className='cartItemTitle'>{cartData.title}</p>
                <p className='cartItemdesc'>{cartData?.description?.length > 100 ? `${cartData?.description.slice(0, 100)}...` : cartData.description}</p>
                <p className='cartItemSize'>Size: {cartData.size}</p>
                <p className='cartItemDeliveryDate'>Delivery by : {GetDeliveryDate(cartData.deliveryTime)}</p>
                <p className='cartItemprice'>₹ {Math.floor(cartData.price * cartData.count)}</p>

                <div className='CartFooter' >
                    <div className="updateCountbox">
                        <div className='RemoveIconDIv' onClick={() => UpdateCount(0)} >
                            <RemoveIcon sx={{ fontSize: "2vmax" }} />
                        </div>

                        <p className='CartCount'>{cartData.count}</p>
                        <div className='AddIconDIv' onClick={() => UpdateCount(1)}>
                            <AddIcon sx={{ fontSize: "2vmax" }} />
                        </div>
                    </div>
                    <div className='Option'>
                        <p className='PlaceOrder' onClick={NavigateToPayment} >Place Order</p>
                        <p className='RemoveItem' onClick={RemoveCartItem} >Remove Item</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartbox