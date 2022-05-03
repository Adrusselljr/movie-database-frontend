import React, { useState, useEffect } from 'react'
import { Outlet, Link, useParams } from "react-router-dom";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function NavBar() {
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${URL}/users/get-current-user/${id}`)
            const parsedData = await fetchedData.json()
            // console.log("user ", parsedData.payload)
            setUser(parsedData.payload)
            return parsedData
        }
        handleViewUser()
    }, [id])
    return (
        <div className='App'>

            <div className='navbar'>
                <Link to={ `/home/user/${user._id}` } className='btn btn-primary'>Home</Link>
                <Link to="/home/all-users" className='btn btn-primary'>All Users</Link>
                <Link to={ `/home/user/search/${user._id}` } className='btn btn-primary'>Search For A Movie</Link>
                <Link to="/login" className='btn btn-primary'>Logout</Link>
            </div>

            <Outlet />
        
        </div>
    )
}

export default NavBar