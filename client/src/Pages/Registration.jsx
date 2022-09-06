import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import NavBarLogout from '../Components/NavBarLogout'
import { useSelector } from 'react-redux'
import { selectUser } from '../Redux/userSlice'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

const Registration = () => {
    const user = useSelector(selectUser)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        const newBody = {
            firstName: firstName,
            lastName: lastName,
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

        if(firstName === "") {
            setIsError(true)
            setFirstNameError("First name cannot be empty!")
        }
        if(lastName === "") {
            setIsError(true)
            setLastNameError("Last name cannot be empty!")
        }
        if(email === "") {
            setIsError(true)
            setEmailError("Email cannot be empty!")
        }
        if(password === "") {
            setIsError(true)
            setPasswordError("Password cannot be empty!")
        }

        if(!isError) {
            navigate("login")
        }
        return parsedData
    }

    return (
        <div className='App'>
            {
            user
            ? (<NavBarLogout />)
            : ("")
            }

            <h1>Welcome to myMovies - Your Movie Library</h1><br/><br/>

            <h1>Create an Account</h1>

            <div className="registrationForm">
                <div className="form-group">
                    <label>First Name:</label>
                    <input onChange={ e => setFirstName(e.target.value) } value={ firstName } className='form-control' type="text"/>
                    <span className='text-danger'>{ firstNameError }</span>
                </div><br/>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input onChange={ e => setLastName(e.target.value) } value={ lastName } className='form-control' type="text"/>
                    <span className='text-danger'>{ lastNameError }</span>
                </div><br/>

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

                <button onClick={ handleRegister } className='btn btn-primary'>Register</button>
            </div><br/>

            <h5>Already have an account?</h5><br/>
            <Link to='login' className='btn btn-primary'>Login Here</Link>

        </div>
    )
}

export default Registration