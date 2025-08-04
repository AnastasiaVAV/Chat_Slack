import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/index.js'
import { socketApi } from './services/socketApi.js'

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

  const initializeSocketListeners = store => store.dispatch(
    socketApi.endpoints.initSockets.initiate(store.dispatch),
  )
  initializeSocketListeners(store)
}
