import React from 'react'
import PortfolioHero from './Hero';
import DevelopmentJourney from './DevelopmentJourney';
import ReflectionLearnings from './ReflectionLearnings';
import OverviewSection from './OverviewSection';
import ChallengeSection from './ChallengeSection';
import TechStackSection from './TechStackSections';
import SolutionsSection from './SolutionSection';
import ProjectCTA from './ProjectsCTA';
import DevelopmentJourneySection from './DevelopmentJourney';
import HorizontalTimeframe from './DevelopmentJourney';
import ReflectionJourney from './ReflectionLearnings';
import CTASection from './ProjectsCTA';
import Navbar from '../Design/Designdetail2/Navbar';
import Footer from '../Design/Designdetail2/Footer';
import FinalCTA from './ProjectsCTA';
import ProblemSection from './ChallengeSection';
export default function ProjectWebsite1() {
  return (
    <>
    <Navbar/>
<PortfolioHero/>
<ProblemSection/>
<SolutionsSection/>
<TechStackSection/>
<HorizontalTimeframe/>
<ReflectionJourney/>
<FinalCTA/>
<Footer/>

    </>
  )
}
