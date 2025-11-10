import React from 'react'
import Navbar from '../Design/Navbar'
import Footer from '../Web/Footer'
import ProjectCTA from './Hero'
import FeaturedDesigns from './ProjectGallery'
import ProjectsBuilt from './ProjectsBuilt'

export default function Mobile() {
  return (
    <>
    <Navbar/>
    <ProjectCTA/>
    <FeaturedDesigns/>
    <ProjectsBuilt/>
    <Footer/>
    </>
  )
}
