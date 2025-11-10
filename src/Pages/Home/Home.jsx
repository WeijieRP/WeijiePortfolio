
import Navbar from "../../Components/Navbar";
import "./hero.css";
import "./experience.css";
import "./feature.css"
import "./tools.css";
import "./contactHome.css"
import "../../Components/footer.css"
import "../../Components/navbar.css"
import ExperienceSection from "./ExperienceSection";
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
