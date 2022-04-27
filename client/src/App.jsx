import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registration from './Pages/Registration'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Registration /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App