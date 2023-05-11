import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './loginpage.css'

function LoginPage() {
  const [empId, setEmpId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  return (
      <div className='main'>
        <div className="flatcard">
          <h1 className="heading">Login</h1>
          <input type="text" placeholder='Employee ID' value={empId} onChange={(e) =>{
            e.preventDefault()
            setEmpId(e.target.value)
          } } />  
          <input type="password" placeholder='Password' value={password} onChange={(e) =>{
            e.preventDefault()
            setPassword(e.target.value)
          } } />  
          <button type="submit" onClick={() => {

            fetch('http://localhost:8081/users/check',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                empId : empId,
                password : password
              })
            }).then((res) => {
              if(res.status == 200){
                localStorage.setItem('empId', empId)
                navigate('/home')
              }
              else{
                alert('Invalid Credentials ! Please try again')
              }
            })
          }} className='signUpBtn'>Sign Up</button>
        </div>
      </div>
    
  )
}

export default LoginPage
