import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Slider.css"
const Slider = () => {
    const { banner } = useSelector(state => state.banner)
    const [currentIndex, setCurentIndex] = useState(0)
    const ImageAray = [
        {
            image: "https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fuploads%2Fcategory%2Fdesktop%2FDesktop_InsideBanner_Jan_Joggers_Common-1711467606.jpg&w=1200&q=75",
            title: "ABC"
        },
        {
            image: "https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fuploads%2Fcategory%2Fdesktop%2Fdesktop-pjs_common-1737352189.jpg&w=1200&q=75",
            title: "ABC"
        },
        {
            image: "https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fuploads%2Fcategory%2Fdesktop%2FBuy-2-at-799_Inside-Banner_Desktop_(1)-1737351668.jpg&w=1200&q=75",
            title: "ABC"
        },
        {
            image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/category/catban-120250204110032.jpg?format=webp&w=1500&dpr=1.3",
            title: "ABC"
        },
        {
            image: "https://www.beyoung.in/api/catalog/homepage-nov/new_28jan25/shacket-banner-desktop-view.jpg",
            title: "ABC"
        }
    ]

    useState(() => {
        const intervalId = setInterval(() => {
            setCurentIndex(prev => prev == ImageAray.length - 1 ? 0 : prev + 1)
        }, 2000)
        return () => intervalId
    }, [])

    return (
        <>
            <div className="sliderComponent">
                {
                    ImageAray && ImageAray.map((data, index) => <img key={index} src={data.image} alt='Banner' className='BannerImag' style={{ opacity: index == currentIndex ? 1 : 0 }} />)
                }
            </div>
            <div className="pointer">
                {ImageAray.map((data, index) => <div key={index} className='point' style={{ opacity: index === currentIndex ? 0.7 : 0.3, width: index === currentIndex ? "20px" : "10px" }} />)}
            </div>
        </>
    )
}

export default Slider