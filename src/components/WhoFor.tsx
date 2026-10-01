import React from 'react'

const groups = [
  {title:'HR Teams', body:'Centralize everyday HR workflows and reduce administrative friction.'},
  {title:'Managers', body:'Give managers visibility and structured participation in people processes.'},
  {title:'Employees', body:'Make HR interactions simpler, clearer and easier to follow.'}
]

export default function WhoFor(){
  return (
    <section className="who container">
      <h2>Who PeoplePilot is for</h2>
      <div className="who-grid">
        {groups.map(g=> (
          <div className="who-card" key={g.title}>
            <h4>{g.title}</h4>
            <p className="muted">{g.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
