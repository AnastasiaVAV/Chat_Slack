import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { actions as authActions } from '../slices/authSlice.js'
import validator from '../utils/signupValidator.js'
import avatarImage from '../assets/avatar-signup.jpg'
import apiRequests from '../services/api.js'

const FormGroup = ({ name, formik, t, signupFailed, inputRef, type = 'text' }) => {
  return (
    <Form.Group className="form-floating mb-3">
      <Form.Control
        onChange={formik.handleChange}
        value={formik.values[name]}
        className="form-control"
        placeholder={t(`signup.form.${name}`)}
        onBlur={formik.handleBlur}
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        required
        ref={inputRef}
        isInvalid={(formik.touched[name] && !!formik.errors[name]) || signupFailed}
        aria-describedby={`${name}-error`}
      />
      <Form.Label className="form-label" htmlFor={name}>
        {t(`signup.form.${name}`)}
      </Form.Label>
      <Form.Control.Feedback type="invalid" tooltip>
        {signupFailed && name === 'confirmPassword'
          ? t('signup.form.feedbacks.uniqueUser')
          : t(formik.errors[name])}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

const SignupPage = () => {
  const inputUsername = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [signupFailed, setSignupFailed] = useState(false)
  const [isLoading, setLoading] = useState(false)

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
    validateOnBlur: true,
    onSubmit: async ({ username, password }) => {
      try {
        setLoading(true)
        const newUser = { username, password }
        const userData = await apiRequests.signup(newUser)
        localStorage.setItem('userId', JSON.stringify(userData))
        dispatch(authActions.logIn(userData))
        navigate('/')
      }
      catch (err) {
        setLoading(false)
        if (err.status === 409) {
          setSignupFailed(true)
          inputUsername.current.focus()
          return
        }
        toast.error(t('signup.popUp.fetchError'))
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
                <FormGroup
                  name="username"
                  formik={formik}
                  t={t}
                  signupFailed={signupFailed}
                  inputRef={inputUsername}
                />
                <FormGroup
                  name="password"
                  formik={formik}
                  t={t}
                  signupFailed={signupFailed}
                  type="password"
                />
                <FormGroup
                  name="confirmPassword"
                  formik={formik}
                  t={t}
                  signupFailed={signupFailed}
                  type="password"
                />
                <Button
                  className="w-100 mb-3 btn"
                  variant="outline-primary"
                  type="submit"
                  disabled={isLoading}
                >
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
