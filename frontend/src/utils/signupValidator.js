import * as yup from 'yup'
import { setLocale } from 'yup'

export default () => {
  setLocale({
    mixed: {
      required: 'signup.form.feedbacks.required',
      oneOf: 'signup.form.feedbacks.confirmPassword',
    },
    string: {
      min: ({ path }) => path === 'username' ? 'signup.form.feedbacks.username' : 'signup.form.feedbacks.password',
      max: 'signup.form.feedbacks.username',
    },
  })

  return yup.object().shape({
    username: yup
      .string()
      .required()
      .min(3)
      .max(20),
    password: yup
      .string()
      .required()
      .min(6),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
  })
}
