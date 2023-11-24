import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store/store'
import { pollManage } from '../../Redux/slice/AdminPoll'
import { useNavigate } from 'react-router-dom'
import { resetReducer } from '../../Redux/slice/login'


const UsersPoll = () => {
  const pollList = useSelector((state) => state.pollSlice.data.data)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(pollManage())
  }, [pollList])

  const logOut = () => {
    navigate('/login')
    dispatch(resetReducer())
  }

  if (!pollList) {
    return <h3 className='text-warning'> <center> Loading.... </center> </h3>
  }

  return (
    <>
      <center> <h2 className='text-light'> welcome to User Poll</h2>
        <div className="float-right text-danger mx-5" onClick={() => logOut()}>Logout</div>
      </center>
      <div className='container data-container'>
        <div className="row">
          <div className="col">
            {pollList.length > 0 && pollList.slice().reverse().map((dataList) => (
              <div className="card my-3" key={dataList._id}>
                <div>
                  <div className="card-header bg-success">
                    <h5 className="card-title">{dataList.title}</h5>
                  </div>
                  <div className="card-body">
                    {dataList.options.map((option, index) => (
                      <div className="form-check" key={index}>

                        <input
                          className="form-check-input input-radio-btn"
                          type="radio"
                          name="exampleRadios" id="exampleRadios2"
                          value={option.option} />

                        <label
                          className="form-check-label mx-2"
                          htmlFor="exampleRadios2">
                          <div className='text-sm text-md-lg text-lg-xl'>
                            {option.option}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-3 text-light'>
        <p> Rows per page: </p>
        <select className='mx-3 mb-4 text-light'
          style={{ background: 'none', border: 'none' }} >
          <option className='text-dark'>5</option>
          <option className='text-dark'>10</option>
          <option className='text-dark'>15</option>
        </select>
      </div>
    </>
  )
}

export default UsersPoll






