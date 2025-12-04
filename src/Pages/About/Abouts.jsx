import React from 'react'
import Navbar from '../../Components/Navbar'
import Hero from './Hero'
import "./aboutinfo.css";
import AboutIntro from './AboutInfo';
import "./highlight.css";
import StatsSection from './Highlight';
import MilestonesLayout from './MileStonesSection';
import Footer from '../../Components/Footer';
import "../../Components/footer.css"
import VisionSection from './VisionSection';
import TestimonialsSection from './Testimonial';
import CCASection from './CCA';
import TestimonialsITE from './Testimonial';
import ProjectCTA from './Hero';
const stats = [
  { icon: "/icons/note.png", value: 10, suffix: "+", subtitle: "Projects Completed" },
  { icon: "/icons/skills.png", value: 5, suffix: "+", subtitle: "Skills Mastered" },
  { icon: "/icons/diploma.png", titleTop: "Diploma", value: null, subtitle: "Digital Design & Dev" },
  { icon: "/icons/target.png", titleTop: "1 Goal", value: null, subtitle: "Build Experiences that Matter" },
];
export default function Abouts() {
  return (
    <>
    <Navbar/>
<ProjectCTA/>

      <StatsSection bgImage="/assets/lights-5310589.jpg" items={stats} />
  <MilestonesLayout
  bgImage='/assets/AboutBackgroundImage/adrian-mag-95qY2cTCeg0-unsplash.jpg'
/>
<TestimonialsITE/>
<CCASection/>
<VisionSection
  bgImage="assets/ai-generated-7751663.png"
/>     <Footer/>
      </>
  )
}
