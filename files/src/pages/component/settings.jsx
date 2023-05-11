import React from 'react'
import { FaRegWindowClose } from 'react-icons/fa'

function Settings ({openModal})  {
    return (
        <div className="prompt-main">
            <button onClick={()=>openModal(false)} className="closeBtn" ><FaRegWindowClose /></button>
            <div className="prompt-container">
                <div className="prompt-title">
                        <h1>Settings</h1>
                </div>
                <div className="prompt-body">
                    <div className="userDetails">
                        <h2>Update Details</h2>
                        <span>Update Username</span>
                        <input type="text" placeholder='New Username' onChange={(e)=> {
                            e.preventDefault()
                            fetch('http://localhost:8081/executeQuery',{
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json, text/plain, */*',
                                    'Content-Type': 'application/json'
                                  },
                                body: JSON.stringify({
                                    command: `update users set username : "${e.target.value}" where empId = "${localStorage.get('empId')}" `
                                })
                            })
                        }} />
                    </div>
                    {/* <div className="appearance">
                        <h2>Appearance</h2>
                        <span>Change Background Image</span>
                        <input type="file"  name="Background image" id="bgImage" />
                    </div> */}
                </div>

            </div>
        </div>
  )
}

export default Settings