import Navbar from '@/components/header/Navbar'
import AboutUsSection from '@/components/home/AboutUsSection'
import HeroSection from '@/components/home/HeroSection'
import OurClientsSection from '@/components/home/OurClientsSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <ServicesSection/>
        <WhyChooseUsSection />
        <AboutUsSection/>
        <OurClientsSection/>
    </div>
  )
}

export default Home