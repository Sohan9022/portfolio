import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CaseStudyDeepDive from './components/CaseStudyDeepDive';
import ProductPrinciples from './components/ProductPrinciples';
import DecisionLog from './components/DecisionLog';
import ProductTeardowns from './components/ProductTeardowns';
import ResearchSpotlight from './components/ResearchSpotlight';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import AskNova from './components/AskNova';

export default function App() {
  const [novaOpen, setNovaOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#121214] font-sans antialiased selection:bg-slate-900 selection:text-white">
      <Navbar onOpenNova={() => setNovaOpen(true)} />
      <main>
        <HeroSection />
        <ProjectsSection />
        <CaseStudyDeepDive />
        <ProductPrinciples />
        <DecisionLog />
        <ProductTeardowns />
        <ResearchSpotlight />
        <AboutSection />
      </main>
      <Footer />
      <AskNova externalOpen={novaOpen} onExternalClose={() => setNovaOpen(false)} />
    </div>
  );
}
