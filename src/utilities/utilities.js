import * as yup from 'yup'

export const schema = yup.object().shape({
    username: yup.string()
      .required('this is required field'),

    userpassword: yup.string()
      .required('this is required field'),
  })