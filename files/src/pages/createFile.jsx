import React ,{useState ,useEffect} from "react";
import './createFile.css';
import { useNavigate ,useLocation} from "react-router-dom";
import SelectDepartment from "./component/selectDepartment";



function CreateFile(props) {
  const username = useLocation().state.username;
    const [filename, setfilename] = useState('')
    const [erpId, setErpId] = useState('')
    const [department, setDepartment] = useState('')
    const [fileCount, setFileCount] = useState()

    useEffect(() => {
      fetch('http://localhost:8081/files/count')
      .then((res) => res.json())
      .then((data) =>{
        setFileCount(data[0].count)
      })
    })

    const navigate = useNavigate()
    return (
      <div className='main'>
        <div className="card">
          <h1 className="heading">Create a File</h1>
          <h3>File Id : {Date().split(' ')[3]}_{fileCount + 1}</h3>
          <input type="text" placeholder='File Title' value={filename} onChange={(e) =>{
            e.preventDefault()
            setfilename(e.target.value)
          } } />  
          <input type="text" placeholder='ERP Id' value={erpId} onChange={(e) =>{
            e.preventDefault()
            setErpId(e.target.value)
          } } />  
          <SelectDepartment  setDepartment={setDepartment} />
          <button 
            type="submit"
            className='createFileBtn' 
            onClick={ ()=>{
              fetch('http://localhost:8081/files/create',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                  fileId : `${Date().split(' ')[3]}_${fileCount + 1}`,
                   filename : filename,
                   erpId : erpId,
                   department : department,
                   createdBy : username
                })
              }).then((res) => {
                if(res.status == 200){
                  navigate('/home')
                }
              })
            }} >
                Create File</button>
        </div>
      </div>
    
  )
}

export default CreateFile;