import React, { useState } from "react";
import { IssueHound } from "../components/Animations";
import { hero, background, backgroundv2 } from "../assets";

function HomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="relative  rounded-md  top-0 w-full heightImage">
      <div classname="custom-shape-divider-top-1678419810 absolute top-0 h-1">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 fill-[#f9fafe] z-50"
        >
          <path
            d="M1200 0L0 0 892.25 114.72 1200 0z"
            classname="shape-fill absolute fill-white"
          ></path>
        </svg>
        <div className="polyGrid"></div>
      </div>

      <IssueHound />
      {/* <img src={hero} alt="download" className="heroImage" /> */}
    </div>
  );
}

export default HomePage;
