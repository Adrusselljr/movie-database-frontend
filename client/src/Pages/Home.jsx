import React from 'react'
import AllUsers from './AllUsers'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
        <div className='App'>

            <h1>Select A User</h1><br/>

            <AllUsers />
        
        </div>
    )
}

export default Home