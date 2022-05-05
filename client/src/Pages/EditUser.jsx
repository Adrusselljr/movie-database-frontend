import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function EditUser() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${URL}/users/get-current-user/${id}`)
            const parsedData = await fetchedData.json()
            setFirstName(parsedData.payload.firstName)
            setLastName(parsedData.payload.lastName)
            setUsername(parsedData.payload.username)
            setEmail(parsedData.payload.email)
            // console.log("user ", parsedData.payload)
            return parsedData
        }
        handleViewUser()
    }, [id])

    const handleUpdateUser = async () => {
        const newBody = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        const fetchedData = await fetch(`${URL}/users/update-user/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        if(password !== confirmPassword) {
            setError("Password and Confirm Password Do Not Match!")
        }
        else {
            setError("")
        }
        navigate(`/home/user/profile/${id}`)
        return parsedData
    }

    return (
        <div className='App'>

            <h1>Update User : </h1><br/>

            <div className="form-group">
                <label>First Name</label>
                <input onChange={ e => setFirstName(e.target.value) } value={ firstName } className='form-control' type="text" />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input onChange={ e => setLastName(e.target.value) } value={ lastName } className='form-control' type="text" />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input onChange={ e => setUsername(e.target.value) } value={ username } className='form-control' type="text" />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input onChange={ e => setEmail(e.target.value) } value={ email } className='form-control' type="email" />
            </div><br/>
            <h6>( Please Re-enter Password If You're Not Changing It )</h6>
            <div className="form-group">
                <label>Password</label>
                <input onChange={ e => setPassword(e.target.value) } value={ password } className='form-control' type="password" />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input onChange={ e => setConfirmPassword(e.target.value) } value={ confirmPassword } className='form-control' type="password" />
            </div><br/>
            <p style={{ color: "red" }}>{error}</p>

            <div className="links">
                <Link to={ `/home/user/profile/${id}` } className='btn btn-primary'>Cancel</Link>
                <button onClick={ handleUpdateUser } className='btn btn-primary'>Update User</button>
            </div>
        
        </div>
    )
}

export default EditUser