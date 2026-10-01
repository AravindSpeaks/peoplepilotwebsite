import React, {useEffect, useState, useRef} from 'react'

type Status = 'idle'|'sending'|'success'|'error'

export default function ContactModal(){
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [endpoint, setEndpoint] = useState('')
  const [hp, setHp] = useState('')

  useEffect(()=>{
    // listen for global trigger
    const onOpen = ()=> setOpen(true)
    window.addEventListener('openContactModal', onOpen as any)
    // load config
    fetch('/contact-config.json').then(r=>r.json()).then((cfg:any)=>{
      if(cfg && cfg.endpoint) setEndpoint(cfg.endpoint)
    }).catch(()=>{})
    ;(window as any).openContactForm = ()=> window.dispatchEvent(new Event('openContactModal'))
    return ()=> window.removeEventListener('openContactModal', onOpen as any)
  },[])

  // focus trap refs
  const firstRef = useRef<HTMLInputElement|null>(null)
  const lastRef = useRef<HTMLButtonElement|null>(null)

  useEffect(()=>{
    if(open){
      setTimeout(()=> firstRef.current?.focus(), 50)
      const onKey = (e:KeyboardEvent)=>{
        if(e.key === 'Escape') close()
        if(e.key === 'Tab'){
          const focusable = Array.from(document.querySelectorAll('.modal-panel button, .modal-panel input, .modal-panel textarea, .modal-panel a')) as HTMLElement[]
          if(focusable.length){
            const idx = focusable.indexOf(document.activeElement as HTMLElement)
            if(e.shiftKey && idx === 0){ e.preventDefault(); focusable[focusable.length-1].focus() }
            if(!e.shiftKey && idx === focusable.length-1){ e.preventDefault(); focusable[0].focus() }
          }
        }
      }
      window.addEventListener('keydown', onKey)
      return ()=> window.removeEventListener('keydown', onKey)
    }
  },[open])

  function close(){ setOpen(false); setStatus('idle') }

  async function submit(e:React.FormEvent){
    e.preventDefault()
    if(hp && hp.trim() !== '') { setStatus('error'); return }
    // basic client-side validation
    if(!email || !message) { setStatus('error'); return }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setStatus('error'); return }
    if(message.length > 4000){ setStatus('error'); return }
    setStatus('sending')
    try{
      if(endpoint){
        const response = await fetch(endpoint, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({name, email, message, hp})
        })
        if(!response.ok){
          throw new Error('Endpoint failed: ' + response.status)
        }
        setStatus('success')
      }else{
        // direct email fallback for static-site hosting
        const subject = encodeURIComponent('PeoplePilot inquiry from ' + (name||email))
        const body = encodeURIComponent(message + '\n\n' + (email ? ('Reply: ' + email) : ''))
        window.location.href = `mailto:info@peoplepilot.co.in?subject=${subject}&body=${body}`
        setStatus('success')
      }
    }catch(err){
      // fallback gracefully to direct email if endpoint is unavailable
      const subject = encodeURIComponent('PeoplePilot inquiry from ' + (name||email))
      const body = encodeURIComponent(message + '\n\n' + (email ? ('Reply: ' + email) : ''))
      window.location.href = `mailto:info@peoplepilot.co.in?subject=${subject}&body=${body}`
      setStatus('success')
    }
  }

  if(!open) return null

  return (
    <div className="contact-modal" role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={close}></div>
      <div className="modal-panel">
        <button className="modal-close" aria-label="Close" onClick={close}>×</button>
        <h3>Get in touch</h3>
        <p className="muted">If you'd like to talk about PeoplePilot or have a workflow to solve, send a message.</p>
        <form onSubmit={submit}>
          {/* Honeypot field to catch bots - hidden from users */}
          <label style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden>
            Leave this field empty
            <input value={hp} onChange={e=>setHp(e.target.value)} name="hp" autoComplete="off" />
          </label>
          <label>
            Name
            <input ref={firstRef} maxLength={200} value={name} onChange={e=>setName(e.target.value)} />
          </label>
          <label>
            Email
            <input maxLength={320} value={email} onChange={e=>setEmail(e.target.value)} type="email" />
          </label>
          <label>
            Message
            <textarea maxLength={4000} value={message} onChange={e=>setMessage(e.target.value)} rows={6} />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={close}>Cancel</button>
            <button ref={lastRef} className="btn primary" type="submit">{status==='sending' ? 'Sending…' : 'Send message'}</button>
          </div>
          {status==='success' && <div className="note success">Thanks — message sent.</div>}
          {status==='error' && <div className="note error">There was an error. Please try again or email info@peoplepilot.co.in</div>}
        </form>
      </div>
    </div>
  )
}
