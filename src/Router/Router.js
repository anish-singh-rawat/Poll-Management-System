import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../component/login/Login'
import SignUp from '../component/signup/SignUp'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login/> }/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/signup' element={<SignUp/> }/>
    </Routes>
  )
}

