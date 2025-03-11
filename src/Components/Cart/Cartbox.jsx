import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const Cartbox = ({ cartData, key }) => {
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
        <div className="cartBoxComponent">
            <img src={cartData.image} alt='product-Image' className='cartImage' />
            <div className="cartDetail">
                <p className='cartItemTitle'>{cartData.title}</p>
                <p className='cartItemdesc'>{cartData.description}</p>
                <p className='cartItemSize'>Size: {cartData.size}</p>
                <p className='cartItemDeliveryDate'>Delivery by : {GetDeliveryDate(cartData.deliveryTime)}</p>
                <p className='cartItemprice'>₹ {cartData.subTotal * cartData.count}</p>
                <div className="updateCountbox">
                    <AddIcon />

                    <p>{cartData.count}</p>

                    <RemoveIcon />
                </div>
            </div>
        </div>
    )
}

export default Cartbox