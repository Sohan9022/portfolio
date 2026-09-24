import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveShowcase from './components/InteractiveShowcase';
import ProjectsSection from './components/ProjectsSection';
import CaseStudyDeepDive from './components/CaseStudyDeepDive';
import ProductPrinciples from './components/ProductPrinciples';
import DecisionLog from './components/DecisionLog';
import ProductTeardowns from './components/ProductTeardowns';
import ResearchSpotlight from './components/ResearchSpotlight';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#121214] font-sans antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <InteractiveShowcase />
        <ProjectsSection />
        <CaseStudyDeepDive />
        <ProductPrinciples />
        <DecisionLog />
        <ProductTeardowns />
        <ResearchSpotlight />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
