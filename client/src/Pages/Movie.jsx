import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'
// const URL = 'https://movie-database-backend.herokuapp.com'

function Movie() {
    const [movie, setMovie] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const handleViewMovie = async () => {
            const fetchedData = await fetch(`${URL}/movies/get-one-movie/${id}`)
            const parsedData = await fetchedData.json()
            console.log("parsedData ", parsedData.payload)
            setMovie(parsedData.payload)
            return parsedData
        }
        handleViewMovie()
    }, [id])

    return (
        <div className='App'>

            <h1>{ movie.title }</h1><br/>

            <div className="oneMovie">
                <p><span>Description : </span>{ movie.description }</p>
                <p><span>Rated : </span>{ movie.rating }</p>
                <p><span>Genre : </span>{ movie.genre.join(', ') }</p>
                <p><span>Director : </span>{ movie.director }</p>
                <p><span>Stars : </span>{ movie.stars.join(', ') }</p>
                <p><span>Year Released : </span>{ movie.yearReleased }</p>
                <p><span>Runtime : </span>{ movie.runtime }</p>
            </div>

            <p>--------------------------------------------</p>

            <h2>Comment Section :</h2><br/>

            {movie.commentHistory.map(comment => {
                return (
                    <div key={ comment._id } className="comments">
                        <p>{ comment.comment }</p>
                    </div>
                )
            })}
        
        </div>
    )
}

export default Movie