import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store/store'
import { pollManage } from '../../Redux/slice/AdminPoll'
import './Admin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import { listData, resetReducer } from '../../Redux/slice/listData'
import { useNavigate } from 'react-router-dom'

const AdminPoll = () => {
  const [showInput, setShowInput] = useState(false)


  const pollList = useSelector((state) => state.pollSlice.data.data)
  const navigate = useNavigate()
  const [newOptions, setNewOptions] = useState([{ option: '' }]); 
  useEffect(() => {
    dispatch(pollManage())
  }, [])

  const formikData = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      try {
        if (values.title.trim() !== '') {
          dispatch(listData(values, newOptions));
          setShowInput(false)
          toast.success("data add successfully")
        }
        else {
          dispatch(resetReducer())
          toast.warning('Please enter a title or Opions')
        }
      }
      catch (error) {
      }
    },
  });

  const increseLength = () => {
    if (newOptions.length < 4) {
      setNewOptions([...newOptions, { option: '' }])
    }
    else {
      toast.error('only four options are allowed')
    }
  }

  const handleChange = (event, index) => {
    const { name, value } = event.target
    const onchangeValue = [...newOptions]
    onchangeValue[index][name] = value
    setNewOptions(onchangeValue)

  }

  const logOut = () => {
    navigate('/login')
    dispatch(resetReducer())
  }

  if (!pollList) {
    return <h3> <center> Loading.... </center> </h3>
  }

  return (
    <>
      <ToastContainer />

      <center> <h2> welcome to Admin Page</h2>
        <div className="float-right mx-5" onClick={() => logOut()}>Logout</div>
      </center>
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
                      {dataList.options.map((option, ind) => (
                        <div className="form-check mt-2 p-2" key={ind}
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
            <form className='input-form mt-3' onSubmit={formikData.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="text" className="form-control mt-2"
                  value={formikData.values.title} name='title'
                  onChange={formikData.handleChange} placeholder="Enter message title" />

                {formikData.errors.title &&
                  <p className="text-danger">{formikData.errors.title}</p>}

              </div>

              {
                newOptions.map((items, index) => (
                  <div className="form-group mt-3" key={index}>
                    <label>Option {index + 1}</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name={`option`}
                      value={items.option}
                      placeholder={`Option ${index + 1}`}
                      onChange={(event) => handleChange(event, index)}
                    />
                  </div>
                ))
              }

              {/*  */}
              <div className="add-option mt-4">
                <h2 onClick={() => increseLength()}>+</h2>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button type='submit' className="btn btn-primary">
                  Submit
                </button>
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



