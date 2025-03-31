import Navbar from '@/components/header/Navbar'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <ServicesSection/>
    </div>
  )
}

export default Home