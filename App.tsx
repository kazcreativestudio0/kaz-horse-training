import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Partnerships } from './components/Partnerships';
import { About } from './components/About';
import { Plans } from './components/Plans';
import { Horses } from './components/Horses';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Plans />
        <Partnerships />
        <Horses />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;