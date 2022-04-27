import React from 'react'
import { Link } from "react-router-dom"
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login() {
    return (
        <div className='App'>

            <h1>Login Here</h1>

            <div className="loginForm">
                <div className="form-group">
                    <label>Email:</label>
                    <input className='form-control' type="email"/>
                </div><br/>

                <div className="form-group">
                    <label>Password:</label>
                    <input className='form-control' type="password"/>
                </div><br/>

                <Link to='/home' className='btn btn-primary'>Login</Link>
            </div>

        </div>
    )
}

export default Login