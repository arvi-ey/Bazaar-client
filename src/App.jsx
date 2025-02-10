import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Slider from './Components/Slider/Slider'
import { useDispatch } from 'react-redux'
import { GetBanners } from '../Redux/Slice/bannerSlicer'
import { GetAllCategory } from "../Redux/Slice/categorySlicer"
import CategorySection from './Components/Categories/CategorySection'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeProducts from './Components/HomeProducts/HomeProducts'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import About from './Components/About/About'
import Products from './Components/Products/Products'
import { GetAllProducts } from '../Redux/Slice/productsSlicer'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
])

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBanners())
    dispatch(GetAllCategory())
    dispatch(GetAllProducts())
  }, [dispatch])


  return (
    <RouterProvider router={router} />
  )
}

export default App
