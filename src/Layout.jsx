import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
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
         {/* 👇 This is the official scroll fix */}
      <ScrollRestoration
        getKey={(location, matches) => {
          // Always treat each pathname as a new page ⇒ go to top on nav,
          // but keep restore on back/forward automatically.
          return location.pathname;
        }}
      />
        <Outlet />
        <ScrollToTopButton forceVisible containerSelector="#root" />
      </RippleWrapper>
    </>
  );
}
