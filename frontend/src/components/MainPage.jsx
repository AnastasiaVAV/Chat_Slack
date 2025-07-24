import { Link, Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        </div>
      </nav>
      <main className="flex-grow-1 d-flex">
        <div className="container-fluid d-flex flex-column">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainPage
