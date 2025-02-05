import React from 'react'
import "./Category.css"

const CategoryBox = ({ categoryImage, categoryName, id, key }) => {
    return (
        <div key={key} className="categoryItem" style={{
            backgroundImage: `url(${categoryImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }
        }>
            <p className='CategoryName'>
                {
                    categoryName
                }
            </p>

        </div>
    )
}

export default CategoryBox