import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="parent-form-div">
              <div className="sub-form-data">
                <div className="form-top-heading mt-2">Log In</div>
                <form className='mt-2'>

                  <div className="user-name-feild-div">
                    <label htmlFor="" className='user-name-label-feild'> UserName </label>
                    <br />
                    <input type="text" className='user-name-input mt-2' />
                  </div>

                  <div className="user-password-feild mt-5">
                    <label htmlFor="" className='user-password-label-feild'> Password </label>
                    <br />
                    <input type="text" className='user-password-input mt-2' />
                  </div>

                  <div className="button-parent mt-5 d-flex justify-content-around">
                    <div className="login-btn btn btn-success">Log In</div>
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