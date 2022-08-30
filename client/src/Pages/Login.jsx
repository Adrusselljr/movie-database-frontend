import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { addUser, addToken } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const axios = require('axios').default;

const URL = 'http://localhost:3001'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const response = axios.post(`${URL}/users/login`, {
                email: email,
                password: password
            })
            .then(response => {
                dispatch(addToken(response.data.token))
                dispatch(addUser(response.data.payload))
                navigate("/home")
                return response.data.payload
            })
        return response
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

                <button onClick={ handleLogin } className='btn btn-primary'>Login</button>
            </div><br/>

            <h5>Not Registered?</h5><br/>
            <Link to='/' className='btn btn-primary'>Register Here</Link>

        </div>
    )
}

export default Login