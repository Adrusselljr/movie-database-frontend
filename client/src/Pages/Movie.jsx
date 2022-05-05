import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function Movie() {
    const [movie, setMovie] = useState({})
    const [comment, setComment] = useState("")
    const [email, setEmail] = useState("")
    const [clicked, setClicked] = useState(false)
    const { movieId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const handleViewMovie = async () => {
            const fetchedData = await fetch(`${URL}/movies/get-one-movie/${movieId}`)
            const parsedData = await fetchedData.json()
            // console.log("movie ", parsedData.payload)
            setMovie(parsedData.payload)
            return parsedData
        }
        handleViewMovie()
    }, [movieId])

    const handleAddComment = async () => {
        const newBody = {
            comment: comment,
            movie: movieId,
            email: email
        }

        const fetchedData = await fetch(`${URL}/comments/create-comment/${movieId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBody)
        })
        setComment("")
        setEmail("")
        const parsedData = await fetchedData.json()
        setMovie(parsedData.payload)
        return parsedData
    }

    const handleDeleteMovie = async () => {
        const newBody = {
            email: email
        }
        const fetchedData = await fetch(`${URL}/movies/delete-movie/${movieId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        navigate(`/home/user/${movie.movieOwner}`)
        return parsedData
    }

    const handleClicked = () => {
        setClicked(!clicked)
        console.log(clicked)
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
                    <p><span>Genre : </span>{ movie.genre.join(', ') }</p>
                    <p><span>Director : </span>{ movie.director }</p>
                    <p><span>Stars : </span>{ movie.stars.join(', ') }</p>
                    <p><span>Year Released : </span>{ movie.yearReleased }</p>
                    <p><span>Runtime : </span>{ movie.runtime }</p>
                </div><br/>

                <div className="links3">
                    <div className="links2">
                        <Link to={ `/home/movie/edit/${movie.movieOwner}/${movieId}` } className='btn btn-primary'>Edit Movie</Link>
                        <button onClick={ handleClicked } className='btn btn-primary'>Delete Movie</button><br/><br/>
                    </div><br/>
                        {clicked === true
                        ? (<div className='form-group links3'>
                            <label>Email</label>
                            <input onChange={ e => setEmail(e.target.value) } value={ email } className='form-control' type="email" /><br/>
                            <button onClick={ handleDeleteMovie } className='btn btn-primary'>Confirm Delete</button>
                        </div>)
                        : (<div></div>)
                        }
                </div>

                <p>--------------------------------------------</p>

                <h2>Comment Section :</h2><br/>

                {movie.commentHistory.map(comment => {
                    return (
                        <div key={ comment._id } className="comments">
                            <p><span>{ comment.commentOwner.firstName } { comment.commentOwner.lastName } :</span> { comment.comment }</p>
                        </div>
                    )
                })}

                <div className="form-group">
                    <input onChange={ e => setComment(e.target.value) } value={ comment } className='form-control' type="text" />
                </div>

                <div className="form-group">
                    <label>Email :</label>
                    <input onChange={ e => setEmail(e.target.value) } value={ email } className='form-control' type="email" /><br/>
                </div>

                <button onClick={ handleAddComment } className='btn btn-primary'>Comment</button><br/><br/><br/><br/>

                <Link to={ `/home/user/${movie.movieOwner}` } className='btn btn-primary'>Back</Link>
            </div>)
            }
        
        </div>
    )
}

export default Movie