import React from 'react'
import GradeIcon from '@mui/icons-material/Grade';

const CommonCategoryBox = ({ product }) => {
    const randomDecimal = (Math.random() * 0.9);
    return (
        <div className="productbox">
            {
                product &&
                <>
                    <div style={{ position: "relative" }}>
                        <img src={product.images[0]} alt={product.category} className='productImage' />
                        <div className='rating'>
                            <GradeIcon sx={{ color: "#FFD700" }} />
                            <p className='ratingText'>
                                {product.ratings}
                            </p>
                        </div>
                    </div>
                    <div className='detailBox'>
                        <p className='productTitle'>{product.title}</p>
                        <p className='productdesc'>{product.description.substring(0, 55)}...</p>
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <p className='productPrice'>
                                <span style={{ fontSize: "12px", fontWeight: "600" }}>
                                    ₹
                                </span>
                                {product.price}
                            </p>
                            <s className='productReducedPrice'>
                                <span style={{ fontSize: "10px", fontWeight: "600" }}>
                                    ₹
                                </span>
                                {parseInt(product.price * randomDecimal + product.price)}
                            </s>
                            <p className='discountClass' >
                                {parseInt(randomDecimal * 100)}%OFF
                            </p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default CommonCategoryBox