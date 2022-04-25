import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DisplayUsers from './Pages/DisplayUsers'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <DisplayUsers /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App