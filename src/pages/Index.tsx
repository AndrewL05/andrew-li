import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import About from '../components/About';
import Footer from '../components/Footer';
import Activities from '../components/Activities';
import Particles from '../components/ui/Particles';
import BackToTop from '../components/BackToTop';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-slate-900 text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 z-0">
        <Particles
          particleCount={1000}
          particleSpread={10}
          speed={0.3}
          particleColors={["#3b82f6", "#1e40af", "#1d4ed8", "#2563eb", "#60a5fa"]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.5}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>
      
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Activities />
          <Skills />
          {/* <About /> */}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
};

export default Index;
