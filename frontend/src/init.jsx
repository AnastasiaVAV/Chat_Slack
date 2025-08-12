import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import resources from './locales/index.js'

import App from './App.jsx'

import { actions as channelsActions } from './slices/channelsSlice.js'
import { actions as messagesActions } from './slices/messagesSlice.js'

const init = (store, socket, rootElement) => {
  const i18nInstance = i18next.createInstance()
  i18nInstance.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  })

  socket.on('newMessage', payload => store.dispatch(messagesActions.addMessage(payload)))
  socket.on('newChannel', payload => store.dispatch(channelsActions.addChannel(payload)))
  socket.on('renameChannel', payload => store.dispatch(channelsActions.renameChannel(payload)))
  socket.on('removeChannel', payload => store.dispatch(channelsActions.removeChannel(payload)))

  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18nInstance}>
          <App />
        </I18nextProvider>
      </Provider>
    </StrictMode>,
  )
}

export default init
