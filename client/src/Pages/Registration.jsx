import React from 'react'
import { Link } from "react-router-dom";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Registration() {
    return (
        <div className='App'>

            <h1>Create an Account</h1>

            <div className="registrationForm">
                <div className="form-group">
                    <label>First Name:</label>
                    <input className='form-control' type="text"/>
                </div><br/>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input className='form-control' type="text"/>
                </div><br/>

                <div className="form-group">
                    <label>Username:</label>
                    <input className='form-control' type="text"/>
                </div><br/>

                <div className="form-group">
                    <label>Email:</label>
                    <input className='form-control' type="email"/>
                </div><br/>

                <div className="form-group">
                    <label>Password:</label>
                    <input className='form-control' type="password"/>
                </div><br/>

                <button className='btn btn-primary'>Register</button>
            </div><br/>

            <h5>Already have an account?</h5><br/>
            <Link to='login' className='btn btn-primary'>Login</Link>
        
        </div>
    )
}

export default Registration