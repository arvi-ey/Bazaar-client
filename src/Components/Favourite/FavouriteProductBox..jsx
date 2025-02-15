import React, { useState, useEffect } from 'react'
import StarRating from '../../Common/StarRating'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const FavouriteProductBox = ({ item, key }) => {
    const [imageFocus, SetImageFocus] = useState(false)
    console.log(item)
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
        <div key={key} className="favouriteProductBoxContainer">
            <div className="favouriteProductImage">
                <img src={imageFocus ? item.images[1] : item.images[0]} alt={item.category}
                    className='favouriteImage' onMouseOver={() => SetImageFocus(true)} onMouseOut={() => SetImageFocus(false)} />
            </div>
            <div className="favouriteProductDesc">
                <div className="favouriteProductTitle">
                    {item.title}
                </div>
                <div className="favouriteProductdesc">
                    {item.description.length > 90 ? `${item.description.slice(0, 90)}...` : item.description}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <p className='productPrice' style={{ fontSize: "1.5vmax" }}>
                        <span style={{ fontSize: "1vmax", fontWeight: "600" }}>
                            ₹
                        </span>
                        {item.price}
                    </p>
                    <s className='productReducedPrice' style={{ fontSize: "1vmax" }}>
                        <span style={{ fontSize: "0.6", fontWeight: "600" }}>
                            ₹
                        </span>
                        {parseInt(item.price * randomDecimal + item.price)}
                    </s>
                    <p className='discountClass' style={{ fontSize: "1.5vmax" }} >
                        {parseInt(randomDecimal * 100)}%OFF
                    </p>
                </div>
                <div className="favouriteProductCategory">
                    Category : {item.category}
                </div>
                <div className="favouriteRating">
                    <StarRating
                        value={item.ratings}
                    />
                </div>
                <div className='FavouriteDeliveryDetailBox'>
                    <LocalShippingIcon sx={{ color: '#ec0d75' }} />
                    <p className='FavouriteDeliveryDetailText'>Free Delivery by {GetDeliveryDate(item.deliveryTime)}</p>
                </div>
                <div className="favouriteAddtocart">
                    Add to cart
                </div>
                <div className="favouriteRemove">
                    Remove
                </div>

            </div>
        </div>
    )
}

export default FavouriteProductBox