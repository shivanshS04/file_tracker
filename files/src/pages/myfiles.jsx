import React ,{useState ,useEffect} from 'react';
import './myfiles.css';
import {FaCheckSquare , FaArrowRight} from  'react-icons/fa'


function MyFiles(){
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8081/users')
        .then(response => response.json())
        .then(data => setData(data))
    },[data])
    return (
        <div className="main">
            <h1>My Files</h1>

        </div>
    );
}

export default MyFiles