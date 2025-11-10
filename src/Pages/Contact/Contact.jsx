import Navbar from "../../Components/Navbar";
import ContactHero from "./Hero";
import Footer from "../../Components/Footer";
import ContactMinimal from "./ContactSection";
import ContactCollabV2 from "./ContactSection";
import ProjectCTA from "./Hero";

export default function Contact() {
  return (
    <>
      <Navbar />
     <ProjectCTA/>
      <ContactCollabV2/>
      <Footer />
    </>
  );
}
