import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Games from './components/Games';

function App() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const currentSection = Math.round(window.scrollY / window.innerHeight);
      const totalSections = 4;
      
      if (delta > 0 && currentSection < totalSections) {
        window.scrollTo({
          top: (currentSection + 1) * window.innerHeight,
          behavior: 'smooth'
        });
      } else if (delta < 0 && currentSection > 0) {
        window.scrollTo({
          top: (currentSection - 1) * window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Games />
      </main>
    </div>
  );
}

export default App;