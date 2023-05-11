import React ,{useState, useEffect}from "react";
import './fileDetails.css'
import {FaRegWindowClose , FaArrowRight ,FaBook,FaFileAlt} from 'react-icons/fa'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {format } from 'date-fns'
import SelectDepartment from './selectDepartment'

function FileDetails({ openModal, props}) {
    const [data, setData] = useState([])
    const [forwardDiv , setForwardDiv] = useState(false)
    const [forwardDepartment , setForwardDepartment] = useState()
    useEffect(() => {
        fetch('http://localhost:8081/executeQuery',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                   command:  `select * from file_${props.fileId}`
                })
            }).then(res => res.json())
            .then(data => {
                setData(data)
            })
    },[data])
    return (
        <div className="prompt-main">
            <button onClick={()=>openModal(false)} className="closeBtn" ><FaRegWindowClose /></button>
            <div className="prompt-container">
                <div className="prompt-title">
                    <div className="fileDetails">
                        <h2>File : {props.fileId}</h2>
                        <h3>File Name : {props.filename}</h3>
                    </div>
                    <div className="actions">
                        <button className="actionBtn" disabled={props.department.toLowerCase() != localStorage.getItem('department').toLowerCase()} onClick={()=> {
                            setForwardDiv(!forwardDiv)
                        }} >Forward  <FaArrowRight /></button>
                        <button className="actionBtn" disabled onClick={()=> alert("This button's functionality is yet to be added !")}>Shelf  <FaBook /></button>
                        
                        { forwardDiv &&  <div className="forward">
                        <SelectDepartment setDepartment={setForwardDepartment} />
                            <button 
                                type="submit" 
                                className="actionBtn" 
                                onClick={()=> {
                                    if(forwardDepartment)
                                    {fetch('http://localhost:8081/files/forward',{
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json, text/plain, */*',
                                            'Content-Type': 'application/json'
                                        },
                                        body : JSON.stringify({
                                            fileId : props.fileId,
                                            fromDepartment : localStorage.getItem('department'),
                                            toDepartment : forwardDepartment
                                        })
                                    }).then((res) => {
                                        if(res.status == 200){
                                          window.location.reload()
                                    }else{
                                        alert('File Forwarding Failed')
                                    }
                                })
        
                                }
                                else{
                                    alert('Please select department !')
                                }
                                }} >
                                Forward
                            </button>
                        </div>}
                    
                    </div>    
                </div>
                <div className="prompt-body">
                    <h2>Timeline</h2>
                    <VerticalTimeline animate lineColor="black" layout="2-columns">

                        {data.map((item,index) => {
                            return <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'wheat', color: 'black' }}
                            contentArrowStyle={{ borderRight: '7px solid  black' }}
                            iconStyle={{ background: 'wheat', color: 'black' }}
                            icon={<FaFileAlt />}
                        >
                            <h3 className="vertical-timeline-element-title">{item.department}</h3>
                            <h3 className="vertical-timeline-element-subtitle" >{format(new Date(item.fromDate) , 'dd/MM/yyyy')}</h3>
                        </VerticalTimelineElement>
                        })}

                    </VerticalTimeline>
                </div>

            </div>
        </div>
    )
}

export default FileDetails
