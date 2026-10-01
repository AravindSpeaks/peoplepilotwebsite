import React from 'react'

export default function Problem(){
  return (
    <section className="problem container">
      <h2>HR shouldn't have to run on spreadsheets, emails and follow-ups.</h2>
      <p className="muted">HR teams spend too much time connecting systems, chasing approvals and updating multiple places. PeoplePilot is designed to connect those workflows into a single workspace.</p>
      <div className="flow">
        <div className="step">Spreadsheet</div>
        <div className="arrow">→</div>
        <div className="step">Email</div>
        <div className="arrow">→</div>
        <div className="step">Approval</div>
        <div className="arrow">→</div>
        <div className="step">Follow-up</div>
        <div className="arrow">→</div>
        <div className="step">Manual update</div>
      </div>
    </section>
  )
}
