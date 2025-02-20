import React, { useEffect, useState } from 'react'
import Filterbar from '../Filterbar/Filterbar'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import ProductsComponent from './ProductsComponent'
const Products = () => {
    const location = useLocation();
    const categoryName = location.state?.category || null;





    return (
        <div className="productsComponent">
            <Filterbar />
            <ProductsComponent
                categoryName={categoryName}
            />
        </div>
    )
}

export default Products