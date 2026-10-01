import React from 'react'

export default function CTA(){
  function open(){ (window as any).openContactForm && (window as any).openContactForm() }
  return (
    <section className="final-cta container" id="contact">
      <h2>Let's build better HR workflows.</h2>
      <p className="muted">PeoplePilot is evolving. If you have an HR workflow worth solving or want to learn more, get in touch.</p>
      <button className="btn primary" onClick={open}>Get in touch</button>
    </section>
  )
}
