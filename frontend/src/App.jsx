import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './slices/index.js'
import NotFoundPage from './components/NotFoundPage.jsx'
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App
