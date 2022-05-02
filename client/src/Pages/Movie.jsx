import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'
// const URL = 'https://movie-database-backend.herokuapp.com'

function Movie() {
    const [movie, setMovie] = useState({})
    const [comment, setComment] = useState("")
    const [email, setEmail] = useState("")
    const { id } = useParams()

    useEffect(() => {
        const handleViewMovie = async () => {
            const fetchedData = await fetch(`${URL}/movies/get-one-movie/${id}`)
            const parsedData = await fetchedData.json()
            // console.log("movie ", parsedData.payload)
            setMovie(parsedData.payload)
            return parsedData
        }
        handleViewMovie()
    }, [id])

    const handleSubmit = async () => {
        const newBody = {
            comment: comment,
            movie: id,
            email: email
        }

        const fetchedData = await fetch(`${URL}/comments/create-comment/${id}`, {
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
                </div>

                <Link to={ `/home/movie/edit/${id}` } className='btn btn-primary'>Edit Movie</Link>

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

                <button onClick={ () => handleSubmit() } className='btn btn-primary'>Comment</button>
            </div>)
            }
        
        </div>
    )
}

export default Movie