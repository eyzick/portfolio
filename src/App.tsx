import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Games from './components/Games';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#080a09] text-[#f1f1ea]">
      <Header />
      <main className="relative z-0">
        <Hero />
        <Skills />
        <Projects />
        <Games />
        <section id="contact" className="border-t border-white/[0.08] bg-[#0c0f0d]">
          <div className="container grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <p className="section-label">04 · Contact</p>
            <div>
              <h2 className="section-title max-w-3xl">Have something in mind?</h2>
              <a
                href="mailto:gambleisaac@gmail.com"
                className="mt-8 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-xl text-white transition-colors hover:border-[#d6ff7f] hover:text-[#d6ff7f] md:text-2xl"
              >
                gambleisaac@gmail.com
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <div className="mt-7 flex gap-3">
                <a className="icon-button" href="https://github.com/eyzick" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
                <a className="icon-button" href="https://www.linkedin.com/in/isaac-gamble-423730129/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-white/[0.08] bg-[#080a09] px-6 py-8 text-center font-mono text-[11px] uppercase text-white/35">
        <p>© {new Date().getFullYear()} Isaac Gamble · End of signal</p>
      </footer>
    </div>
  );
}

export default App;
