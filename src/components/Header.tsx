import React, {useState, useEffect} from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light')

  useEffect(()=>{
    if(typeof document === 'undefined') return
    if(theme === 'dark'){
      document.documentElement.classList.add('theme-dark')
      try{ localStorage.setItem('pp-theme','dark') }catch(e){}
    }else{
      document.documentElement.classList.remove('theme-dark')
      try{ localStorage.setItem('pp-theme','light') }catch(e){}
    }
  },[theme])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <img src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'} alt="PeoplePilot logo" width={40} height={40} />
          <div className="wordmark">
            <strong>PeoplePilot</strong>
            <span className="tag">HR, reimagined around people.</span>
          </div>
        </div>

        <div className="header-actions">
          <button className="theme-toggle" aria-pressed={theme==='dark'} aria-label="Toggle dark mode" onClick={()=>setTheme(t=> t==='dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#FFF"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#06223A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>

          <button className="menu-toggle" aria-expanded={open} aria-label="Toggle navigation" onClick={()=>setOpen(v=>!v)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#06223A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className={`nav ${open? 'open':''}`}>
          <a href="#product" onClick={()=>setOpen(false)}>Product</a>
          <a href="#philosophy" onClick={()=>setOpen(false)}>Philosophy</a>
          <a href="#mockups" onClick={()=>setOpen(false)}>Showcase</a>
          <a href="#contact" className="cta" onClick={(e)=>{e.preventDefault(); setOpen(false); (window as any).openContactForm && (window as any).openContactForm()}}>Get in touch</a>
        </nav>
      </div>
    </header>
  )
}
