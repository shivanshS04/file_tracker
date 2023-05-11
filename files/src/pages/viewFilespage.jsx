import React ,{useState, useEffect, useMemo} from "react";
import './viewFiles.css'
import { useParams , useLocation} from 'react-router-dom';
// import {FaShare , FaCheckSquare, FaShareAltSquare, FaShareSquare, FaTransgender, FaArrowRight} from 'react-icons/fa'
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table'
import {format} from 'date-fns'
import SearchFilter from "./searchFilter";
import FileDetails from "./component/fileDetails";

function ViewFiles(){
    const department= localStorage.getItem('department')
    const columns = useMemo(()=>[ 
        {
            Header : "ID",
            accessor: "fileId"
        },
        {
            Header : "ERP ID",
            accessor: "erpId"
        },
        {
            Header : "Current Department",
            accessor: "department"
        },
        {
            Header : "Created Department",
            accessor: "createdDepartment"
        },
        {
            Header: "Created By",
            accessor: "createdBy"
        },
        {
            Header : "File Name",
            accessor: "filename"
        },        
        {
            Header : "File Age",
            accessor: "createdDate",
            Cell : ({value}) => {   
                var today = new Date()
                var createdDate = new Date(value)
                var  day_difference = Math.abs(today - createdDate)/(1000*60*60*24)
                return `${Math.floor(day_difference)} days ago  ${format(createdDate , 'dd/MM/yyyy')}`
            }
        },
    ],[])
    const [data, setData] = useState([])
    const {pageData} = useParams();

    const [showFileDetails, setShowFileDetails] = useState(false)
    const [rowDetails, setRowDetails] = useState()

    function adjustCommand(pageData){
        if(pageData == 'inbox') return (`select files.fileId , filename,erpId, department,createdDepartment, createdDate, closeDate , createdBy from files,${department}_inbox where files.fileId = ${department}_inbox.fileId`)
    else if(pageData == 'outbox') return (`select files.fileId , filename,erpId, department,createdDepartment, createdDate, closeDate , createdBy from files,${department}_outbox where files.fileId = ${department}_outbox.fileId`)
        else return ('select * from files')
    }

    useEffect(() => {
            let command = adjustCommand(pageData)
            fetch('http://localhost:8081/executeQuery',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    command
                })
            }).then(res => res.json())
            .then(data => {
                setData(data)
            })
    },[pageData])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        canPreviousPage,
        previousPage,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns : columns,
        data : data
    },useGlobalFilter,useSortBy,usePagination);

    const {globalFilter} = state

    return (
        <div className="main">
            <h1>{ pageData }</h1>
            <SearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead >
                    {
                        headerGroups.map((headerGroup) =>{
                            return <tr  {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((header) =>{
                                        return <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                                            {header.render('Header')}
                                            {header.isSorted ? (header.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼') : ''}
                                        </th>
                                    })
                                }
                            </tr>   
                        })
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) =>{
                            prepareRow(row);
                            return (
                                <tr onClick={()=>{
                                    setRowDetails(row.values)
                                    setShowFileDetails(true)
                                } } {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) =>{
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <button className="paginationBtn" disabled={!canPreviousPage} onClick={() => previousPage()} >Previous</button>
                <button className="paginationBtn" disabled={!canNextPage} onClick={() => nextPage()} >Next</button>
            </div>
            {showFileDetails && <FileDetails openModal={setShowFileDetails} props={rowDetails} /> }
        </div>
    );
}

export default ViewFiles;
