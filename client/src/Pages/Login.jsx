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
    const [isError, setIsError] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
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

                if(email === "") {
                    setIsError(true)
                    setEmailError("Email cannot be empty!")
                }
                if(password === "") {
                    setIsError(true)
                    setPasswordError("Password cannot be empty!")
                }

                if(isError) {
                    navigate("user")
                }
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
                    <span className='text-danger'>{ emailError }</span>
                </div><br/>

                <div className="form-group">
                    <label>Password:</label>
                    <input onChange={ e => setPassword(e.target.value) } value={ password } className='form-control' type="password"/>
                    <span className='text-danger'>{ passwordError }</span>
                </div><br/>

                <Link onClick={ handleLogin } to='/all-users' className='btn btn-primary'>Login</Link>
            </div><br/>

            <h5>Not Registered?</h5><br/>
            <Link to='/' className='btn btn-primary'>Register Here</Link>

        </div>
    )
}

export default Login