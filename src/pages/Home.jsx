import React, { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import WhatIDoSection from "@/components/home/WhatIDoSection";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import LatestWriting from "@/components/home/LatestWriting";
import PageMeta from "@/components/PageMeta";

const Home = () => {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("upcore-banner-dismissed")) {
      setBannerDismissed(true);
    }
  }, []);

  const dismissBanner = () => {
    sessionStorage.setItem("upcore-banner-dismissed", "true");
    setBannerDismissed(true);
  };

  return (
    <>
      <PageMeta />
      <div className="flex-grow flex flex-col">
        <HeroSection
          bannerDismissed={bannerDismissed}
          onDismissBanner={dismissBanner}
        />
        <WhatIDoSection />
        <TestimonialCarousel />
        <LatestWriting />
      </div>
    </>
  );
};

export default Home;
