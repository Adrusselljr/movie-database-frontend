import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectToken, selectUser, addUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function User() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const dispatch = useDispatch()

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
            dispatch(addUser(parsedData.payload))
            return parsedData
        }
        handleViewUser()
    }, [dispatch, token])

    return (
        <div className='App'>

            {Object.keys(user).length === 0
            ? ( <p>loading...</p> )
            : ( <div>

                    <div>
                        <h1>{ user.firstName }'s Movie List</h1>
                    </div><br/><br/>

                    {user.movieHistory.map(movie => {
                        return (
                            <div key={ movie._id } className='movie'>
                                <p><span>Title : </span>{ movie.title }</p>
                                <Link to={ `/home/movie/${movie._id}` } className='btn btn-primary'>View Movie</Link>
                            </div>
                        )
                    })}
            </div> )
            }
        
        </div>
    )
}

export default User