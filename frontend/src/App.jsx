import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import store from './slices/index.js'

import RollbarProvider from './contexts/RollbarProvider.jsx'
import ContentFilterProvider from './contexts/ContentFilterProvider.jsx'

import NotFoundPage from './components/NotFoundPage.jsx'
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import ChatPage from './components/ChatPage.jsx'
import SignupPage from './components/SignupPage.jsx'

const MainComponent = () => {
  const userToken = useSelector(state => state.authorization?.token)
  return (
    <>
      {userToken ? <ChatPage /> : <LoginPage />}
    </>
  )
}

const App = () => {
  return (
    <RollbarProvider>
      <Provider store={store}>
        <ContentFilterProvider>
          <BrowserRouter>
            <div className="Toastify">
              <ToastContainer />
            </div>
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route index element={<MainComponent />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContentFilterProvider>
      </Provider>
    </RollbarProvider>
  )
}

export default App
