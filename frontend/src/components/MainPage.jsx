import { Link, Outlet } from 'react-router-dom'
import { Container, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { actions as authActions } from '../slices/authSlice.js'

const MainPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authorization)

  const handleLogout = () => {
    localStorage.removeItem('userId')
    dispatch(authActions.logOut())
  }

  return (
    <div className="vh-100">
      <div className="h-100" id="chat">
        <Col className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <Container>
              <Link to="/" className="navbar-brand">Hexlet Chat</Link>
              {user && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              )}
            </Container>
          </nav>
          <Outlet />
        </Col>
        <></>
      </div>
    </div>
  )
}

export default MainPage
