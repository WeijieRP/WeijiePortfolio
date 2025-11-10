import React from 'react'
import Navbar from '../Design/Designdetail1/Navbar'
import Footer from '../Design/Designdetail2/Footer'
import BrandMeHero from './Hero'
import ChallengeSection from './Challenge'
import BrandMeSolution from './Solution'
import TechStackSection from './Techstack'
import BrandMeDesignShowcase from './Showcase'
import ARImageCardDemo from './Showcase'
import DesignJourneyCarousel from './Developement'
import ReflectionLearning from './LearningJourney'
import ArcMobileSplit from './Showcase'

export default function MoblieProjectDetails1() {
  return (
  <>
  <Navbar/>
  <BrandMeHero/>
  <ChallengeSection/>
  <BrandMeSolution/>
  <TechStackSection/>
  <ArcMobileSplit/>
  <DesignJourneyCarousel/>
  <ReflectionLearning/>
  <Footer/>
  </>
  )
}
