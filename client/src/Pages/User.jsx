import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'
// const URL = 'https://movie-database-backend.herokuapp.com'

function User() {
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${URL}/users/get-current-user/${id}`)
            const parsedData = await fetchedData.json()
            // console.log("user ", parsedData.payload)
            setUser(parsedData.payload)
            return parsedData
        }
        handleViewUser()
    }, [id])

    return (
        <div className='App'>

            {Object.keys(user).length === 0
            ? ( <p>loading...</p> )
            : ( <div>
                    <h1>{ user.firstName }'s Movie List</h1><br/>

                    {user.movieHistory.map(movie => {
                        return (
                            <div key={ movie._id } className='movie'>
                                <p>Title: { movie.title }</p>
                                <Link to={ `/home/movie/${movie._id}` } className='btn btn-primary'>View Movie</Link>
                            </div>
                        )
                    })}
                    <br/>
                    <Link to={ `/home/user/add-movie/${user._id}` } className='btn btn-primary'>Add Movie</Link>
            </div> )
            }
        
        </div>
    )
}

export default User