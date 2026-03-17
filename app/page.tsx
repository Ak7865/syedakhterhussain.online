"use client";

import dynamic from "next/dynamic";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AiChat from "./components/AiChat";
import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import GlobeSection from "./sections/GlobeSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import EducationSection from "./sections/EducationSection";
import CareerSection from "./sections/CareerSection";
import ProjectsSection from "./sections/ProjectsSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";
import CodingProfilesSection from "./sections/CodingProfileSection";
import CookieBanner from "./components/CookieConsent";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />
      <CookieBanner />
      <main>
        <HeroSection />
        <StorySection />
        <GlobeSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <CareerSection />
        <ProjectsSection />
        <ServicesSection />
        <CodingProfilesSection />
        <ContactSection />
      </main>
      <Footer />
      <AiChat />
    </>
  );
}
