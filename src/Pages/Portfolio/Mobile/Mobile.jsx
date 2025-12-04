import React from 'react'
import Navbar from '../Design/Navbar'
import Footer from '../Web/Footer'
import FeaturedDesigns from './ProjectGallery'
import ProjectsBuilt from './ProjectsBuilt'
import MobileHero from "./MobileHero"
export default function Mobile() {
  return (
    <>
    <Navbar/>
    <MobileHero/>
    <ProjectsBuilt/>
    <Footer/>
    </>
  )
}
