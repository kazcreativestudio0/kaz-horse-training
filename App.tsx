import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Plans } from './components/Plans';
import { Horses } from './components/Horses';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GeminiAdvisor } from './components/GeminiAdvisor';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Plans />
        <Horses />
        <Contact />
      </main>
      <Footer />
      <GeminiAdvisor />
    </div>
  );
}

export default App;