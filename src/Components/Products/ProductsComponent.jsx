import React from 'react'
import Productbox from './Productbox'
import { useSelector } from 'react-redux'
const ProductsComponent = () => {
    const { products } = useSelector(state => state.product)

    return (
        <div className="productComponent">
            {
                products && products.map((data, index) => (
                    <Productbox
                        products={data}
                        key={index}
                    />
                ))
            }
        </div>
    )
}

export default ProductsComponent