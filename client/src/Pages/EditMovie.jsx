import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMovie, selectToken } from '../Redux/userSlice'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function EditMovie() {
    const token = useSelector(selectToken)
    const movie = useSelector(selectMovie)
    const [locationId, setLocationId] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState([])
    const [rating, setRating] = useState("")
    const [director, setDirector] = useState("")
    const [stars, setStars] = useState([])
    const [runtime, setRuntime] = useState("")
    const [yearReleased, setYearReleased] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const handleViewMovie = async () => {
            const fetchedData = await fetch(`${ URL }/movies/get-one-movie/${ movie._id }`)
            const parsedData = await fetchedData.json()
            setLocationId(parsedData.payload.locationId)
            setTitle(parsedData.payload.title)
            setDescription(parsedData.payload.description)
            setGenre(parsedData.payload.genre)
            setRating(parsedData.payload.rating)
            setDirector(parsedData.payload.director)
            setStars(parsedData.payload.stars)
            setRuntime(parsedData.payload.runtime)
            setYearReleased(parsedData.payload.yearReleased)
            return parsedData
        }
        handleViewMovie()
    }, [movie._id])

    const handleUpdateMovie = async () => {
        const newBody = {
            locationId: locationId,
            title: title,
            description: description,
            genre: genre,
            rating: rating,
            director: director,
            stars: stars,
            runtime: runtime,
            yearReleased: yearReleased,
            movieOwner: movie.movieOwner
        }
        const fetchedData = await fetch(`${ URL }/movies/update-movie/${ movie._id }`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        navigate(`/home/movie/${ movie._id }`)
        return parsedData
    }

    return (
        <div className='App'>

            {Object.keys(movie).length === 0
            ? (<div>loading...</div>)
            : (<div>
                <h1>Edit Movie</h1><br/>

                <div className="addMovie">
                    <div className="form-group">
                        <label>Location ID</label>
                        <input onChange={ e => setLocationId(e.target.value) } value={ locationId } className='form-control' type="number" />
                    </div><br/>

                    <div className="form-group">
                        <label>Title</label>
                        <input onChange={ e => setTitle(e.target.value) } value={ title } className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Description</label>
                        <input onChange={ e => setDescription(e.target.value) } value={ description } className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Genre</label>
                        <input onChange={ e => setGenre(e.target.value.split(',')) } value={ genre } className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Rating</label>
                        <input onChange={ e => setRating(e.target.value) } value={ rating } className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Director</label>
                        <input onChange={ e => setDirector(e.target.value) } value={ director } className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Stars</label>
                        <input onChange={ e => setStars(e.target.value.split(',')) } value={ stars  } className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Runtime</label>
                        <input onChange={ e => setRuntime(e.target.value) } value={ runtime } placeholder='0H 00M' className='form-control' type="text" />
                    </div><br/>

                    <div className="form-group">
                        <label>Year Released</label>
                        <input onChange={ e => setYearReleased(e.target.value) } value={ yearReleased } className='form-control' type="number" />
                    </div><br/>

                    <div className="links">
                        <button onClick={ handleUpdateMovie } className='btn btn-primary'>Update Movie</button>
                        <Link to={ `/home/movie/${ movie._id }` } className='btn btn-primary'>Cancel</Link>
                    </div>
                </div>
            </div>)
            }
        
        </div>
    )
}

export default EditMovie