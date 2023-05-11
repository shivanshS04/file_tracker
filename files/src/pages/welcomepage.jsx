import React from "react";
import './welcomepage.css';
import {Link , useNavigate} from 'react-router-dom'

function WelcomePage() {
    const navigate = useNavigate()
    return (
        <div className="main">
            <div className="flatcard">
                <h1 className="heading">Welcome</h1>
                <div className="optionsRow">
                    <div className="linkBtn">
                        <Link className="link" to="/login" >Login</Link>
                    </div>
                    <div className="linkBtn">
                        <Link className="link" to= '/signUp' >Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;