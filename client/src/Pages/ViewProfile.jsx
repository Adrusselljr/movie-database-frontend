import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../Redux/userSlice';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function ViewProfile() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${ URL }/users/current-user`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            const parsedData = await fetchedData.json()
            const user = parsedData.payload
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            return parsedData
        }
        handleViewUser()
    }, [user, token])

    const handleDeleteUser = async () => {
            const fetchedData = await fetch(`${ URL }/users/delete-user/${ user._id }`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedData = await fetchedData.json()
            navigate("/")
            return parsedData
        }

    return (
        <div className='App'>

            <h1>Your Profile :</h1><br/>

            <p><span>First Name : </span>{ firstName }</p>
            <p><span>Last Name : </span>{ lastName }</p>
            <p><span>Email : </span>{ email }</p><br/>

            <p><span>You currently have </span>{ user.movieHistory.length }<span> movies.</span></p><br/>

            <div className='links'>
                <button onClick={ handleDeleteUser } className='btn btn-primary'>Delete User</button>
                <Link to={ `/home/user/edit/${ user._id }` } className='btn btn-primary'>Edit User</Link>
            </div>
        
        </div>
    )
}

export default ViewProfile