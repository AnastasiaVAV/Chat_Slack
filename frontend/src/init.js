import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/index.js'

// import * as leoProfanity from 'leo-profanity'

import { io } from 'socket.io-client'
import { socketApi } from './services/socketApi.js'

// const initProfanityFilter = () => {
//   leoProfanity.loadDictionary('ru')
//   const enWords = leoProfanity.getDictionary('en')
//   console.log('leo')
//   leoProfanity.add(enWords)
//   return text => leoProfanity.clean(text)
// }

// export const profanityFilter = initProfanityFilter()

export default (store) => {
  const defaultLanguage = 'ru'
  const i18nInstance = i18next.createInstance()
  i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      interpolation: {
        escapeValue: false,
      },
    })

  const socket = io('', { // Пустая строка - подключаемся к текущему домену
    path: '/socket.io', // Должен совпадать с путем в vite.config.js
  })

  const initializeSocketListeners = (store, socket) => {
    store.dispatch(
      socketApi.endpoints.initSockets.initiate({ dispatch: store.dispatch, socket }),
    )
  }

  initializeSocketListeners(store, socket)
}
