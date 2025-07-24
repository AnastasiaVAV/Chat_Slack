import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logIn } from '../slices/authSlice.js'
import routes from '../routes.js'
import avatarImage from '../assets/avatar-login.jpg'
 
const LoginPage = () => {
  const inputUsername = useRef()
  const [authFailed, setAuthFailed] = useState(false)
  // const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  
  // const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    inputUsername.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      // console.log('login values:', values)
      setAuthFailed(false)
      try {
        const res = await axios.post(routes.loginPath(), values)
        // console.log("user's data:", res.data)
        localStorage.setItem('userId', JSON.stringify(res.data))
        dispatch(logIn(res.data))
        navigate('/')
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true)
          return
        }
        throw err
      }
    }
  })

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={avatarImage} className="rounded-circle" alt="Войти" />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="form-control" 
                  placeholder="Ваш ник" 
                  name="username" 
                  id="username" 
                  autoComplete="username" 
                  required 
                  ref={inputUsername}
                  isInvalid={authFailed}
                />
                <Form.Label className="form-label" htmlFor="username">Ваш ник</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mb-4">
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control" 
                  placeholder="Пароль"
                  type="password"
                  name="password" 
                  id="password" 
                  autoComplete="current-password" 
                  isInvalid={authFailed}
                  required
                />
                <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                {authFailed && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                )}
                
              </Form.Group>
              <Button className="w-100 mb-3 btn" variant="outline-primary" type="submit">Войти</Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage