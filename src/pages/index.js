import Navbar from '@/components/header/Navbar'
import HeroSection from '@/components/home/HeroSection'
import SEO from '@/components/SEO'
import React from 'react'
import dynamic from 'next/dynamic'

const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'))
const WhyChooseUsSection = dynamic(() => import('@/components/home/WhyChooseUsSection'))
const AboutUsSection = dynamic(() => import('@/components/home/AboutUsSection'))
const PortfolioSection = dynamic(() => import('@/components/home/PortfolioSection'))
const ProcessSection = dynamic(() => import('@/components/home/ProcessSection'))
const FooterSection = dynamic(() => import('@/components/footer/FooterSection'))

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Indian Webify',
  url: 'https://indianwebify.com',
  description: 'Transform your business with Indian Webify\'s professional website development, app development, AI solutions, digital marketing, and research projects.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://indianwebify.com/posts?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const Home = () => {
  return (
    <>
      <SEO
        title="Indian Webify - Digital Solutions & Web Development Services"
        description="Transform your business with Indian Webify's professional website development, app development, AI solutions, digital marketing, and research projects. Expert digital services for modern businesses."
        keywords="website development, app development, AI development, digital marketing, web design, mobile apps, ecommerce development, custom websites, Indian Webify"
        url="/"
        image="/indianwebify.png"
        jsonLd={websiteJsonLd}
      />
      <div>
        <Navbar />
        <HeroSection />
        {/* <ServicesSection/>
        <WhyChooseUsSection />
        <AboutUsSection/>
        <PortfolioSection/>
        <ProcessSection/> */}
        <FooterSection />
      </div>
    </>
  )
}

export default Home
