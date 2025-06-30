import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppPOS from './AppPOS.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppPOS />
  </StrictMode>,
)
