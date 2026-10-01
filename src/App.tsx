import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Philosophy from './components/Philosophy'
import Ecosystem from './components/Ecosystem'
import Mockups from './components/Mockups'
import HowItWorks from './components/HowItWorks'
import Creator from './components/Creator'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhoFor from './components/WhoFor'
import Difference from './components/Difference'
import Origin from './components/Origin'
import Vision from './components/Vision'
import ContactModal from './components/ContactModal'

export default function App(){
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Philosophy />
        <Ecosystem />
        <Mockups />
        <WhoFor />
        <Difference />
        <Origin />
        <Vision />
        <HowItWorks />
        <Creator />
        <CTA />
      </main>
      <Footer />
      <ContactModal />
    </div>
  )
}
