import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, deleteUser } from '../Redux/userSlice';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function NavBar() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(deleteUser())
        window.localStorage.removeItem('applicationState')
        navigate("/login")
    }

    return (
        <div className='App'>

            <div className='navbar'>
                <Link to={ `/home/user/${user._id}` } className='btn btn-primary'>Home</Link>
                <Link to={ `/home/user/profile/${user._id}` } className='btn btn-primary'>Profile</Link>
                <Link to={ `/home/user/search/${user._id}` } className='btn btn-primary'>Search For A Movie</Link>
                <Link to={ `/home/user/add-movie/${user._id}` } className='btn btn-primary'>Add Movie</Link>
                <button onClick={ handleLogout } className='btn btn-primary'>Logout</button>
            </div>

            <Outlet />
        
        </div>
    )
}

export default NavBar