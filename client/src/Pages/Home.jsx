import React from 'react'
import User from './User'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
        <div className='App'>

            <h1>Select A User</h1><br/>

            <User />
        
        </div>
    )
}

export default Home