import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store/store'
import { pollManage } from '../../Redux/slice/userPoll'


const UsersPoll = () => {
  const pollList = useSelector((state) => state.pollSlice.data.data)

  useEffect(() => {
    dispatch(pollManage())
  }, [])

  if (!pollList) {
    return <h3> <center> Loading.... </center> </h3>
  }

  return (
    <>
      <center> <h1> welcome to User Poll</h1></center>
      <div className='container'>
        <div className="row">
          <div className="col">
            {pollList.length > 0 && pollList.map((dataList) => (
              <div className="card my-3" key={dataList._id}>
                <div className="card-header">
                  <h5 className="card-title">{dataList.title}</h5>
                </div>
                <div className="card-body">
                  {dataList.options.map((option, index) => (
                    <div className="form-check" key={option.option}>

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
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersPoll