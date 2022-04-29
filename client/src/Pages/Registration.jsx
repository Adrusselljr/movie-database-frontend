import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'
// const URL = 'https://movie-database-backend.herokuapp.com'

function Registration() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const newBody = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }

        const fetchedData = await fetch(`${URL}/users/create-user`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        navigate("/login")
        return parsedData
    }

    return (
        <div className='App'>

            <h1>Create an Account</h1>

            <div className="registrationForm">
                <div className="form-group">
                    <label>First Name:</label>
                    <input onChange={ e => setFirstName(e.target.value) } value={ firstName } className='form-control' type="text"/>
                </div><br/>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input onChange={ e => setLastName(e.target.value) } value={ lastName } className='form-control' type="text"/>
                </div><br/>

                <div className="form-group">
                    <label>Username:</label>
                    <input onChange={ e => setUsername(e.target.value) } value={ username } className='form-control' type="text"/>
                </div><br/>

                <div className="form-group">
                    <label>Email:</label>
                    <input onChange={ e => setEmail(e.target.value) } value={ email } className='form-control' type="email"/>
                </div><br/>

                <div className="form-group">
                    <label>Password:</label>
                    <input onChange={ e => setPassword(e.target.value) } value={ password } className='form-control' type="password"/>
                </div><br/>

                <button onClick={ handleSubmit } className='btn btn-primary'>Register</button>
            </div><br/>

            <h5>Already have an account?</h5><br/>
            <Link to='login' className='btn btn-primary'>Login Here</Link>

        </div>
    )
}

export default Registration