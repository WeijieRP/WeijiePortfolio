import React from 'react'
import ChallengeCA1 from './ChallengeSection'
import SolutionCA1 from './Solution'
import TechStackCA1 from './TechStack'
import TimeframeCA1 from './DevelopmentJourney'
import ReflectionCA1 from './ReflectionLearnings'
import CTASection from './ProjectsCTA'
import PortfolioHero from "./Hero"
import ChallengeSection from './ChallengeSection'
import TechStackSection from './TechStack'
import TimeframeCarousel from './DevelopmentJourney'
import ReflectionLearning from './ReflectionLearnings'
import FinalCTA from './ProjectsCTA'
import Navbar from '../../Design/Designdetail2/Navbar'
import Footer from '../../Design/Designdetail1/Footer'
export default function ProjectDetailsWebsite2() {
  return (
    <>
<Navbar/>
  <PortfolioHero/>
  <ChallengeSection/>
  <SolutionCA1/>
  <TechStackSection/>
  <TimeframeCarousel/>
  <ReflectionLearning/>
  <FinalCTA/>
  <Footer/>
    </>
  )
}
