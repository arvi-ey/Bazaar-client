import React, { useState } from 'react'
// import "../HomeProducts/HomeProduct.css"
import GradeIcon from '@mui/icons-material/Grade';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const Productbox = ({ products }) => {

    const [imageFocus, SetImageFocus] = useState(false)

    const randomDecimal = (Math.random() * 0.9);

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
        <div className="productBoxs">
            <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={imageFocus ? products.images[1] : products.images[0]} alt={products.category} className='productImages' onMouseOver={() => SetImageFocus(true)} onMouseOut={() => SetImageFocus(false)} />
                <div className='rating'>
                    <GradeIcon sx={{ color: "#FFD700" }} />
                    <p className='ratingText'>
                        {products.ratings}
                    </p>
                </div>
            </div>
            <div className='detailBoxs'>
                <p className='productTitle'>{products.title.length > 30 ? `${products.title.substring(0, 30)}...` : products.title}</p>
                <p className='productdesc'>{products.description.substring(0, 55)}...</p>
                <div style={{ display: "flex", alignItems: "center", }}>
                    <p className='productPrice'>
                        <span style={{ fontSize: "12px", fontWeight: "600" }}>
                            ₹
                        </span>
                        {products.price}
                    </p>
                    <s className='productReducedPrice'>
                        <span style={{ fontSize: "10px", fontWeight: "600" }}>
                            ₹
                        </span>
                        {parseInt(products.price * randomDecimal + products.price)}
                    </s>
                    <p className='discountClass' >
                        {parseInt(randomDecimal * 100)}%OFF
                    </p>
                </div>
                <div className='DeliveryDetail'>
                    <LocalShippingIcon sx={{ color: '#ec0d75' }} />
                    <p className='DeliveryDetailText'>Free Delivery by {GetDeliveryDate(products.deliveryTime)}</p>
                </div>
            </div>
        </div>
    )
}

export default Productbox