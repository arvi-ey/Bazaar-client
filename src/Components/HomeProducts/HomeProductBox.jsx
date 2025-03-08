import React from 'react'
import "./HomeProduct.css"
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router';

const HomeProductBox = ({ products }) => {
    const navigate = useNavigate()

    const NavigateProductDetail = () => {
        navigate(`/product/${products._id}`);
    };

    const randomDecimal = (Math.random() * 0.9);

    return (
        <div className="productbox" onClick={NavigateProductDetail}>
            {
                products &&
                <>
                    <div style={{ position: "relative" }}>
                        <img src={products.images[0]} alt={products.category} className='productImage' />
                        <div className='rating'>
                            <GradeIcon sx={{ color: "#FFD700" }} />
                            <p className='ratingText'>
                                {products.ratings}
                            </p>
                        </div>
                    </div>
                    <div className='detailBox'>
                        <p className='productTitle'>{products.title}</p>
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
                    </div>
                </>
            }
        </div>
    )
}

export default HomeProductBox