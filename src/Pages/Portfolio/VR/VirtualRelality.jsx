import React from 'react'
import FeaturedProjectsZigZag from './FeaturedProjects'
import PortfolioHero from './Hero'
import ProjectsBuilt from './ProjectsBuilt'
import ProjectCTA from './ProjectsCTA'
import Navbar from '../../ProjectDetails/Design/Designdetail2/Navbar'
import Footer from '../../ProjectDetails/Design/Designdetail2/Footer'
import FeaturedVR from './FeaturedProjects'
import ProjectsBuiltVR from './ProjectsBuilt'

export default function VirtualRelality() {
  return (
    <>
    <Navbar/>
    <ProjectCTA/>
    <FeaturedVR/>
    <ProjectsBuiltVR/>
    <Footer/>
    </>
  )
}
