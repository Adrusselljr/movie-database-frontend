import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Home from './Pages/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Registration /> } />
                <Route path='login' element={ <Login /> } />
                <Route path='home' element={ <Home /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App