import React from 'react'
import ForesightHero from './Hero'
import ForesightChallenge from './GeekOutChallenge'
import ForesightSolution from './GeekOutSolution'
import ForesightTech from './GeekOutTechStack'
import ForesightJourney from './GeekOutDevelopmentJourney'
import ForesightReflection from './ReflectionLearning'
import FinalCTA from './CTA'
import Navbar from '../../Design/Designdetail1/Navbar'
import Footer from '../../Design/Designdetail2/Footer'

export default function GeekOutProject() {
  return (
    <>
    <Navbar/>
    <ForesightHero/>
    <ForesightChallenge/>
    <ForesightSolution/>
    <ForesightTech/>
    <ForesightJourney/>
    <ForesightReflection/>
    <FinalCTA/>
    <Footer/>
    </>
  )
}
