import { io } from 'socket.io-client'

const socket = io('', { // Пустая строка - подключаемся к текущему домену
  path: '/socket.io', // Должен совпадать с путем в vite.config.js
})

export default socket
