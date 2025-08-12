import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ToastMessage from './ToastMessage.jsx'

import { actions as authActions } from '../slices/authSlice.js'
import avatarImage from '../assets/avatar-login.jpg'
import apiRequests from '../services/api.js'
import useAuth from '../hooks/useAuth.js'

const LoginPage = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { logIn } = useAuth()
  const [authFailed, setAuthFailed] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setAuthFailed(false)
        setLoading(true)
        const userData = await apiRequests.login(values)
        logIn(userData)
        dispatch(authActions.logIn(userData))
        navigate('/')
      }
      catch (err) {
        if (err.status === 401) {
          setAuthFailed(true)
          inputRef.current.focus()
          return
        }
        toast.error(
          <ToastMessage>
            {t('login.popUp.fetchError')}
          </ToastMessage>,
        )
        throw err
      }
      finally {
        setLoading(false)
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
                <img src={avatarImage} className="rounded-circle" alt={t('login.title')} />
              </Col>

              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.title')}</h1>
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
                    ref={inputRef}
                    isInvalid={authFailed}
                  />
                  <Form.Label className="form-label" htmlFor="username">
                    {t('login.form.username')}
                  </Form.Label>
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
                    autoComplete="password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label className="form-label" htmlFor="password">
                    {t('login.form.password')}
                  </Form.Label>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('login.form.feedback')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button
                  className="w-100 mb-3 btn"
                  variant="outline-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {t('login.form.submit')}
                </Button>
              </Form>
            </Row>
            <div className="card-footer p-4">
              <div className="text-center">
                <Trans i18nKey="login.registration">
                  <a href="/signup"></a>
                </Trans>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
