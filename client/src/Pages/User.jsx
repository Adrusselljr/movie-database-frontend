import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function User() {
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${URL}/users/get-current-user/${id}`)
            const parsedData = await fetchedData.json()
            setUser(parsedData.payload)
            // console.log("user ", parsedData.payload)
            return parsedData
        }
        handleViewUser()
    }, [id])

    return (
        <div className='App'>

            {Object.keys(user).length === 0
            ? ( <p>loading...</p> )
            : ( <div>

                    <div className="profileBtn">
                        <h1>{ user.firstName }'s Movie List</h1>
                        <Link to={ `/home/user/profile/${user._id}` } className='btn btn-primary'>Profile</Link>
                    </div><br/><br/>

                    {user.movieHistory.map(movie => {
                        return (
                            <div key={ movie._id } className='movie'>
                                <p><span>Title :</span> { movie.title }</p>
                                <Link to={ `/home/movie/${id}/${movie._id}` } className='btn btn-primary'>View Movie</Link>
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