import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../Redux/userSlice';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function EditUser() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${ URL }/users/current-user`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            const parsedData = await fetchedData.json()
            const user = parsedData.payload
            setFirstName(user.firstName)
            setLastName(user.lastName)
            return parsedData
        }
        handleViewUser()
    }, [user, token])

    const handleUpdateUser = async () => {
        const newBody = {
            firstName: firstName,
            lastName: lastName
        }
        const fetchedData = await fetch(`${ URL }/users/update-user`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        navigate(`/home/user/profile/${ user._id }`)
        return parsedData
    }

    const handleUpdatePassword = async () => {
        const newBody = {
            password: password,
            confirmPassword: confirmPassword
        }
        const fetchedData = await fetch(`${ URL }/users/update-password`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        if(password !== confirmPassword) {
            setError("Password and Confirm Password do not match!")
        }
        else {
            setError("")
        }
        navigate(`/home/user/profile/${ user._id }`)
        return parsedData
    }

    const handleToggle = () => {
        setToggle(!toggle)
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
            </div><br/><br/>
            {
                toggle
                ? (<>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={ e => setPassword(e.target.value) } value={ password } className='form-control' type="password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input onChange={ e => setConfirmPassword(e.target.value) } value={ confirmPassword } className='form-control' type="password" />
                    </div><br/>
                    <div>
                    <button onClick={ handleUpdatePassword } className='btn btn-primary'>Update Password</button>
                    </div>
                    <span className='text-danger'>{ error }</span><br/><br/>
                </>)
                : ("")
            }

            <div className="links">
                <Link to={ `/home/user/profile/${ user._id }` } className='btn btn-primary'>Cancel</Link>
                <button onClick={ handleUpdateUser } className='btn btn-primary'>Update User</button>
                <button onClick={ handleToggle } className='btn btn-primary'>Change Password</button>
            </div>
        
        </div>
    )
}

export default EditUser