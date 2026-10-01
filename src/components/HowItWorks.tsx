import React from 'react'

const steps = [
  {num:'01', title:'Create', body:'Set up the workflow.'},
  {num:'02', title:'Connect', body:'Bring the people into the process.'},
  {num:'03', title:'Track', body:'Give HR and managers visibility.'},
  {num:'04', title:'Improve', body:'Use insights to make better decisions.'}
]

export default function HowItWorks(){
  return (
    <section className="how container">
      <h2>From process to progress.</h2>
      <div className="steps">
        {steps.map(s=> (
          <div className="step-card" key={s.num}>
            <div className="num">{s.num}</div>
            <div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
