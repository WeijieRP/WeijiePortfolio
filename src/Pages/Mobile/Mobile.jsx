import React from 'react'
import Footer from './Footer'
import PortfolioHero from './Hero'
import FeaturedProjectsZigZag from './ProjectGallery'
import ProjectsBuilt from './ProjectsBuilt'
import ProjectCTA from './ProjectsCTA'

export default function Mobile() {
  return (
    <>
    <PortfolioHero/>
    <FeaturedProjectsZigZag/>
    <ProjectsBuilt/>
    <ProjectCTA/>
    <Footer/>
    </>
  )
}
