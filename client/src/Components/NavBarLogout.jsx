import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteUser } from '../Redux/userSlice';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function NavBarLogout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(deleteUser())
        window.localStorage.removeItem('applicationState')
        navigate("/login")
    }

    return (
        <div className='App'>

            <div className='navbarLogout'>
                <button onClick={ handleLogout } className='btn btn-primary'>Logout</button>
            </div>

            <Outlet />
        
        </div>
    )
}

export default NavBarLogout