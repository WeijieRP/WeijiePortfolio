import React from 'react'
import PortfolioHero from './Hero'
import ProjectGallery from './ProjectGallery'
import Footer from './Footer'
import ProjectsBuilt from './ProjectsBuilt'
import Navbar from './Navbar'
export default function PortfolioDesign() {
  return (
    <>
    <Navbar/>
    <PortfolioHero/>
    <ProjectGallery/>
    <ProjectsBuilt/>
    <Footer/>

    </>
  )
}
