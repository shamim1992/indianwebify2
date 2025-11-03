import FooterSection from '@/components/footer/FooterSection'
import Navbar from '@/components/header/Navbar'
import AboutUsSection from '@/components/home/AboutUsSection'
import HeroSection from '@/components/home/HeroSection'
import OurClientsSection from '@/components/home/OurClientsSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import ProcessSection from '@/components/home/ProcessSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection'
import SEO from '@/components/SEO'
import React from 'react'

const Home = () => {
  return (
    <>
      <SEO
        title="Indian Webify - Digital Solutions & Web Development Services"
        description="Transform your business with Indian Webify's professional website development, app development, AI solutions, digital marketing, and research projects. Expert digital services for modern businesses."
        keywords="website development, app development, AI development, digital marketing, web design, mobile apps, ecommerce development, custom websites, Indian Webify"
        url="/"
        image="/indianwebify.png"
      />
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
    </>
  )
}

export default Home