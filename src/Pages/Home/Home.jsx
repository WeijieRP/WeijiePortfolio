
import Navbar from "../../Components/Navbar";

import "../../Components/footer.css"
import "../../Components/navbar.css"
import FeaturedProjects from "./FeaturedProjects";
import ToolsSection from "./toolsection";

import Footer from "../../Components/Footer";
import ContactCTA from "./ContactCTA";
import HomeHero from "./Hero";
import Experience from "./ExperienceSection";
export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="main-page-wrap">
        <HomeHero/>
        <Experience/> 
        <ToolsSection/>
        <FeaturedProjects/>
        <ContactCTA/>
        <Footer/>
      </div>
    </>
  );
}
