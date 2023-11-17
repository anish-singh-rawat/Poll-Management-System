import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'
import { useFormik } from 'formik'
import { schema } from '../../utilities/utilities'
import { signup } from '../../Redux/slice/signUp'
import { useDispatch } from 'react-redux';

const SignUp = () => {

  const dispatch= useDispatch()

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      userpassword: '',
      role: 'guest'
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      try {
        dispatch(signup(values)); 
        navigate("/login")
      } catch (error) {
        console.log(error);
       }
    },
  })

  return (
    <div className="container-fluid containe-for-sub-box">
      <div className="row">
        <div className="col">
          <div className="parent-form-div-sign-up">
            <div className="sub-form-data">
              <div className="form-top-heading mt-2">Sign Up</div>
              <form className='mt-2' onSubmit={formik.handleSubmit}>

                <div className="user-name-feild-div">
                  <label htmlFor="" className='user-name-label-feild'> UserName </label>
                  <br />
                  <input type="text" name='username'
                    onChange={formik.handleChange}
                    value={formik.values.username} className='user-name-input mt-2' />

                  {
                    formik.errors.username &&
                    <p style={{ color: 'red' }}>
                      {formik.errors.username}
                    </p>
                  }

                </div>

                <div className="user-password-feild mt-5">
                  <label htmlFor="" className='user-password-label-feild'> Password </label>
                  <br />
                  <input type="password" name='userpassword'
                    onChange={formik.handleChange}
                    value={formik.values.userpassword} className='user-password-input mt-2' />
                  {
                    formik.errors.userpassword &&
                    <p style={{ color: 'red' }}>
                      {formik.errors.userpassword}
                    </p>
                  }
                </div>

                <div className="sign-up-role-div mt-5">
                  <div className="role-heading">Role</div>

                  <select name='role' onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className='select-role-options mt-3'>
                    <option value="guest">Guest</option>
                    <option value="admit">Admin</option>

                  </select>
                </div>

                <div className="button-parent mt-5 d-flex justify-content-around">
                  <button to={'/signup'} type='submit'
                    className="singup-btn btn btn-success">Sign Up</button>
                  <Link to={'/login'} className="login-btn btn btn-success">Sign in</Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp