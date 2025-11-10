import React from 'react'
import EventHero from './Hero'
import ProblemChallenges from './ProblemChallenges'
import SolutionDesign from './Solution'
import DevTimelineCarousel_NoMotion from './DevelopmentJourney'
import ReflectionLearning_NoMotion from './ReflectionLearning'
import FinalCTA_NoMotion from './FinalCTA'
import DesignShowcase from './DesignShowcase'
import Navbar from './Navbar'
import Footer from './Footer'
import DesignTechStack from './TechStack'
import ReflectionLearning_ScrollSlide from './ReflectionLearning'
import DesignJourney from './DevelopmentJourney'
import BrandMeSolution from './Solution'
import TechStackSection from './TechStack'

export default function ProjectDesign2() {
  return (
    <>
    <Navbar/>
       <EventHero/>
    <ProblemChallenges/>
    <SolutionDesign/>
    <TechStackSection/>
    <DesignShowcase/>
    <DesignJourney/>
    <ReflectionLearning_ScrollSlide/>
    <FinalCTA_NoMotion/>
    <Footer/>
    </>
  )
}
