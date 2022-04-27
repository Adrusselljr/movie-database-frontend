import React, { useState, useEffect } from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'https://movie-database-backend.herokuapp.com'

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

            <h1>Hello World From DisplayUsers</h1>
            
            {users.map(user => {
                return <p key={ user._id }>{ user.firstName } { user.lastName }</p>
            })}
        
        </div>
    )
}

export default DisplayUsers