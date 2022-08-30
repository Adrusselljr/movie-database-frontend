import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider as ReduxProvider } from 'react-redux';
import store from './Redux/store';
import NavBar from './Components/NavBar'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Home from './Pages/Home'
import AddMovie from './Pages/AddMovie'
import User from './Pages/User'
import Movie from './Pages/Movie'
import EditMovie from './Pages/EditMovie'
import Search from './Pages/Search'
import ViewProfile from './Pages/ViewProfile'
import EditUser from './Pages/EditUser'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <ReduxProvider store={ store }>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Registration /> } />
                    <Route path='login' element={ <Login /> } />
                    <Route path='home' element={ <NavBar /> }>
                        <Route index element={ <Home /> } />
                        <Route path='user' element={ <User /> } />
                        <Route path='movie/:id/:movieId' element={ <Movie /> } />
                        <Route path='movie/edit/:id/:movieId' element={ <EditMovie /> } />
                        <Route path='user/add-movie/:id' element={ <AddMovie /> } />
                        <Route path='user/search/:id' element={ <Search /> } />
                        <Route path='user/profile/:id' element={ <ViewProfile /> } />
                        <Route path='user/edit/:id' element={ <EditUser /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ReduxProvider>
    )
}

export default App