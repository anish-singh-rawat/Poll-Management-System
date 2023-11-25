import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pollManage } from '../../Redux/slice/AdminPoll';
import './Admin.css';
import { resetReducer } from '../../Redux/slice/listData';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteTitle } from '../../Redux/slice/DeleteTitle';
import { deleteOption } from '../../Redux/slice/deleteOption';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPoll = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(5);
  const [rowIndex, setRowIndex] = useState(0);

  const handleChangePage = (newpage) => {
    setPage(newpage);
  };

  const increasePage = () => {
    if (pollList.length >= page) {
      setRowIndex(page);
      setPage( page + page);
    } else {
      toast.warning('No more pages available');
    }
  };

  const decreasePage = () => {
    if (rowIndex !== 0) {
      const newRowIndex = Math.max(rowIndex - page, 0);
      setPage(page - rowIndex);
      setRowIndex(newRowIndex);
    } else {
      toast.warning('You are in the first page');
    }
  };
  
  const pollList = useSelector((state) => state.pollSlice.data.data);
  const deleteTitleLoading = useSelector((state) => state.deleteTitleSlice.isLoading);
  const deleteOptionLoading = useSelector((state) => state.deleteOptionSlice.isLoading);
  const editTitleSliceLoading = useSelector((state) => state.editTitleSlice.isLoading);
  const addOptionSliceLoading = useSelector((state) => state.addOptionSlice.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pollManage());
  }, [deleteTitleLoading, editTitleSliceLoading, deleteOptionLoading, addOptionSliceLoading]);

  const logOut = () => {
    navigate('/login');
    dispatch(resetReducer());
  };

  const deleteTitleData = (titleID) => {
    dispatch(DeleteTitle(titleID));
  };

  const deleteOptionData = (optionInd, optionText) => {
    dispatch(deleteOption(optionInd, optionText.option));
  };

  if (!pollList || deleteTitleLoading || deleteOptionLoading || addOptionSliceLoading || editTitleSliceLoading) {
    return (
      <h3>
        <center className="text-warning"> Loading... </center>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </h3>
    );
  }

  return (
    <>
      <ToastContainer />
      <center>
        <h2 className="text-light"> Welcome to Admin Page</h2>
        <div className="float-right text-danger mx-5" onClick={() => logOut()}>
          Logout
        </div>
      </center>

      <Link
        to={'/AddData'}
        className="d-flex justify-content-center align-item-center text-light"
        style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}
      >
        AddPoll +
      </Link>

      <div className="container data-container mt-2" style={{ wordWrap: 'break-word' }}>
        <div className="row">
          <div className="col">
            {pollList.length > 0 &&
              pollList.slice(rowIndex, page).reverse().map((dataList) => (
                <div key={dataList._id}>
                  <div className="card mt-3">
                    <div className="card-header bg-success text-light ">
                      <h5 className="card-title" style={{ wordWrap: 'break-word' }}>
                        {dataList.title}
                      </h5>
                      <div className="shift-right d-flex justify-content-around">
                        {dataList.options.length < 4 && (
                          <Link
                            to={`/AddOption/${dataList._id}`}
                            className="fa-solid fa-plus text-white"
                            style={{ textDecoration: 'none' }}
                          ></Link>
                        )}

                        <Link to={`/Editdata/${dataList._id}`} state={dataList.title} className="fa-regular fa-pen-to-square mx-5 text-light"></Link>

                        <i className="fa-solid fa-trash" onClick={() => deleteTitleData(dataList._id)}></i>
                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option, ind) => (
                        <div className="form-check mt-2 p-2" key={ind}
                        style={{borderBottom : '1px solid black'}} >
                          <div className="d-flex justify-content-between">
                            <div className="text-sm text-md-lg text-lg-xl" style={{ wordWrap: 'break-word' }}>
                              {option.option}
                            </div>
                            <div className="icons d-flex">
                              <div className="vote-div mx-5">vote : {option.vote}</div>
                            
                              <i className="fa-solid fa-trash" onClick={() => deleteOptionData(dataList._id, option)}></i>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3 text-light">
        <p> Rows per page: </p>
        <select
          className="mx-3 mb-4 text-light"
          style={{ background: 'none', border: 'none' }}
          onChange={(e) => handleChangePage(e.target.value)}
        >
          <option className="text-dark">5</option>
          <option className="text-dark">10</option>
          <option className="text-dark">15</option>
        </select>
        <div className="page-selection">
          <i className="fa-solid fa-less-than" onClick={() => decreasePage()}></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           {page > pollList.length ? pollList.length : page} 
           &nbsp;
            of {pollList.length}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa-solid fa-greater-than" onClick={() => increasePage()}></i>
        </div>
      </div>
    </>
  );
};

export default AdminPoll;
