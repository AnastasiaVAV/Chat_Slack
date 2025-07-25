import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { logIn } from '../slices/authSlice.js'
import routes from '../routes.js'
import avatarImage from '../assets/avatar-login.jpg'

const LoginPage = () => {
  const inputUsername = useRef()
  const [authFailed, setAuthFailed] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    inputUsername.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false)
      try {
        const res = await axios.post(routes.loginPath(), values)
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
    },
  })

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Row className="card-body p-5">
              <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
                <img src={avatarImage} className="rounded-circle" alt="Войти" />
              </Col>

              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.enter')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="form-control"
                    placeholder={t('login.form.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputUsername}
                    isInvalid={authFailed}
                  />
                  <Form.Label className="form-label" htmlFor="username">{t('login.form.username')}</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="form-control"
                    placeholder={t('login.form.password')}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label className="form-label" htmlFor="password">{t('login.form.password')}</Form.Label>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('login.form.feedback')}
                    </Form.Control.Feedback>
                  )}

                </Form.Group>
                <Button className="w-100 mb-3 btn" variant="outline-primary" type="submit">{t('login.form.submit')}</Button>
              </Form>
            </Row>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.noAccountQuestion')}</span>
                {' '}
                <a href="/signup">{t('login.registration')}</a>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
