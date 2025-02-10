import React from 'react'
import "./HomeProduct.css"
import HomeProductBox from './HomeProductBox'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { GetAllProducts } from '../../../Redux/Slice/productsSlicer'
import Slider from 'react-slick'
const HomeProducts = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        focusOnSelect: true,
        centerPadding: '0',
    };

    return (
        <div style={{ marginTop: "20px", width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "90%" }}>
                <h1 className='allProductsText'>All Products</h1>
                <Slider {...settings}>
                    {products && products.slice(0, 30).map((product, index) => (
                        <HomeProductBox key={index} products={product} />
                    ))}
                </Slider>
            </div>

        </div>
    )
}

export default HomeProducts