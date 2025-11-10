import React from 'react'
import BrandMeHero from './Hero'
import BrandMeChallenges from './Challenge'
import BrandMeSolution from './Solution'
import DesignTechStack from './TechStack'
import ReflectionLearning from './ReflectionLearning'
import BrandMeDesignShowcase from './BrandMeDesignShowcase'
import DesignJourney from './DesignJourney'
import FinalCTA from './CtaBanner'
import Footer from './Footer'
import Navbar from "./Navbar"
import TechStackSection from './TechStack'
export default function DesignProject() {
  return (
    <>
    <Navbar/>
    <BrandMeHero/>    
    <BrandMeChallenges/>
    <BrandMeSolution/>
    <DesignTechStack/>
   <BrandMeDesignShowcase/>
   <DesignJourney/>
    <ReflectionLearning/>
    <FinalCTA/>
    <Footer/>
    </>
  )
}
