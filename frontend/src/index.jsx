import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import init from './init.js'
import store from './slices/index.js'
import App from './App.jsx'

init(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
