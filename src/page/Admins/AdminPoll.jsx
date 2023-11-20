import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store/store'
import { pollManage } from '../../Redux/slice/AdminPoll'
import './Admin.css'

const AdminPoll = () => {
  const [showInput, setShowInput] = useState(false)

  const pollList = useSelector((state) => state.pollSlice.data.data)
  useEffect(() => {
    dispatch(pollManage())
  }, [])
  if (!pollList) {
    return <h3> <center> Loading.... </center> </h3>
  }

  return (
    <>
      <center> <h1> welcome to Admin Page</h1></center>
      <div className='mt-4 d-flex justify-content-center align-item-center'
        style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => setShowInput(true)}>
        AddPoll +
      </div>

      {
        !showInput ?
          <div className='container mt-2' style={{ wordWrap: 'break-word' }}>
            <div className="row">
              <div className="col">
                {pollList.length > 0 && pollList.map((dataList) => (
                  <div className="card mt-3" key={dataList._id}>
                    <div className="card-header ">
                      <h5 className="card-title" style={{ wordWrap: 'break-word' }}>
                        {dataList.title}
                      </h5>
                      <div className="shift-right d-flex justify-content-around">
                        <i className="fa-regular fa-pen-to-square mx-5"></i>
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option) => (
                        <div className="form-check" key={option.option}>

                            <div className="d-flex justify-content-between">
                            <div className='text-sm text-md-lg text-lg-xl mt-3'
                              style={{ wordWrap: 'break-word' }}>
                              {option.option}
                            </div>
                            </div>
                          {/* <label
                            className="form-check-label mx-2"
                            htmlhtmlFor="exampleRadios2"> */}
                            
                          {/* </label> */}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          :

          <div>
            <form className='input-form mt-3'>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="email" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputPassword1">Option</label>
                <input type="text" className="form-control mt-2" 
                placeholder="option" />
              </div>
              <div className="add-option mt-4">
                <h2>+</h2>
              </div>
              <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-primary">Submit</button>
              <button className="btn btn-primary" onClick={()=>setShowInput(false)}>
                cencel
              </button>
              </div>
            </form>
          </div>
      }

    </>
  )
}

export default AdminPoll