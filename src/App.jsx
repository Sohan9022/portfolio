import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ApproachSection from './components/ApproachSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-zinc-700 selection:text-zinc-100 font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ApproachSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
