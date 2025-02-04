import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Slider from './Components/Slider/Slider'
import { useDispatch } from 'react-redux'
import { GetBanners } from '../Redux/Slice/bannerSlicer'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBanners())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Slider />
    </>
  )
}

export default App
