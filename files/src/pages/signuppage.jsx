import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './signUp.css'
import SelectDepartment from './component/selectDepartment'

function SignUpPage() {
  const [username, setUsername] = useState('')
  const [empId, setEmpId] = useState('')
  const [department, setDepartment] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  return (
      <div className='main'>
        <div className="flatcard">
          <h1 className="heading">Sign Up</h1>
          <input type="text" placeholder='Username' className='usernameField' value={username} onChange={(e) =>{
            e.preventDefault()
            setUsername(e.target.value)
          } } />  
          <input type="password" placeholder='Password' value={password} onChange={(e) =>{
            e.preventDefault()
            setPassword(e.target.value)
          } } />  
          <input type="text" placeholder='Employee ID' value={empId} onChange={(e) =>{
            e.preventDefault()
            setEmpId(e.target.value)
          } } /> 
          <SelectDepartment setDepartment={setDepartment} />
          <input type="text" placeholder='Email' value={email} onChange={(e) =>{
            e.preventDefault()
            setEmail(e.target.value)
          } } /> 

          <button type="submit" onClick={() => {
            console.log(department)
            fetch('http://localhost:8081/users/create',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                empId : empId,
                department : department,
                email : email,
                password : password
              })
            }).then((res) => {
              if(res.status == 200){
                console.log(res.status);
                localStorage.setItem('empId', empId)  
                navigate('/home')
              }
            })
          }} className='signUpBtn'>Sign Up</button>
        </div>
      </div>
    
  )
}

export default SignUpPage
