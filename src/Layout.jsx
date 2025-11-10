import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import RippleWrapper from "./Components/RippleEffect";
import ScrollToTopButton from "./Components/ScrollToTop";
import BackgroundAudio from "./BackgroundAudio";

export default function Layout() {
  return (
    <>

      <RippleWrapper>
        <BackgroundAudio
          src="/assets/Audio/pleasant-atmosphere-153275.mp3"
          volume={0.8}
        />
        <Navbar />
        <Outlet />
        <ScrollToTopButton forceVisible containerSelector="#root" />
      </RippleWrapper>
    </>
  );
}
