import React from 'react'

export default function Mockups(){
  return (
    <section className="mockups container" id="mockups">
      <h2>Product UI showcase</h2>
      <p className="muted">Polished mockups showing the Home workspace, performance, referrals and requisitions.</p>
      <div className="mock-grid img-grid">
        <div className="mock-item"><img src="/mockups/dashboard.svg" alt="Dashboard mockup"/></div>
        <div className="mock-item"><img src="/mockups/performance.svg" alt="Performance mockup"/></div>
        <div className="mock-item"><img src="/mockups/referrals.svg" alt="Referrals mockup"/></div>
      </div>
    </section>
  )
}
