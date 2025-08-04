import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap'

import { actions as authActions } from '../slices/authSlice.js'
import { useAddUserMutation } from '../services/authApi.js'
import avatarImage from '../assets/avatar-signup.jpg'
import validator from '../utils/signupValidator.js'

const SignupPage = () => {
  const inputUsername = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [signupFailed, setSignupFailed] = useState(false)
  const [addUser] = useAddUserMutation()

  useEffect(() => {
    inputUsername.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validator(),
    onSubmit: async ({ username, password }) => {
      try {
        setLoading(true)
        setSignupFailed(false)
        const newUser = { username, password }
        const userData = await addUser(newUser).unwrap()
        localStorage.setItem('userId', JSON.stringify(userData))
        dispatch(authActions.logIn(userData))
        setLoading(false)
        navigate('/')
      }
      catch (err) {
        formik.setSubmitting(false)
        console.log('ошибка 409')
        if (err.status === 409) {
          setSignupFailed(true)
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
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="form-control"
                    placeholder={t('signup.form.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputUsername}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                  />
                  <Form.Label className="form-label" htmlFor="username">{t('signup.form.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="form-control"
                    placeholder={t('signup.form.password')}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    required
                  />
                  <Form.Label className="form-label" htmlFor="password">{t('signup.form.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    className="form-control"
                    placeholder={t('signup.form.confirmPassword')}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    required
                  />
                  <Form.Label className="form-label" htmlFor="confirmPassword">{t('signup.form.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                  {signupFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('signup.form.feedbacks.uniqueUser')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button className="w-100 mb-3 btn" variant="outline-primary" type="submit" disabled={loading}>
                  {t('signup.form.submit')}
                </Button>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage
