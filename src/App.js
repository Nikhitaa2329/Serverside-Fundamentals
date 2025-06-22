import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ConceptsOverview from './components/ConceptsOverview';
import InteractiveModules from './components/InteractiveModules';
import CodeExamples from './components/CodeExamples';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

function App() {
  const [currentSection, setCurrentSection] = useState('overview');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSection(sectionId);
  };

  return (
    <div className="App">
      <Header onNavigate={scrollToSection} currentSection={currentSection} />
      
      <main>
        <Hero />
        
        <section id="overview" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ConceptsOverview />
            </motion.div>
          </div>
        </section>

        <section id="modules" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InteractiveModules />
            </motion.div>
          </div>
        </section>

        <section id="examples" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <CodeExamples />
            </motion.div>
          </div>
        </section>

        <section id="architecture" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <ArchitectureDiagram />
            </motion.div>
          </div>
        </section>

        <section id="quiz" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Quiz />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App; 