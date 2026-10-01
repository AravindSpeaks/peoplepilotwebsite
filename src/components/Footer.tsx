import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="brand">
          <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect width="64" height="64" rx="12" fill="#06223A"/>
            <path d="M20 28c6-8 24-4 24 8" stroke="#3DD1C6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="20" cy="28" r="4" fill="#3DD1C6"/>
          </svg>
          <div className="wordmark small">PeoplePilot — HR, reimagined around people.</div>
        </div>
        <div className="foot-links">
          <div>Product</div>
          <div>Modules</div>
          <div>About</div>
          <div>Contact</div>
        </div>
      </div>
      <div className="copyright">© 2026 PeoplePilot. Created & developed by Aravind Thoomu. hello@aravindthoomu.in</div>
    </footer>
  )
}
