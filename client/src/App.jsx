import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from './Components/NavBar'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Home from './Pages/Home'
import AddMovie from './Pages/AddMovie'
import User from './Pages/User'
import Movie from './Pages/Movie'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Registration /> } />
                <Route path='login' element={ <Login /> } />
                <Route path='home' element={ <NavBar /> }>
                    <Route index element={ <Home /> } />
                    <Route path='add-movie' element={ <AddMovie /> } />
                    <Route path='login' element={ <Login /> } />
                    <Route path='user/:id' element={ <User /> } />
                    <Route path='movie/:id' element={ <Movie /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App