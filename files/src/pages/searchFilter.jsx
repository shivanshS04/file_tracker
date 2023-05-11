import React from "react";
import { FaSearch , FaUser  } from 'react-icons/fa'
import './searchFilter.css'

function SearchFilter({filter , setFilter}){
    return (
        <div className="navigation">
            <input type="text" value={filter || ''} onChange={e => setFilter(e.target.value)}name="search" placeholder='Search' />
            {/* <button className="searchBtn" onClick={()=>{alert("This button's functionality is yet to be added !")}} ><FaSearch /></button> */}
            
        </div>
    )
}

export default SearchFilter;