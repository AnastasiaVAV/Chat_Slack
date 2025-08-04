import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import store from './slices/index.js'

import NotFoundPage from './components/NotFoundPage.jsx'
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import ChatPage from './components/ChatPage.jsx'
import SignupPage from './components/SignupPage.jsx'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<ChatPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
