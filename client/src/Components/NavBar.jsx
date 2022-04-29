import React from 'react'
import { Outlet, Link } from "react-router-dom";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function NavBar() {
    return (
        <div className='App'>

            <div className='navbar'>
                <Link to="/home" className='btn btn-primary'>Home</Link>
                <Link to="/login" className='btn btn-primary'>Logout</Link>
            </div>

            <Outlet />
        
        </div>
    )
}

export default NavBar