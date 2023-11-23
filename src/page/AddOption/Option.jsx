import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { dispatch } from '../../Redux/store/store'
import { AddOption } from '../../Redux/slice/AddOption'

const Option = () => {
    const [optionData, setOptionData] = useState('');
    const { OptionDataId } = useParams();
    const navigate = useNavigate();
    
    const handleForm = (e) => {
        e.preventDefault();
        if (optionData.trim() !== '') {
            dispatch(AddOption(OptionDataId, optionData));
            navigate('/AdminPoll');
        } else {
            toast.error("Please enter data");
        }
    }
    
  return (
    <>
            <ToastContainer />
            <center><h2 className='text-light mt-4'> Add Options here </h2></center>
            <form className='input-form mt-3' onSubmit={handleForm}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control mt-2"
                    onChange={(e)=> setOptionData(e.target.value)}
                       name='title'placeholder="Enter message title" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type='submit' className="btn btn-success">
                        Submit
                    </button>
                    <Link to={'/adminPoll'} className="btn btn-danger">
                        cancel
                    </Link>
                </div>
            </form>
    </>
  )
}

export default Option