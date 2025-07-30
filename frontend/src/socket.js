import { io } from 'socket.io-client'

const socket = io('', { // Пустая строка - подключаемся к текущему домену
  path: '/socket.io', // Должен совпадать с путем в vite.config.js
  // autoConnect: false, // Подключаемся вручную после проверки авторизации
})

export default socket
