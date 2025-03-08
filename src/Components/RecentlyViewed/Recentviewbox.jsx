import React from 'react'
import "./Recentview.css"
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router';
const Recentviewbox = ({ item }) => {
    const navigate = useNavigate()
    const randomDecimal = (Math.random() * 0.9);
    const NavigateProductDetail = () => {
        navigate(`/product/${item._id}`);
    };
    return (
        <div className="RecentviewBox" onClick={NavigateProductDetail}>
            {
                item &&
                <>
                    <div style={{ position: "relative" }}>
                        <img src={item.images[0]} alt={item.category} className='productImage' />
                        <div className='rating'>
                            <GradeIcon sx={{ color: "#FFD700" }} />
                            <p className='ratingText'>
                                {item.ratings}
                            </p>
                        </div>
                    </div>
                    <div className='detailBox'>
                        <p className='productTitle'>{item.title}</p>
                        <p className='productdesc'>{item.description.substring(0, 55)}...</p>
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <p className='productPrice'>
                                <span style={{ fontSize: "12px", fontWeight: "600" }}>
                                    ₹
                                </span>
                                {item.price}
                            </p>
                            <s className='productReducedPrice'>
                                <span style={{ fontSize: "10px", fontWeight: "600" }}>
                                    ₹
                                </span>
                                {parseInt(item.price * randomDecimal + item.price)}
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

export default Recentviewbox