import FooterSection from '@/components/footer/FooterSection'
import Navbar from '@/components/header/Navbar'
import AboutUsSection from '@/components/home/AboutUsSection'
import HeroSection from '@/components/home/HeroSection'
import OurClientsSection from '@/components/home/OurClientsSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import ProcessSection from '@/components/home/ProcessSection'
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
        <PortfolioSection/>
        {/* <OurClientsSection/> */}
        <ProcessSection/>
        <FooterSection/>
    </div>
  )
}

export default Home