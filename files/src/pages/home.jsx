import './home.css'
import React, {useState, useEffect } from 'react'
import {
    Outlet,
    Link,
    NavLink,
    useNavigate} from 'react-router-dom';
import {FaUser} from 'react-icons/fa'
import Settings from './component/settings';


function Home () {
    const [open, setOpen] = useState(false)
    const empId = localStorage.getItem('empId')
    const [department , setDepartment] = useState('')
    const [username , setUsername] = useState('')
    useEffect(() => {        
        fetch('http://localhost:8081/users' ,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
                empId : empId
            })
        }).then(res => res.json())
        .then(data => {
            localStorage.setItem('department' , data[0].department)
            setDepartment(data[0].department);
            setUsername(data[0].username);
        })
    })
    const navigate = useNavigate();
    localStorage.getItem('bgImage')
    ?document.body.style.backgroundImage = `url("${localStorage.getItem('bgImage')}")`
    :(console.log('no bgImage found'));
    return (        
        <div className="main"  >
            <div className="sidebar">
                <h2 className="title">Files</h2>
                <div className="links">
                    <NavLink style={({isActive}) => {
                        return {
                            backgroundColor : isActive ? 'wheat' : 'black',
                            color: isActive ? 'black' : 'white'
                        }
                    }} className="link" to={{
                        pathname :`/home/dashboard/${department}`,
                        state:{
                            empId: empId
                        } 
                        }}>Dashboard</NavLink>
                    <NavLink style={({isActive}) => {
                        return {
                            backgroundColor : isActive ? 'wheat' : 'black',
                            color: isActive ? 'black' : 'white'
                        }
                    }}
                    className="link" 
                    to="/home/createFile"
                    state={{
                        username: username
                    }}                    
                    >Create File</NavLink>
                    <NavLink style={({isActive}) => {
                        return {
                            backgroundColor : isActive ? 'wheat' : 'black',
                            color: isActive ? 'black' : 'white'
                        }
                    }}className="link" to="/home/myfiles">My Files</NavLink>

                    <button className="settings" onClick={()=>setOpen(true)} >Settings</button>


                </div>
            </div>
            <div className="content">
                <h1>Welcome! {username}</h1>
                <Outlet />
                {open && <Settings openModal={setOpen} />}  
            </div>
        </div>
    );
}

export default Home