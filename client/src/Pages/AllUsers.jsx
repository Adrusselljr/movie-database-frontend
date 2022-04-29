import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'
// const URL = 'https://movie-database-backend.herokuapp.com'

function DisplayUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchedUsers = async () => {
            const response = await fetch(`${URL}/users/get-all-users`, {
                mode: "cors"
            })
            const fetchedUsers = await response.json()
            setUsers(fetchedUsers.payload)
            console.log("fetchedUsers ", fetchedUsers)
            
            return fetchedUsers
        }
        fetchedUsers()
    }, [])

    return (
        <div className='App'>
            
            {users.map(user => {
                return (
                    <div key={ user._id } className="user">
                        <p>{ user.firstName } { user.lastName }</p>
                        <Link to={ `user/${user._id}` } className='btn btn-primary'>View User</Link>
                    </div>
                )
            })}
        
        </div>
    )
}

export default DisplayUsers