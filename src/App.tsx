import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Games from './components/Games';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-text-primary selection:bg-primary/30 selection:text-white">
      <Header />
      <main className="relative z-0">
        <Hero />
        <Skills />
        <Projects />
        <Games />
      </main>
      
      <footer className="py-8 text-center text-text-secondary text-sm bg-dark-bg border-t border-white/5">
        <p>© {new Date().getFullYear()} Isaac Gamble. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
