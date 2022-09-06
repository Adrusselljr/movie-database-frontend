import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../Redux/userSlice'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = 'http://localhost:3001'

function Search() {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState("")
    const [rating, setRating] = useState("")
    const [star, setStar] = useState("")
    const [movies, setMovies] = useState([])
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState("")

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
            return parsedData
        }
        handleViewUser()
    }, [token])

    const searchTitle = () => {
        const titleSearch = user.movieHistory.filter(movie => {
            return movie.title.toLowerCase() === title.toLowerCase()
        })
        if(!titleSearch) {
            setIsError(true)
            setError("No movie with this title")
        }
        else{
            setMovies(titleSearch)
        }
    }

    const filterGenre = () => {
        const genreFilter = user.movieHistory.filter(movie => {
            return movie.genre.includes(genre)
        })
        if(genreFilter.length > 0) {
            setMovies(genreFilter)
        }
        else{
            setIsError(true)
            setError("No movies of this genre")
        }
    }

    const fliterRating = () => {
        const ratingFilter = user.movieHistory.filter(movie => {
            return movie.rating.toLowerCase() === rating.toLowerCase()
        })
        if(!ratingFilter) {
            setIsError(true)
            setError("No movies of this rating")
        }
        else{
            setMovies(ratingFilter)
        }
    }

    const filterStar = () => {
        const starFilter = user.movieHistory.filter(movie => {
            return movie.stars.includes(star)
        })
        if(starFilter.length > 0) {
            setMovies(starFilter)
        }
        else{
            setIsError(true)
            setError("No movies with this star")
        }
    }

    const handleReset = () => {
        setTitle("")
        setGenre("")
        setRating("")
        setStar("")
        setMovies([])
        setIsError(false)
        setError("")
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

            {isError
            ? ( <div><p style={{ color: "red" }}>{ error }</p></div> )
            : ( <div>{movies.map(movie => {
                return (
                    <div key={ movie._id } className='user'>
                        <p><span>Title : </span>{ movie.title }</p>
                        <Link to={ `/home/movie/${ movie._id }` } className='btn btn-primary'>View Movie</Link>
                    </div>
                )
            })}</div> )
            }
            <br/><br/><br/>

            <Link to={ `/home/user/${ user._id }` } className='btn btn-primary'>Back</Link><br/><br/>
        
        </div>
    )
}

export default Search