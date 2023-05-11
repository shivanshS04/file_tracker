import React,{useState} from 'react'
import {useNavigate} from  'react-router-dom'
import { FaRegWindowClose } from 'react-icons/fa'

function Settings ({openModal})  {
    const navigate = useNavigate()
    const [imageText, setImageText] = useState()
    const [data, setData] = useState([])
    return (
        <div className="prompt-main">
            <button onClick={()=>openModal(false)} className="closeBtn" ><FaRegWindowClose /></button>
            <div className="prompt-container">
            <div className="prompt-title">
                    <h1>Settings</h1>
                    <div className="actions">
                        <button className="actionBtn" onClick={()=> {
                            localStorage.clear()
                            navigate('/')
                            window.location.reload()
                        }}>Log Out</button>
                    </div>    
                </div>
                <div className="prompt-body">
                    <div className="appearance">
                        <h2>Appearance</h2>
                        <h3>Change Background Image</h3>
                        <div className="searchFeild">
                            <input type="text" className="imageSearch" placeholder='search for backgrounds' onChange={(e)=>{
                                e.preventDefault()
                                setImageText(e.target.value)
                            }} />
                            <button type="submit" className="actionBtn" onClick={()=>{
                                fetch(`https://api.unsplash.com/search/photos?page=1&query=${imageText}&client_id=IwjXXsFNOcP3vEfLGDapztx8zK0mzxx4UTanekOC4kY`)
                                .then(res => res.json())
                                .then(result => setData(result.results))
                            }} >Search</button>
                        </div>
                        <div className="searchResults">
                            {data.map((item,index)=>{
                                    return <div className="images" onClick={()=>{
                                        localStorage.setItem('bgImage' , item.urls.full)
                                        document.body.style.backgroundImage = `url("${item.urls.full}")`
                                        // window.location.reload()
                                    }} key={index}>
                                        <img src={item.urls.thumb} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Settings