import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleProduct } from '../../../Redux/Slice/productSlicer'
import "./ProductDetail.css"
import StarRating from '../../Common/StarRating'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const { product } = useSelector(state => state.singleproduct)
    const { id } = useParams()
    const [selectImageview, setSelectImageView] = useState({ image: "", index: null })
    const [selectSize, setSelectSize] = useState("XS")

    useEffect(() => {
        dispatch(GetSingleProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        if (product?.images?.length > 0) {
            setSelectImageView({
                image: product.images[0],
                index: 0
            })

        }
    }, [product])

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

    const HandleSelectImage = (image, index) => {
        setSelectImageView({ image, index })
    }
    const randomDecimal = (Math.random() * 0.9);

    const SelectSize = (data) => {
        setSelectSize(data)
    }

    const sizeArray = ["XS", "S", "M", "L", "XL", "XXL"]
    return (
        <div className="productDetailContainer">
            <div className="productImageList">
                {
                    product && product.images && product.images.map((image, index) => {
                        return (
                            <div key={index} className={`imagelistBox ${selectImageview.index == index ? "selectedImage" : ''} `} onClick={() => HandleSelectImage(image, index)} >
                                <img src={image} alt='image' className='DetaillistImage' />
                            </div>
                        )
                    })
                }
            </div>
            <div className="productImageView">
                <img src={selectImageview.image} alt='selected-image' className='detailImage' />
            </div>
            <div className="productDetailsBox">
                <div className="detailImageTitle">
                    {product?.title}
                </div>
                <div className="detailImagedesc">
                    {product?.description.length > 100 ? `${product?.description.slice(0, 100)}...` : product?.description}
                </div>
                <div>
                    <StarRating
                        value={product?.ratings}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.7, }}>
                    <p className='productPrice' style={{ fontSize: "1.5vmax" }}>
                        <span style={{ fontSize: "1vmax", fontWeight: "600" }}>
                            ₹
                        </span>
                        {product?.price}
                    </p>
                    <s className='productReducedPrice' style={{ fontSize: "1vmax" }}>
                        <span style={{ fontSize: "0.6", fontWeight: "600" }}>
                            ₹
                        </span>
                        {parseInt(product?.price * randomDecimal + product?.price)}
                    </s>
                    <p className='discountClass' style={{ fontSize: "1.5vmax" }} >
                        {parseInt(randomDecimal * 100)}%OFF
                    </p>
                </div>
                <p style={{ opacity: 0.6, fontSize: "0.7vmax", fontWeight: "400" }} >
                    inclusive of all taxes
                </p>
                <p style={{ opacity: 0.9, fontSize: "1vmax", fontWeight: "400", marginTop: "10px" }}>Select Size:</p>
                <div className="sizeDiv">
                    {sizeArray.map((data, index) => {
                        return (
                            <div key={index} className={`sizelement ${selectSize == data ? `selectedSizeelement` : ""}`} onClick={() => SelectSize(data)} >
                                {data}
                            </div>
                        )
                    })}
                </div>
                <p style={{ opacity: 0.7, fontSize: "1vmax", fontWeight: "400", marginTop: "10px" }}>{`Only ${product?.stock} items remaining`}</p>
                <div className='FavouriteDeliveryDetailBox'>
                    <LocalShippingIcon fontSize="inherit" sx={{ color: '#ec0d75', }} />
                    <p className='FavouriteDeliveryDetailText' style={{ fontSize: "1vmax", opacity: 0.7, }}>Free Delivery by {GetDeliveryDate(product?.deliveryTime)}</p>
                </div>
                <div className="favouriteAddtocart" style={{ marginTop: "20px", width: "20vmax", height: "3vmax", fontSize: "1.5vmax", fontWeight: "400", padding: "10px 20px 10px 20px" }}>
                    Add to cart
                </div>
                <div className="deliveryLocation">
                    <FmdGoodOutlinedIcon sx={{ opacity: "0.7" }} />
                    <p style={{ fontWeight: "500", opacity: "0.7", fontSize: "1vmax" }} >
                        Check for Delivery Details
                    </p>
                </div>
                <div style={{ marginTop: "10px" }} >
                    <div className='Loacationearch'>
                        <input
                            placeholder='Enter Pincode'
                            className='inputLocation'
                        />
                        <p style={{ cursor: 'pointer', fontSize: "1vmax", opacity: "0.7", color: "#ec0d75", justifyContent: "flex-end" }}>Chcek</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail