import React from "react";
import { Outlet,useParams, useNavigate} from "react-router-dom"
import { FaFileInvoice , FaInbox  } from  'react-icons/fa'
import './dashboard.css'

function Dashboard(){
    const {department} = useParams();
    const navigate = useNavigate()
    return (
        <div className="dashboard">
                    <div className="categories">
                        <div className="allFilesCard">
                            <span><FaFileInvoice /></span>
                            <h2 className="title">All Files</h2>
                            <button
                                className="viewBtn"
                                onClick={()=>{
                                    navigate(`allfiles`)
                                }}
                            >View All</button>
                        </div>
                        <div className="inbox">
                        <span><FaInbox /></span>
                            <h2 className="title">Inbox</h2>
                            <button className="viewBtn"
                                onClick={()=>{
                                    navigate(`inbox`)
                                }} 
                            >View Inbox</button>
                        </div>
                        <div className="outbox">
                        <span><FaInbox /></span>
                            <h2 className="title">Outbox</h2>
                            <button className="viewBtn" 
                                onClick={()=>{
                                    navigate(`outbox`)
                                }}
                            >View Outbox</button>
                        </div>
                    </div>
                    <Outlet />
                </div>
    );
}

export default Dashboard;