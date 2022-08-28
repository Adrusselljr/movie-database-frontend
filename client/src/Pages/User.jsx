import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/userSlice';
import { Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function User() {
    const user = useSelector(selectUser)

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
                                <Link to={ `/home/movie/${user._id}/${movie._id}` } className='btn btn-primary'>View Movie</Link>
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