import './index.css'
import init from './init.jsx'
import store from './slices/index.js'
import socket from './socket.js'

init(store, socket, document.getElementById('root'))
