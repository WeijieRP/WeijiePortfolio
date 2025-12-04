import Navbar from '../../../Components/Navbar'
import Footer from '../../../Components/Footer'
import ProjectGallery from './ProjectGallery'
import GitHubCTA from './GitHubCTA'
import ProjectCTA from './Hero'
import ProjectsBuilt from './ProjectCard'


export default function Portfolio() {
  return (
    <>
    <Navbar/>
<ProjectCTA/>
    <ProjectGallery/>
    <ProjectsBuilt/>
    <GitHubCTA/>
      <Footer/>
    </>
  )
}
