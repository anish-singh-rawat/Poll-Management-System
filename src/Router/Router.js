import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../component/login/Login'
import SignUp from '../component/signup/SignUp'
import AdminPoll from '../page/Admins/AdminPoll'
import UsersPoll from '../page/Users/UsersPoll'
import AddData from '../page/AddData/AddData'
import EditData from '../page/EditData/EditData'
import Option from '../page/AddOption/Option'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login/> }/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/signup' element={<SignUp/> }/>
        <Route path='/adminPoll' element={<AdminPoll/> }/>
        <Route path='/userPoll' element={<UsersPoll/> }/>
        <Route path='/AddData' element={<AddData/> }/>
        <Route path='/Editdata/:editDataId' element={<EditData/> }/>
        <Route path='/AddOption/:optionDataId' element={<Option/> }/>
    </Routes>
  )
}

