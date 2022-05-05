import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function ViewProfile() {
    const [user, setUser] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const handleViewUser = async () => {
            const fetchedData = await fetch(`${URL}/users/get-current-user/${id}`)
            const parsedData = await fetchedData.json()
            setUser(parsedData.payload)
            // console.log("user ", parsedData.payload)
            return parsedData
        }
        handleViewUser()
    }, [id])

    const handleDeleteUser = async () => {
            const fetchedData = await fetch(`${URL}/users/delete-user/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedData = await fetchedData.json()
            navigate("/login")
            return parsedData
        }

    return (
        <div className='App'>

            <h1>Your Profile :</h1><br/>

            <p><span>First Name : </span>{user.firstName}</p>
            <p><span>Last Name : </span>{user.lastName}</p>
            <p><span>Username : </span>{user.username}</p>
            <p><span>Email : </span>{user.email}</p><br/>

            <div className='links'>
                <button onClick={ handleDeleteUser } className='btn btn-primary'>Delete User</button>
                <Link to={ `/home/user/edit/${id}` } className='btn btn-primary'>Edit User</Link>
            </div>
        
        </div>
    )
}

export default ViewProfile