import React from 'react'

const cards = [
  {title:'Simple', body:'Reduce unnecessary steps and administrative friction.'},
  {title:'Connected', body:'Bring related HR workflows into one environment.'},
  {title:'Practical', body:'Built around real operational problems.'},
  {title:'Human', body:'Technology should support people, not make work mechanical.'}
]

export default function Philosophy(){
  return (
    <section className="philosophy container" id="philosophy">
      <h2>Built around how HR actually works.</h2>
      <div className="cards-grid">
        {cards.map(c=> (
          <div className="ph-card" key={c.title}>
            <h4>{c.title}</h4>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
