import React from 'react'
import Filterbar from '../Filterbar/Filterbar'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux'
import ProductsComponent from './ProductsComponent'
const Products = () => {

    return (
        <div className="productsComponent">
            <Filterbar />
            <ProductsComponent />
        </div>
    )
}

export default Products