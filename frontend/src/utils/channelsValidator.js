import * as yup from 'yup'
import { setLocale } from 'yup'

export default (channels) => {
  setLocale({
    mixed: {
      notOneOf: 'modal.channelsErrors.notOneOf',
      required: 'modal.channelsErrors.required',
    },
    string: {
      min: 'modal.channelsErrors.length',
      max: 'modal.channelsErrors.length',
    },
  })

  return yup.object().shape({
    body: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channels.map(channel => channel.name)),
  })
}
