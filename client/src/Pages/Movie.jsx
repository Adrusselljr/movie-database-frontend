import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { selectToken, addMovie, selectMovie } from '../Redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function Movie() {
    const token = useSelector(selectToken)
    const movie = useSelector(selectMovie)
    const { movieId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const handleViewMovie = async () => {
            const fetchedData = await fetch(`${ URL }/movies/get-one-movie/${ movieId }`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedData = await fetchedData.json()
            dispatch(addMovie(parsedData.payload))
            return parsedData
        }
        handleViewMovie()
    }, [dispatch, movieId])

    const handleDeleteMovie = async () => {
        const fetchedData = await fetch(`${ URL }/movies/delete-movie/${ movieId }`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        const parsedData = await fetchedData.json()
        navigate(`/home/user/${ movie.movieOwner }`)
        return parsedData
    }

    return (
        <div className='App'>

            {Object.keys(movie).length === 0
            ? (<p>loading...</p>)
            : (<div>
                <h1>{ movie.title }</h1>
                <h2>Location ID : { movie.locationId }</h2><br/>

                <div className="oneMovie">
                    <p><span>Description : </span>{ movie.description }</p>
                    <p><span>Rated : </span>{ movie.rating }</p>
                    <p><span>Genre : </span>{ movie.genre.join(',') }</p>
                    <p><span>Director : </span>{ movie.director }</p>
                    <p><span>Stars : </span>{ movie.stars.join(',') }</p>
                    <p><span>Year Released : </span>{ movie.yearReleased }</p>
                    <p><span>Runtime : </span>{ movie.runtime }</p>
                </div><br/>

                <div className="links3">
                    <div className="links2">
                        <Link to={ `/home/movie/edit/${ movieId }` } className='btn btn-primary'>Edit Movie</Link>
                        <button onClick={ handleDeleteMovie } className='btn btn-primary'>Delete Movie</button><br/><br/>
                    </div>
                </div>
            </div>)
            }
        
        </div>
    )
}

export default Movie