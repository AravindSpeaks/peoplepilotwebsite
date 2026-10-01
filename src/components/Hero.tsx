import React from 'react'

export default function Hero(){
  return (
    <section className="hero container" id="hero">
      <div className="hero-text">
        <h1>HR, reimagined around people.</h1>
        <p className="lead">PeoplePilot brings the everyday workflows of HR into one connected workspace — helping teams manage performance, hiring, referrals, travel, learning and more.</p>
        <div className="hero-ctas">
          <a className="btn primary" href="#product">Explore PeoplePilot</a>
          <a className="btn" href="#mockups">See how it works</a>
        </div>
      </div>
      <div className="hero-art">
        <div className="mock-window">
          <div className="mock-top">
            <span></span><span></span><span></span>
          </div>
          <div className="mock-body">
            <div className="sidebar">
              <ul>
                <li className="active">Home</li>
                <li>Performance</li>
                <li>Requisitions</li>
                <li>Referrals</li>
                <li>Travel</li>
                <li>Learning</li>
              </ul>
            </div>
            <div className="content">
              <h3>Team performance</h3>
              <div className="cards">
                <div className="card small">
                  <strong>Goals</strong>
                  <div className="progress" style={{width:'90%'}}></div>
                </div>
                <div className="card small">
                  <strong>Reviews</strong>
                  <div className="progress" style={{width:'40%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
