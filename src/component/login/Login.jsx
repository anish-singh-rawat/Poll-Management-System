import React, { useEffect } from 'react'
import { dispatch } from '../../Redux/store/store';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { schema } from '../../utilities/utilities';
import { login, resetReducer } from '../../Redux/slice/login';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  const loginSlice = useSelector((state) => state.loginSlice);
  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      localStorage.setItem("token", loginSlice.data.token);
      localStorage.setItem("role", decoded.role);
      dispatch(resetReducer());
      if (decoded.role === "admin" || decoded.role === "Admin") {
        navigate("/adminPoll");
      } else if (decoded.role === "Guest" || decoded.role === "guest") {
        navigate("/userPoll");
      }
    }
    else if (loginSlice.data.error === 1) {
      toast.error("user does not exist!");
    }
  }, [loginSlice.isSuccess])

  const formikData = useFormik({
    initialValues: {
      username: "",
      userpassword: "",
    },
    onSubmit: (values) => {
      try {
        if (!loginSlice.data.token) {
          dispatch(resetReducer());
        }
        dispatch(login(values));
      } catch (error) { }
    },
    validationSchema: schema,
  });

  return (
    <>
      <ToastContainer />
      <div className="container-fluid containe-for-sub-box ">
        <div className="row">
          <div className="col">
            <div className="parent-form-div">
              <div className="sub-form-data">
                <div className="form-top-heading mt-2">Log In</div>
                <form className='mt-2' onSubmit={formikData.handleSubmit}>

                  <div className="user-name-feild-div">
                    <label htmlFor="" className='user-name-label-feild'> UserName </label>
                    <br />
                    <input type="text"
                      name='username'
                      value={formikData.values.username}
                      onChange={formikData.handleChange}
                      className='user-name-input mt-2' />
                    {formikData.errors.username && formikData.touched.username &&
                      <p className="text-danger">{formikData.errors.username}</p>}
                  </div>

                  <div className="user-password-feild mt-5">
                    <label htmlFor="" className='user-password-label-feild'> Password </label>
                    <br />
                    <input type="password" name='userpassword'
                      value={formikData.values.userpassword}
                      onChange={formikData.handleChange}
                      className='user-password-input mt-2' />

                    {formikData.errors.userpassword
                      && formikData.touched.userpassword &&
                      <p className="text-danger">{formikData.errors.userpassword}
                      </p>}

                  </div>

                  <div className="button-parent mt-5 d-flex justify-content-around p-3">
                    <button type="submit" className="login-btn btn btn-success">Log In</button>
                    <Link to={'/signup'} className="singup-btn btn btn-success">Sign Up</Link>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login