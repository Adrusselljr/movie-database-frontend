import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// const URL = 'http://localhost:3001'
const URL = 'https://movie-database-backend.herokuapp.com'

function Search() {
    const [user, setUser] = useState({})
    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState("")
    const [rating, setRating] = useState("")
    const [star, setStar] = useState("")
    const [movies, setMovies] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const handleViewUser = async () => {
            const fetchedData = await fetch(`${URL}/users/get-current-user/${id}`)
            const parsedData = await fetchedData.json()
            console.log("user ", parsedData.payload)
            setUser(parsedData.payload)
            return parsedData
        }
        handleViewUser()
    }, [id])

    const searchTitle = () => {
        const titleSearch = user.movieHistory.filter(movie => {
            return movie.title === title
        })
        setMovies(titleSearch)
    }

    const filterGenre = () => {
        const genreFilter = user.movieHistory.filter(movie => {
            return movie.genre.includes(genre)
        })
        setMovies(genreFilter)
    }

    const fliterRating = () => {
        const ratingFilter = user.movieHistory.filter(movie => {
            return movie.rating === rating
        })
        setMovies(ratingFilter)
    }

    const filterStar = () => {
        const starFilter = user.movieHistory.filter(movie => {
            return movie.stars.includes(star)
        })
        setMovies(starFilter)
    }

    const handleReset = () => {
        setTitle("")
        setGenre("")
        setRating("")
        setStar("")
        setMovies([])
    }

    return (
        <div className='App'>

            <h1>Search For A Movie :</h1><br/>

            <div className="search">
                <div className='form-group'>
                    <label>Title</label>
                    <input onChange={ e => setTitle(e.target.value) } value={ title } type="text" /><br/>
                    <button onClick={ searchTitle } className='btn btn-primary'>Search</button>
                </div>

                <div className='form-group'>
                    <label>Genre</label>
                    <input onChange={ e => setGenre(e.target.value) } value={ genre } type="text" /><br/>
                    <button onClick={ filterGenre } className='btn btn-primary'>Filter</button>
                </div>

                <div className='form-group'>
                    <label>Rating</label>
                    <input onChange={ e => setRating(e.target.value) } value={ rating } type="text" /><br/>
                    <button onClick={ fliterRating } className='btn btn-primary'>Filter</button>
                </div>

                <div className='form-group'>
                    <label>Star</label>
                    <input onChange={ e => setStar(e.target.value) } value={ star } type="text" /><br/>
                    <button onClick={ filterStar } className='btn btn-primary'>Filter</button>
                </div>
            </div><br/>

            <button onClick={ handleReset } className='btn btn-primary'>Reset</button><br/><br/>

            <h1>Movies :</h1><br/>

            {movies.map(movie => {
                return (
                    <div className='user'>
                        <p><span>Title : </span>{ movie.title }</p>
                        <Link to={ `/home/movie/${movie._id}` } className='btn btn-primary'>View Movie</Link>
                    </div>
                )
            })}<br/><br/><br/>

            <Link to={ `/home/user/${user._id}` } className='btn btn-primary'>Back</Link><br/><br/>
        
        </div>
    )
}

export default Search