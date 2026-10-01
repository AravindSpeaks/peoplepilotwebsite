import React from 'react'

const modules = [
  {title:'Performance Management', desc:'Goals, reviews and feedback cycles.'},
  {title:'Requisitions', desc:'Structured hiring requests and approvals.'},
  {title:'Employee Referrals', desc:'Internal referral workflow.'},
  {title:'Travel & Expenses', desc:'Requests, approvals and tracking.'},
  {title:'Learning & Development', desc:'Learning records and paths.'}
]

export default function Ecosystem(){
  return (
    <section className="ecosystem container" id="product">
      <h2>One workspace. Multiple HR workflows.</h2>
      <p className="muted">A modular platform connecting the everyday processes around people.</p>
      <div className="modules">
        {modules.map(m=> (
          <div className="module" key={m.title}>
            <h4>{m.title}</h4>
            <p>{m.desc}</p>
            <div className="badge">In development</div>
          </div>
        ))}
      </div>
    </section>
  )
}
