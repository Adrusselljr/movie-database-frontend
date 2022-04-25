import React, { useEffect } from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'
// const URL = 'https://movie-database-backend.herokuapp.com'

function DisplayUsers() {
    useEffect(() => {
        const fetchedUsers = async () => {
            const response = await fetch(`${URL}/users/get-all-users`)
            const fetchedUsers = await response.json()
            console.log("fetchedUsers ", fetchedUsers)
            return fetchedUsers
        }
        fetchedUsers()
    }, [])

    return (
        <div className='App'>

            <h1>Hello World From DisplayUsers</h1>
        
        </div>
    )
}

export default DisplayUsers