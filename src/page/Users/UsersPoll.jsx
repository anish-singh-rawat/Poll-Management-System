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
  }, [])

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
      <div className='container'>
        <div className="row">
          <div className="col">
            {pollList.length > 0 && pollList.slice().reverse().map((dataList) => (
              <div className="card my-3" key={dataList._id}>
                {
                  dataList.options.length > 0 &&
                  <div>
                    <div className="card-header">
                      <h5 className="card-title">{dataList.title}</h5>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option, index) => (
                        <div className="form-check" key={index}>

                          <input
                            className="form-check-input"
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
                 }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersPoll






