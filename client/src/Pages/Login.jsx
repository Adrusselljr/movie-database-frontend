import React, { useState } from 'react'
import { Link } from "react-router-dom"
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        const newBody = {
            email: email,
            password: password
        }

        const fetchedData = await fetch(`${URL}/users/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        // console.log("logged user ", parsedData.payload)
        return parsedData
    }

    return (
        <div className='App'>

            <h1>Login Here</h1>

            <div className="loginForm">
                <div className="form-group">
                    <label>Email:</label>
                    <input onChange={ e => setEmail(e.target.value) } value={ email } className='form-control' type="email"/>
                </div><br/>

                <div className="form-group">
                    <label>Password:</label>
                    <input onChange={ e => setPassword(e.target.value) } value={ password } className='form-control' type="password"/>
                </div><br/>

                <Link onClick={ handleLogin } to='/all-users' className='btn btn-primary'>Login</Link>
            </div><br/>

            <h5>Not Registered?</h5><br/>
            <Link to='/' className='btn btn-primary'>Register Here</Link>

        </div>
    )
}

export default Login