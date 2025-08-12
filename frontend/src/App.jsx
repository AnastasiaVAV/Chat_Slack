import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import RollbarProvider from './contexts/RollbarProvider.jsx'
import ContentFilterProvider from './contexts/ContentFilterProvider.jsx'

import NotFoundPage from './components/NotFoundPage.jsx'
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import ChatPage from './components/ChatPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import useAuth from './hooks/useAuth.js'

const ProtectedRoute = ({ children }) => {
  const { userToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
  }, [userToken, navigate])

  return userToken && children
}

const App = () => {
  return (
    <RollbarProvider>
      <ContentFilterProvider>
        <BrowserRouter>
          <div className="Toastify">
            <ToastContainer />
          </div>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route
                index
                element={(
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                )}
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentFilterProvider>
    </RollbarProvider>
  )
}

export default App
