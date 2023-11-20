import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store/store'
import { pollManage } from '../../Redux/slice/AdminPoll'
import './Admin.css'
import Option from '../../component/option/Option'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPoll = () => {
  const [showInput, setShowInput] = useState(false)
  const [optionLength, setOptionLength] = useState(1)
  const pollList = useSelector((state) => state.pollSlice.data.data)


  useEffect(() => {
    dispatch(pollManage())
  }, [])
  if (!pollList) {
    return <h3> <center> Loading.... </center> </h3>
  }

  const increseLength = () => {
    if (optionLength < 4) {
      setOptionLength(optionLength + 1)
    }
    else {
      toast.error('only four options are allowed')
    }
  }

  return (
    <>
      <ToastContainer />
      <center> <h2> welcome to Admin Page</h2></center>
      <div className='mt-2 d-flex justify-content-center align-item-center mt-3'
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
                        <div className="form-check mt-2 p-2" key={option.option}
                          style={{ border: '1px solid grey', borderRadius: '10px' }}>

                          <div className="d-flex justify-content-between">
                            <div className='text-sm text-md-lg text-lg-xl '
                              style={{ wordWrap: 'break-word' }}>
                              {option.option}
                            </div>
                            <div className="icons d-flex">
                              <div className="vote-div mx-5">vote : 0</div>
                              <i className="fa-solid fa-trash"></i>
                            </div>
                          </div>
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
              {
                Array.from({ length: optionLength }).map((_, index) => (
                  <Option key={index} />
                ))
              }
              <div className="add-option mt-4">
                <h2 onClick={() => increseLength()}>+</h2>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary">Submit</button>
                <button className="btn btn-primary" onClick={() => setShowInput(false)}>
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