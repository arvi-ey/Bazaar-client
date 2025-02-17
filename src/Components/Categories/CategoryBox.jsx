import React from 'react'
import "./Category.css"
import { useNavigate } from 'react-router'
const CategoryBox = ({ categoryImage, categoryName, id, key }) => {
    const navigate = useNavigate()

    const GoToProductCategory = () => {
        navigate(`/products`, { state: { category: categoryName } });
    }
    return (
        <div key={key} className="categoryItem" style={{
            backgroundImage: `url(${categoryImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }
        } onClick={GoToProductCategory} >
            <p className='CategoryName'>
                {
                    categoryName
                }
            </p>

        </div>
    )
}

export default CategoryBox