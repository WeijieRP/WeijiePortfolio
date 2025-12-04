import React from 'react'
import Navbar from '../../Design/Designdetail2/Navbar'
import Footer from '../../Design/Designdetail2/Footer'
import Hero from './Hero'
import BrandMeHero from './Hero'
import ChallengeSection from './Challenge'
import BrandMeSolution from './Solution'
import DesignTechStack from './TechStack'
import DesignJourney from './DevelopmentJourney'
import ReflectionLearning from './ReflectionLearning'
import FinalCTA from './CTA'
import DemoGameplay from './Gameplayvideo'
import ARImageCardDemo from './Gameplayvideo'
import SolutionSection from './Challenge'

export default function VRProjectDetails1() {
  return (
    <>
    <Navbar/>
    <BrandMeHero/>
    <ChallengeSection/>
    <BrandMeSolution/>
    <DesignTechStack/>
    <ARImageCardDemo/>
    <DesignJourney/>
    <ReflectionLearning/>
    <FinalCTA/>
    <Footer/>
    </>
  )
}
