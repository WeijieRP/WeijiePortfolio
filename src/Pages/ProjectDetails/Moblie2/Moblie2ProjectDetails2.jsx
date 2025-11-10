import React from 'react'
import Navbar from '../Design/Designdetail1/Navbar'
import Footer from '../Design/Designdetail2/Footer'
import BrandMeHero from './Hero'
import ChallengeSection from './Challenege'
import BrandMeSolution from './Solution'
import TechStackSection from './TechStack'
import ARImageCardDemo from './Showcase'
import DesignJourneyCarousel from './DevelopmentJourney'
import ReflectionLearning from './ReflectionLearning'

export default function Moblie2ProjectDetails2() {
  return (
    <>
    <Navbar/>
    <BrandMeHero/>
    <ChallengeSection/>
    <BrandMeSolution/>
    <TechStackSection/>
    <ARImageCardDemo/>
    <DesignJourneyCarousel/>
    <ReflectionLearning/>
    <Footer/>
    </>
  )
}
