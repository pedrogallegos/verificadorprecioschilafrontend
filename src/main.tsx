import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppEcommerce from './AppEcommerce.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppEcommerce />
  </StrictMode>,
)
