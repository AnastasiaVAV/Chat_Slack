import { StrictMode } from 'react'
import './index.css'

import init from './init.js'
import store from './slices/index.js'
import socket from './socket.js'
import App from './App.jsx'

init(store, socket, document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
