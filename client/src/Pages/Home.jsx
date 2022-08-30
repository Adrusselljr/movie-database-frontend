import React from 'react'
import User from './User'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
        <div className='App'>

            <div id="home">
                <User />
            </div>
        
        </div>
    )
}

export default Home