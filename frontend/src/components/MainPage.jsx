import { Link, Outlet } from 'react-router-dom'
import { Container, Col } from 'react-bootstrap'

const MainPage = () => {
  return (
    <div className="vh-100">
      <div className="h-100" id="chat">
        <Col className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <Container>
              <Link to="/" className="navbar-brand">Hexlet Chat</Link>
            </Container>
          </nav>
          <Outlet />
        </Col>
      </div>
    </div>
  )
}

export default MainPage
