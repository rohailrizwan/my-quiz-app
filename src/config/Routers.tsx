import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import AdminDashboard from '../Pages/AdminDashboard'
import UserDashboard from '../Pages/UserDashboard'
import Quiz from '../Pages/Quiz'

export default function Routers() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path="/admin-dashboard/:id" element={<AdminDashboard />} />
                    <Route path="/user-dashboard/:username/*" element={<UserDashboard />} />
                    <Route path='/Quiz/:quizindex' element={<Quiz/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
