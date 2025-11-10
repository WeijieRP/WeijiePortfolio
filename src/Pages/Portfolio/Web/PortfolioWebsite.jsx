import React from 'react'
import WebsiteHero from './Hero'
import "../../../Components/footer.css"
import Footer from './Footer'
import FeaturedProjectsZigZag from './FeaturedProjects'
import ProjectCTA from './ProjectCTA'
import Navbar from './Navbar'
import ProjectsBuilt from './ProjectsBuilt'
import FeaturedWeb from './FeaturedProjects'
export default function PortfolioWebsite() {
  return (
    <>
    <Navbar/>
    
    <WebsiteHero/>
    <FeaturedWeb/>
    <ProjectsBuilt/>
    <Footer/>
    </>
  )
}
