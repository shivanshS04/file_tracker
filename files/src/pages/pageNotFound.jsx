import React from "react";
import './pageNotFound.css'
import {useNavigate} from 'react-router-dom'
function PageNotFound(){
    const navigate = useNavigate()
    return (
        <div className="main">
            <div className="flatcard">
                <h1>Page Not Found !</h1>
                <button className="homeBtn" onClick={()=>{
                    navigate('/')
                }} >Return Home</button>
            </div>
        </div>
    )
}

export default PageNotFound