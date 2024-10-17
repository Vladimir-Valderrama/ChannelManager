import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './templates/reservas.jsx'
import AppStock from "./templates/stock.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    <AppStock/>
  </StrictMode>,
)
