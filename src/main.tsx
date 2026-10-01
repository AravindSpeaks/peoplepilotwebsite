import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Simple reveal: mark containers visible after load to trigger gentle entrance animations
function revealContainers(){
  try{ document.querySelectorAll('.container').forEach(el=> el.classList.add('visible')) }catch(e){}
}
if (document.readyState === 'complete') {
  revealContainers()
} else {
  window.addEventListener('load', revealContainers)
}
