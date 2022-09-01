import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectToken, selectUser } from '../Redux/userSlice'
import { useSelector } from 'react-redux'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function AddMovie() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
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

    const handleAddMovie = async () => {
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
            movieOwner: user._id
        }

        const fetchedData = await fetch(`${ URL }/movies/create-movie`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newBody)
        })
        const parsedData = await fetchedData.json()
        navigate(`/home`)
        return parsedData
    }

    return (
        <div className='App'>

            <h1>Add A Movie</h1><br/>

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
                    <input onChange={ e => setStars(e.target.value.split(',')) } value={ stars } className='form-control' type="text" />
                </div><br/>

                <div className="form-group">
                    <label>Runtime</label>
                    <input onChange={ e => setRuntime(e.target.value) } value={ runtime } placeholder='0H 00M' className='form-control' type="text" />
                </div><br/>

                <div className="form-group">
                    <label>Year Released</label>
                    <input onChange={ e => setYearReleased(e.target.value) } value={ yearReleased } className='form-control' type="number" />
                </div><br/>

                <button onClick={ handleAddMovie } className='btn btn-primary'>Add Movie</button>
            </div>
        
        </div>
    )
}

export default AddMovie