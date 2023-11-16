import * as yup from 'yup'

export const schema = yup.object().shape({
    username: yup.string()
      .max(10, 'maximum 10 characters')
      .required('this is required field'),

    userpassword: yup.string()
      .min(6, 'minimum 10 characters')
      .required('this is required field'),
  })