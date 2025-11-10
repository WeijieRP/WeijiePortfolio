import React from 'react'
import Navbar from '../../Design/Designdetail2/Navbar'
import Footer from '../../Design/Designdetail2/Footer'
import BrandMeHero from './Hero'
import ChallengeSection from './Challenge'
import BrandMeSolution from './Solution'
import DesignTechStack from './TechStack'
import DesignJourney from './DevelopmentJourney'
import ReflectionLearning from './ReflectionLearning'
import FinalCTA from './CTA'
import EscapeRoomVRDemo from './Showcase'
import StoryboardGallery from './Storyboard'
import FlowchartsSection from './Flowchart'

export default function ProjectDetail2VR() {
  return (
    <>
    <Navbar/>
    <BrandMeHero/>
    <ChallengeSection/>
    <BrandMeSolution/>
    <DesignTechStack/>
   <StoryboardGallery   />

      <FlowchartsSection/>
    <EscapeRoomVRDemo/>
    <DesignJourney/>
    <ReflectionLearning/>
    <FinalCTA/>
    <Footer/>
    </>
  )
}
